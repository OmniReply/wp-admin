#!/usr/bin/env python3
from __future__ import annotations
import json
import re
from pathlib import Path
from textwrap import dedent


ROOT = Path("/Users/zlbg/code/wpplus/wp-admin-trae")
SPEC_FILE = ROOT / "wp-admin.openapi.json"
SRC_DIR = ROOT / "src"


def ensure_dir(path: Path) -> None:
    path.mkdir(parents=True, exist_ok=True)


def write_file(relative_path: str, content: str) -> None:
    target = ROOT / relative_path
    ensure_dir(target.parent)
    target.write_text(content.rstrip() + "\n")


def split_words(value: str) -> list[str]:
    parts = re.split(r"[^0-9A-Za-z]+", value)
    words = []
    for part in parts:
        if not part:
            continue
        bit = re.sub(r"([a-z0-9])([A-Z])", r"\1 \2", part)
        bit = re.sub(r"([A-Z]+)([A-Z][a-z])", r"\1 \2", bit)
        words.extend(word for word in bit.split() if word)
    return words


def pascal(value: str) -> str:
    words = split_words(value)
    text = "".join(word[:1].upper() + word[1:] for word in words) or "Item"
    if text[:1].isdigit():
        text = f"X{text}"
    return text


def camel(value: str) -> str:
    text = pascal(value)
    return text[:1].lower() + text[1:] if text else "item"


def kebab(value: str) -> str:
    words = split_words(value)
    return "-".join(word.lower() for word in words if word) or "resource"


def safe_prop(name: str) -> str:
    if re.match(r"^[A-Za-z_][A-Za-z0-9_]*$", name):
        return name
    return json.dumps(name, ensure_ascii=False)


def path_segments(path: str) -> list[str]:
    return [segment for segment in path.strip("/").split("/") if segment]


def literal_common_prefix(paths: list[str]) -> list[str]:
    segments_list = [path_segments(path) for path in paths]
    if not segments_list:
        return []
    prefix = []
    for values in zip(*segments_list):
        if any(value.startswith("{") for value in values):
            break
        if len(set(values)) != 1:
            break
        prefix.append(values[0])
    return prefix


def prettify_name(value: str) -> str:
    words = split_words(value)
    if not words:
        return value
    return " ".join(words)


def load_spec() -> dict:
    return json.loads(SPEC_FILE.read_text())


SPEC = load_spec()
SCHEMAS = SPEC.get("components", {}).get("schemas", {})


def resolve_ref_name(ref: str | None) -> str | None:
    if not ref:
        return None
    return ref.split("/")[-1]


def get_schema(ref_or_schema: dict | None) -> dict:
    if not ref_or_schema:
        return {}
    if "$ref" in ref_or_schema:
        return SCHEMAS.get(resolve_ref_name(ref_or_schema["$ref"]), {})
    return ref_or_schema


def ts_expr(schema: dict | None) -> str:
    if not schema:
        return "unknown"
    if "$ref" in schema:
        return resolve_ref_name(schema["$ref"]) or "unknown"
    if "enum" in schema:
        values = schema.get("enum", [])
        return " | ".join(json.dumps(value, ensure_ascii=False) for value in values) or "string"
    if "allOf" in schema:
        return " & ".join(ts_expr(item) for item in schema["allOf"]) or "unknown"
    if "oneOf" in schema:
        return " | ".join(ts_expr(item) for item in schema["oneOf"]) or "unknown"
    if "anyOf" in schema:
        return " | ".join(ts_expr(item) for item in schema["anyOf"]) or "unknown"
    schema_type = schema.get("type")
    if schema_type == "array":
        return f"Array<{ts_expr(schema.get('items'))}>"
    if schema_type == "object":
        properties = schema.get("properties", {})
        additional = schema.get("additionalProperties")
        if properties:
            required = set(schema.get("required", []))
            items = []
            for key, prop_schema in properties.items():
                marker = "" if key in required else "?"
                items.append(f"{safe_prop(key)}{marker}: {ts_expr(prop_schema)};")
            return "{ " + " ".join(items) + " }"
        if additional:
            return f"Record<string, {ts_expr(additional)}>"
        return "Record<string, unknown>"
    if schema_type in {"integer", "number"}:
        return "number"
    if schema_type == "boolean":
        return "boolean"
    if schema_type == "string":
        return "string"
    return "unknown"


def render_openapi_types() -> str:
    chunks = [
        "/* eslint-disable */",
        "// Auto-generated from wp-admin.openapi.json",
        "",
    ]
    for name, schema in SCHEMAS.items():
        description = schema.get("description")
        if description:
            chunks.append(f"/** {description} */")
        if schema.get("type") == "object" and not any(key in schema for key in ("allOf", "oneOf", "anyOf")):
            required = set(schema.get("required", []))
            chunks.append(f"export interface {name} {{")
            for prop_name, prop_schema in schema.get("properties", {}).items():
                prop_desc = prop_schema.get("description")
                if prop_desc:
                    chunks.append(f"  /** {prop_desc} */")
                marker = "" if prop_name in required else "?"
                chunks.append(f"  {safe_prop(prop_name)}{marker}: {ts_expr(prop_schema)};")
            additional = schema.get("additionalProperties")
            if additional:
                chunks.append(f"  [key: string]: {ts_expr(additional)};")
            chunks.append("}")
            chunks.append("")
        else:
            chunks.append(f"export type {name} = {ts_expr(schema)};")
            chunks.append("")
    return "\n".join(chunks)


def response_schema(operation: dict) -> dict:
    for code in ("200", "201"):
        if code not in operation.get("responses", {}):
            continue
        content = operation["responses"][code].get("content", {})
        for media in content.values():
            return media.get("schema", {})
    return {}


def request_schema(operation: dict) -> dict:
    body = operation.get("requestBody", {})
    content = body.get("content", {})
    for media in content.values():
        return media.get("schema", {})
    return {}


def unwrap_item_schema(schema: dict) -> tuple[str | None, dict]:
    if not schema:
        return None, {}
    if "$ref" in schema:
        ref_name = resolve_ref_name(schema["$ref"])
        resolved = SCHEMAS.get(ref_name or "", {})
        if ref_name and ref_name.startswith("Result") and isinstance(resolved, dict):
            data = resolved.get("properties", {}).get("data")
            if data:
                return unwrap_item_schema(data)
        if ref_name and ref_name.startswith("PageResult") and isinstance(resolved, dict):
            data = resolved.get("properties", {}).get("data", {})
            items = data.get("items")
            if items:
                return unwrap_item_schema(items)
        return ref_name, resolved
    if schema.get("type") == "array":
        return unwrap_item_schema(schema.get("items", {}))
    return None, schema


def unwrap_list_kind(schema: dict) -> str:
    if "$ref" not in schema:
        if schema.get("type") == "array":
            return "list"
        return "single"
    ref_name = resolve_ref_name(schema["$ref"])
    resolved = SCHEMAS.get(ref_name or "", {})
    if ref_name and ref_name.startswith("PageResult"):
        return "page"
    if ref_name and ref_name.startswith("Result"):
        data = resolved.get("properties", {}).get("data", {})
        if data.get("type") == "array":
            return "list"
    return "single"


def render_ts_object(data: dict, indent: int = 2) -> str:
    spacer = " " * indent
    lines = ["{"]
    for key, value in data.items():
        if isinstance(value, dict):
            lines.append(f"{spacer}{key}: {render_ts_object(value, indent + 2)},")
        elif isinstance(value, list):
            lines.append(f"{spacer}{key}: {json.dumps(value, ensure_ascii=False)},")
        elif isinstance(value, str):
            lines.append(f"{spacer}{key}: {json.dumps(value, ensure_ascii=False)},")
        else:
            lines.append(f"{spacer}{key}: {json.dumps(value, ensure_ascii=False)},")
    lines.append(" " * max(indent - 2, 0) + "}")
    return "\n".join(lines)


def parse_field_options(name: str, schema: dict) -> list[dict]:
    options = []
    if schema.get("enum"):
        return [{"label": str(value), "value": value} for value in schema.get("enum", [])]

    description = str(schema.get("description") or "")
    normalized = description.replace("：", ":").replace("，", ",").replace("；", ",")
    if ":" in normalized:
        suffix = normalized.split(":", 1)[1].strip()
        option_pairs = re.findall(r"([A-Za-z0-9_.-]+)\s*-\s*([^,。]+)", suffix)
        if len(option_pairs) >= 2:
            for raw_value, raw_label in option_pairs:
                value = int(raw_value) if raw_value.isdigit() else raw_value
                options.append({"label": raw_label.strip(), "value": value})
            return options
        slash_values = [item.strip() for item in re.split(r"[/,]", suffix) if item.strip()]
        if len(slash_values) >= 2 and all("-" not in item for item in slash_values):
            return [{"label": item, "value": item} for item in slash_values]

    lowered = name.lower()
    if lowered.startswith("is") or lowered in {"status", "enabled"} or lowered.endswith("status") or lowered.endswith("enabled"):
        return [{"label": "禁用", "value": 0}, {"label": "启用", "value": 1}]
    return []


def field_kind(schema: dict, name: str) -> str:
    if parse_field_options(name, schema):
        return "select"
    schema_type = schema.get("type")
    fmt = schema.get("format")
    lowered = name.lower()
    select_keywords = (
        "status",
        "type",
        "level",
        "role",
        "source",
        "provider",
        "group",
        "scene",
        "window",
        "result",
        "category",
    )
    if any(token in lowered for token in select_keywords):
        return "select"
    if schema_type == "boolean":
        return "switch"
    if schema_type in {"integer", "number"}:
        return "number"
    if fmt in {"date", "date-time"}:
        return "datetime"
    if any(token in lowered for token in ("remark", "desc", "content", "message", "prompt", "body")):
        return "textarea"
    return "text"


def field_meta(name: str, schema: dict, required: bool) -> dict:
    return {
        "name": name,
        "label": schema.get("description") or prettify_name(name),
        "kind": field_kind(schema, name),
        "required": required,
        "type": schema.get("type", "string"),
        "format": schema.get("format", ""),
        "options": parse_field_options(name, schema),
    }


def primitive_or_enum(schema: dict) -> bool:
    if schema.get("enum"):
        return True
    return schema.get("type") in {"string", "integer", "number", "boolean"}


def choose_table_fields(item_schema: dict) -> list[dict]:
    properties = item_schema.get("properties", {})
    ordered = list(properties.items())
    priority = ["id", "name", "title", "username", "email", "status", "role", "type", "createTime", "updateTime"]
    ordered.sort(key=lambda pair: (priority.index(pair[0]) if pair[0] in priority else 99, pair[0]))
    fields = []
    for name, schema in ordered:
        if primitive_or_enum(schema):
            fields.append(field_meta(name, schema, False))
        if len(fields) >= 7:
            break
    return fields


def choose_detail_fields(item_schema: dict) -> list[dict]:
    fields = []
    for name, schema in item_schema.get("properties", {}).items():
        if primitive_or_enum(schema):
            fields.append(field_meta(name, schema, False))
        if len(fields) >= 16:
            break
    return fields


def choose_form_fields(body_schema: dict) -> list[dict]:
    resolved = get_schema(body_schema)
    required = set(resolved.get("required", []))
    fields = []
    for name, schema in resolved.get("properties", {}).items():
        if name in {"id", "createTime", "updateTime", "deleted"}:
            continue
        if schema.get("readOnly"):
            continue
        fields.append(field_meta(name, schema, name in required))
    return fields


def choose_filters(operation: dict) -> list[dict]:
    fields = []
    pagination_names = {"page", "pagenum", "pagesize", "size"}
    for parameter in operation.get("parameters", []):
        if parameter.get("in") != "query":
            continue
        if parameter["name"].lower() in pagination_names:
            continue
        schema = parameter.get("schema", {})
        fields.append(field_meta(parameter["name"], schema, parameter.get("required", False)))
    return fields


def type_from_parameter(parameter: dict) -> str:
    return ts_expr(parameter.get("schema", {}))


def common_slug(paths: list[str]) -> str:
    prefix = literal_common_prefix(paths)
    return "-".join(prefix) if prefix else kebab(paths[0])


def operation_name(operation_id: str, method: str, path: str) -> str:
    if operation_id:
        return camel(operation_id)
    raw = f"{method} {' '.join(path_segments(path))}"
    return camel(raw)


def classify_primary_ops(ops: list[dict], prefix_path: str) -> dict:
    def score_list(op: dict) -> tuple[int, int]:
        path = op["path"]
        return (
            0 if path.endswith("/page") else 1 if path.endswith("/list") else 2,
            len(path_segments(path)),
        )

    list_candidates = [op for op in ops if op["method"] == "get" and unwrap_list_kind(response_schema(op["raw"])) in {"page", "list"}]
    detail_candidates = [
        op
        for op in ops
        if op["method"] == "get"
        and "{"
        in op["path"]
        and len(path_segments(op["path"])) <= len(path_segments(prefix_path)) + 1
        and unwrap_list_kind(response_schema(op["raw"])) == "single"
    ]
    save_candidates = [op for op in ops if op["method"] == "post" and request_schema(op["raw"])]
    delete_candidates = [op for op in ops if op["method"] == "delete"]
    extra_actions = [
        op
        for op in ops
        if op not in list_candidates + detail_candidates + save_candidates + delete_candidates
        and op["method"] in {"put", "post", "patch"}
    ]
    return {
        "list": sorted(list_candidates, key=score_list)[0] if list_candidates else None,
        "detail": detail_candidates[0] if detail_candidates else None,
        "save": save_candidates[0] if save_candidates else None,
        "delete": delete_candidates[0] if delete_candidates else None,
        "extra_actions": extra_actions,
    }


resources: list[dict] = []
dashboard_resource: dict | None = None
auth_operations: list[dict] = []

for tag in SPEC.get("tags", []):
    tag_name = tag["name"]
    operations = []
    for path, methods in SPEC.get("paths", {}).items():
        for method, operation in methods.items():
            if method not in {"get", "post", "put", "patch", "delete"}:
                continue
            if tag_name not in operation.get("tags", []):
                continue
            operations.append(
                {
                    "tag": tag_name,
                    "path": path,
                    "method": method,
                    "name": operation_name(operation.get("operationId", ""), method, path),
                    "summary": operation.get("summary") or prettify_name(operation.get("operationId", "") or method),
                    "raw": operation,
                }
            )
    if not operations:
        continue

    if tag_name == "认证管理":
        auth_operations = operations
        continue

    if tag_name == "仪表盘":
        op = operations[0]
        item_name, item_schema = unwrap_item_schema(response_schema(op["raw"]))
        dashboard_resource = {
            "key": "dashboard",
            "label": tag_name,
            "route": "/dashboard",
            "summary": op["summary"],
            "item_type": item_name or "DashboardStatsResponse",
            "fields": choose_detail_fields(item_schema),
            "api_name": "dashboardApi",
        }
        continue

    paths = [op["path"] for op in operations]
    slug = common_slug(paths)
    key = kebab(slug).replace("--", "-")
    route = f"/{key}"
    prefix_path = "/" + "/".join(literal_common_prefix(paths))
    primary = classify_primary_ops(operations, prefix_path)
    detail_ref, detail_schema = unwrap_item_schema(response_schema(primary["detail"]["raw"])) if primary["detail"] else (None, {})
    list_ref, list_schema = unwrap_item_schema(response_schema(primary["list"]["raw"])) if primary["list"] else (None, {})
    item_type = detail_ref or list_ref or "Record<string, unknown>"
    item_schema = detail_schema or list_schema
    save_schema = request_schema(primary["save"]["raw"]) if primary["save"] else {}
    save_type = resolve_ref_name(save_schema.get("$ref")) or "Record<string, unknown>"
    list_params_name = f"{pascal(key)}ListParams"
    form_fields = choose_form_fields(save_schema)
    filters = choose_filters(primary["list"]["raw"]) if primary["list"] else []
    actions = []
    for action in primary["extra_actions"]:
        params = action["raw"].get("parameters", [])
        query_params = [param for param in params if param.get("in") == "query"]
        path_params = [param for param in params if param.get("in") == "path"]
        if len(path_params) == 1 and path_params[0]["name"] in {"id", "broadcastId", "orderNo"} and not request_schema(action["raw"]):
            actions.append(
                {
                    "name": action["name"],
                    "label": action["summary"],
                    "queryParams": [field_meta(param["name"], param.get("schema", {}), param.get("required", False)) for param in query_params],
                    "pathParam": path_params[0]["name"],
                }
            )
    resources.append(
        {
            "tag": tag_name,
            "key": key,
            "route": route,
            "prefix_path": prefix_path or "/",
            "item_type": item_type,
            "item_schema": item_schema,
            "list_params_name": list_params_name,
            "save_type": save_type,
            "table_fields": choose_table_fields(item_schema),
            "detail_fields": choose_detail_fields(item_schema),
            "form_fields": form_fields,
            "filters": filters,
            "actions": actions,
            "api_name": f"{camel(key)}Api",
            "store_name": f"use{pascal(key)}Store",
            "primary": primary,
            "operations": operations,
        }
    )


resources.sort(key=lambda item: item["route"])


def render_common_types() -> str:
    return dedent(
        """
        export interface ApiResponse<T> {
          code: number;
          message: string;
          data: T;
          timestamp?: number;
          success?: boolean;
        }

        export interface PageResponse<T> {
          code: number;
          message: string;
          data: T[];
          total: number;
          pageNum: number;
          pageSize: number;
          pages?: number;
          timestamp?: number;
          success?: boolean;
        }

        export interface PageResult<T> {
          list: T[];
          total: number;
          pageNum: number;
          pageSize: number;
        }

        export type ListResponse<T> = ApiResponse<T[]>;

        export type Primitive = string | number | boolean | null | undefined;

        export interface FieldOption {
          label: string;
          value: string | number;
        }

        type FieldOptionLike = string | number | FieldOption;
        export type FieldValueTone = 'success' | 'danger' | 'warning' | 'info';

        export interface FieldMeta {
          name: string;
          label: string;
          kind: 'text' | 'textarea' | 'number' | 'switch' | 'select' | 'datetime';
          required?: boolean;
          type?: string;
          format?: string;
          options?: Array<string | number | FieldOption>;
        }

        export interface ResourceActionMeta {
          name: string;
          label: string;
          pathParam: string;
          queryParams?: FieldMeta[];
        }

        export interface ResourceMeta {
          key: string;
          label: string;
          route: string;
          itemType: string;
          listParamsType: string;
          saveType?: string | null;
          tableFields: FieldMeta[];
          detailFields: FieldMeta[];
          formFields: FieldMeta[];
          filters: FieldMeta[];
          actions: ResourceActionMeta[];
          hasList: boolean;
          hasDetail: boolean;
          hasSave: boolean;
          hasDelete: boolean;
        }

        export function unwrapApiData<T>(payload: ApiResponse<T> | T): T {
          if (payload && typeof payload === 'object' && 'data' in (payload as Record<string, unknown>)) {
            return (payload as ApiResponse<T>).data;
          }
          return payload as T;
        }

        export function normalizePagePayload<T>(payload: PageResponse<T> | ListResponse<T>): PageResult<T> {
          if ('pageNum' in payload) {
            return {
              list: payload.data ?? [],
              total: payload.total ?? 0,
              pageNum: payload.pageNum ?? 1,
              pageSize: payload.pageSize ?? payload.data?.length ?? 20,
            };
          }

          return {
            list: payload.data ?? [],
            total: payload.data?.length ?? 0,
            pageNum: 1,
            pageSize: payload.data?.length ?? 20,
          };
        }

        export function formatValue(value: unknown): string {
          if (value === null || value === undefined || value === '') {
            return '-';
          }
          if (typeof value === 'boolean') {
            return value ? '是' : '否';
          }
          if (Array.isArray(value)) {
            return value.join(', ');
          }
          if (typeof value === 'object') {
            return JSON.stringify(value, null, 2);
          }
          return String(value);
        }

        export function normalizeFieldOption(option: FieldOptionLike): FieldOption {
          if (typeof option === 'object' && option !== null && 'value' in option) {
            return option;
          }
          return {
            label: String(option),
            value: option,
          };
        }

        export function parseFieldOptionsFromLabel(label: string): FieldOption[] {
          const normalized = label.replace(/：/g, ':').replace(/，/g, ',').replace(/；/g, ',');
          if (!normalized.includes(':')) return [];

          const suffix = normalized.split(':', 2)[1]?.trim() ?? '';
          const pairMatches = Array.from(suffix.matchAll(/([A-Za-z0-9_.-]+)\s*-\s*([^,。]+)/g)) as RegExpMatchArray[];
          if (pairMatches.length >= 2) {
            return pairMatches.map((match) => {
              const rawValue = match[1];
              return {
                label: match[2].trim(),
                value: /^\d+$/.test(rawValue) ? Number(rawValue) : rawValue,
              };
            });
          }

          const simpleValues = suffix
            .split(/[/,]/)
            .map((item: string) => item.trim())
            .filter(Boolean);
          if (simpleValues.length >= 2 && simpleValues.every((item: string) => !item.includes('-'))) {
            return simpleValues.map((item: string) => ({ label: item, value: item }));
          }

          return [];
        }

        export function resolveFieldOptions(field: FieldMeta): FieldOption[] {
          const direct = (field.options ?? []).map(normalizeFieldOption);
          if (direct.length) return direct;
          return parseFieldOptionsFromLabel(field.label);
        }

        export function formatFieldValue(field: FieldMeta, value: unknown): string {
          const normalized = formatValue(value);
          if (normalized === '-') return normalized;

          const options = resolveFieldOptions(field);
          if (!options.length) return normalized;

          const matched = options.find((option) => String(option.value) === String(value));
          if (matched) return matched.label;

          return normalized;
        }

        export function getFieldValueTone(field: FieldMeta, value: unknown): FieldValueTone | undefined {
          const display = formatFieldValue(field, value);
          const normalized = display.trim();
          const successValues = ['启用', '已启用', '成功', '正常'];
          const dangerValues = ['禁用', '已禁用', '失败', '异常'];
          const warningValues = ['待处理', '处理中', '待审核'];
          const infoValues = ['已完成', '完成', '已结束'];

          if (successValues.includes(normalized)) return 'success';
          if (dangerValues.includes(normalized)) return 'danger';
          if (warningValues.includes(normalized)) return 'warning';
          if (infoValues.includes(normalized)) return 'info';

          return undefined;
        }
        """
    )


def render_resource_type(resource: dict) -> str:
    list_operation = resource["primary"]["list"]
    params_lines = []
    if list_operation:
        for parameter in list_operation["raw"].get("parameters", []):
            if parameter.get("in") != "query":
                continue
            marker = "" if parameter.get("required") else "?"
            params_lines.append(f"  {safe_prop(parameter['name'])}{marker}: {type_from_parameter(parameter)};")
    if not params_lines:
        params_lines.append("  pageNum?: number;")
        params_lines.append("  pageSize?: number;")

    imports = {resource["item_type"], resource["save_type"]}
    imports.discard("Record<string, unknown>")
    imports.discard(None)
    imports_code = ", ".join(sorted(name for name in imports if name))
    import_line = f"import type {{ {imports_code} }} from './openapi';\n" if imports_code else ""
    return (
        import_line
        + "import type { FieldMeta } from './common';\n\n"
        + f"export type {pascal(resource['key'])}Item = {resource['item_type']};\n"
        + (f"export type {pascal(resource['key'])}SaveDto = {resource['save_type']};\n" if resource["primary"]["save"] else "")
        + f"export interface {resource['list_params_name']} {{\n"
        + "\n".join(params_lines)
        + "\n}\n\n"
        + f"export const {camel(resource['key'])}FormFields: FieldMeta[] = {json.dumps(resource['form_fields'], ensure_ascii=False, indent=2)};\n\n"
        + f"export const {camel(resource['key'])}TableFields: FieldMeta[] = {json.dumps(resource['table_fields'], ensure_ascii=False, indent=2)};\n\n"
        + f"export const {camel(resource['key'])}DetailFields: FieldMeta[] = {json.dumps(resource['detail_fields'], ensure_ascii=False, indent=2)};\n"
    )


def render_client() -> str:
    return dedent(
        """
        import axios from 'axios';
        import { useAuthStore } from '@/stores/authStore';

        export const client = axios.create({
          baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
          timeout: 20000,
          // If backend uses cookies (session / SSO), make proxy + browser keep them.
          withCredentials: true,
        });

        export function buildPath(path: string, params: Record<string, string | number>) {
          return Object.entries(params).reduce((current, [key, value]) => {
            return current.replace(`{${key}}`, encodeURIComponent(String(value)));
          }, path);
        }

        client.interceptors.request.use((config) => {
          const token = useAuthStore.getState().token;
          if (token) {
            const bearerToken = `Bearer ${token}`;
            config.headers.Authorization = bearerToken;
            config.headers['Admin-Token'] = bearerToken;
          }
          // Ensure cookies are sent even if callers override config partially.
          config.withCredentials ??= true;
          return config;
        });

        client.interceptors.response.use(
          (response) => {
            const payload = response.data as { success?: boolean; message?: string } | undefined;
            if (payload && payload.success === false) {
              const businessError = new Error(payload.message || '请求失败') as Error & {
                response?: typeof response;
              };
              businessError.response = response;
              return Promise.reject(businessError);
            }
            return response;
          },
          (error) => {
            if (error?.response?.status === 401) {
              useAuthStore.getState().clearAuth();
              window.location.href = '/login';
            }
            return Promise.reject(error);
          }
        );
        """
    )


def response_type_for_operation(operation: dict) -> str:
    schema = response_schema(operation["raw"])
    kind = unwrap_list_kind(schema)
    inner_name, _ = unwrap_item_schema(schema)
    if kind == "page":
        return f"PageResponse<{inner_name or 'Record<string, unknown>'}>"
    if kind == "list":
        return f"ListResponse<{inner_name or 'Record<string, unknown>'}>"
    return f"ApiResponse<{inner_name or 'unknown'}>"


def render_api_file(resource: dict) -> str:
    type_imports = {"ApiResponse", "ListResponse", "PageResponse"}
    openapi_type_names = set()
    for operation in resource["operations"]:
        inner_name, _ = unwrap_item_schema(response_schema(operation["raw"]))
        if inner_name and inner_name not in {"unknown", "Record<string, unknown>"}:
            openapi_type_names.add(inner_name)
    lines = [
        "import { client, buildPath } from './client';",
        f"import type {{ {', '.join(sorted(type_imports))} }} from '@/types/common';",
    ]
    if openapi_type_names:
        lines.append(f"import type {{ {', '.join(sorted(openapi_type_names))} }} from '@/types/openapi';")
    list_params_name = resource["list_params_name"]
    type_names = [f"{pascal(resource['key'])}Item", list_params_name]
    if resource["primary"]["save"]:
        type_names.append(f"{pascal(resource['key'])}SaveDto")
    lines.append(f"import type {{ {', '.join(type_names)} }} from '@/types/{resource['key']}';")
    lines.append("")
    lines.append(f"export const {resource['api_name']} = {{")
    for operation in resource["operations"]:
        name = operation["name"]
        params = operation["raw"].get("parameters", [])
        path_params = [param for param in params if param.get("in") == "path"]
        query_params = [param for param in params if param.get("in") == "query"]
        method = operation["method"]
        path = operation["path"]
        body = request_schema(operation["raw"])
        response_type = response_type_for_operation(operation)
        if operation == resource["primary"]["list"]:
            lines.append(f"  list: (params?: {list_params_name}) =>")
            lines.append(f"    client.get<{response_type}>({json.dumps(path, ensure_ascii=False)}, {{ params }}),")
            continue
        if operation == resource["primary"]["detail"] and path_params:
            param_name = path_params[0]["name"]
            lines.append(f"  detail: ({param_name}: string | number) =>")
            lines.append(f"    client.get<{response_type}>(buildPath({json.dumps(path, ensure_ascii=False)}, {{ {param_name} }})),")
            continue
        if operation == resource["primary"]["save"] and body:
            lines.append(f"  save: (data: {pascal(resource['key'])}SaveDto) =>")
            lines.append(f"    client.post<{response_type}>({json.dumps(path, ensure_ascii=False)}, data),")
            continue
        if operation == resource["primary"]["delete"] and path_params:
            param_name = path_params[0]["name"]
            lines.append(f"  remove: ({param_name}: string | number) =>")
            lines.append(f"    client.delete<{response_type}>(buildPath({json.dumps(path, ensure_ascii=False)}, {{ {param_name} }})),")
            continue

        fn_params = []
        path_arg_obj = None
        if len(path_params) == 1:
          fn_params.append(f"{path_params[0]['name']}: string | number")
          path_arg_obj = "{ " + path_params[0]["name"] + " }"
        elif len(path_params) > 1:
          fn_params.append("pathParams: Record<string, string | number>")
          path_arg_obj = "pathParams"

        if body:
          fn_params.append("data: Record<string, unknown>")
        if query_params:
          entries = []
          for param in query_params:
              marker = "" if param.get("required") else "?"
              entries.append(f"{safe_prop(param['name'])}{marker}: {type_from_parameter(param)}")
          fn_params.append("params: { " + "; ".join(entries) + " }")

        url_expr = json.dumps(path, ensure_ascii=False)
        if path_arg_obj:
          url_expr = f"buildPath({url_expr}, {path_arg_obj})"

        request_target = f"client.{method}<{response_type}>"
        if method in {"get", "delete"}:
          if query_params:
            lines.append(f"  {name}: ({', '.join(fn_params)}) =>")
            lines.append(f"    {request_target}({url_expr}, {{ params }}),")
          else:
            lines.append(f"  {name}: ({', '.join(fn_params)}) =>")
            lines.append(f"    {request_target}({url_expr}),")
        else:
          if body and query_params:
            lines.append(f"  {name}: ({', '.join(fn_params)}) =>")
            lines.append(f"    {request_target}({url_expr}, data, {{ params }}),")
          elif body:
            lines.append(f"  {name}: ({', '.join(fn_params)}) =>")
            lines.append(f"    {request_target}({url_expr}, data),")
          elif query_params:
            lines.append(f"  {name}: ({', '.join(fn_params)}) =>")
            lines.append(f"    {request_target}({url_expr}, undefined, {{ params }}),")
          else:
            lines.append(f"  {name}: ({', '.join(fn_params)}) =>")
            lines.append(f"    {request_target}({url_expr}),")
    lines.append("};")
    lines.append("")
    return "\n".join(lines)


def render_auth_api() -> str:
    login_op = next(op for op in auth_operations if op["path"] == "/auth/login")
    info_op = next(op for op in auth_operations if op["path"] == "/auth/info")
    logout_op = next(op for op in auth_operations if op["path"] == "/auth/logout")
    return dedent(
        f"""
        import {{ client }} from './client';
        import type {{ ApiResponse }} from '@/types/common';
        import type {{ AdminLoginRequest, AdminLoginResponse, AdminUserInfoResponse }} from '@/types/openapi';

        export const authApi = {{
          login: (data: AdminLoginRequest) =>
            client.post<ApiResponse<AdminLoginResponse>>('/auth/login', data),
          info: () =>
            client.get<ApiResponse<AdminUserInfoResponse>>('/auth/info'),
          logout: () =>
            client.post<ApiResponse<void>>('/auth/logout'),
        }};
        """
    )


def render_dashboard_api() -> str:
    if not dashboard_resource:
        return ""
    return dedent(
        f"""
        import {{ client }} from './client';
        import type {{ ApiResponse }} from '@/types/common';
        import type {{ {dashboard_resource['item_type']} }} from '@/types/openapi';

        export const dashboardApi = {{
          stats: () => client.get<ApiResponse<{dashboard_resource['item_type']}>>('/dashboard/stats'),
        }};
        """
    )


def render_auth_store() -> str:
    return dedent(
        """
        import { create } from 'zustand';
        import { persist } from 'zustand/middleware';

        interface AuthUser {
          id?: number;
          username?: string;
          nickname?: string;
          role?: string;
        }

        interface AuthState {
          token: string | null;
          user: AuthUser | null;
          setAuth: (token: string, user: AuthUser | null) => void;
          clearAuth: () => void;
        }

        export const useAuthStore = create<AuthState>()(
          persist(
            (set) => ({
              token: null,
              user: null,
              setAuth: (token, user) => set({ token, user }),
              clearAuth: () => set({ token: null, user: null }),
            }),
            { name: 'wp-admin-auth' }
          )
        );
        """
    )


def render_create_resource_store() -> str:
    return dedent(
        """
        import { create } from 'zustand';
        import { toast } from 'sonner';
        import type { ApiResponse, ListResponse, PageResponse } from '@/types/common';
        import { normalizePagePayload } from '@/types/common';

        interface ResourceApi<TItem, TParams> {
          list?: (params?: TParams) => Promise<{ data: PageResponse<TItem> | ListResponse<TItem> }>;
          remove?: (id: string | number) => Promise<{ data: ApiResponse<unknown> }>;
        }

        export interface ResourceStoreState<TItem, TParams extends object> {
          list: TItem[];
          total: number;
          loading: boolean;
          params: TParams;
          setParams: (patch: Partial<TParams>) => void;
          resetParams: () => void;
          fetchList: () => Promise<void>;
          removeItem: (id: string | number) => Promise<void>;
          reset: () => void;
        }

        export function createResourceStore<TItem, TParams extends object>(
          api: ResourceApi<TItem, TParams>,
          initialParams: TParams
        ) {
          return create<ResourceStoreState<TItem, TParams>>((set, get) => ({
            list: [],
            total: 0,
            loading: false,
            params: initialParams,
            setParams: (patch) => set((state) => ({ params: { ...state.params, ...patch } })),
            resetParams: () => set({ params: initialParams }),
            fetchList: async () => {
              if (!api.list) return;
              set({ loading: true });
              try {
                const result = await api.list(get().params);
                const page = normalizePagePayload(result.data);
                set({ list: page.list, total: page.total });
              } catch (error) {
                console.error(error);
                toast.error('列表加载失败');
              } finally {
                set({ loading: false });
              }
            },
            removeItem: async (id) => {
              if (!api.remove) return;
              try {
                await api.remove(id);
                toast.success('删除成功');
                await get().fetchList();
              } catch (error) {
                console.error(error);
                toast.error('删除失败');
              }
            },
            reset: () => set({ list: [], total: 0, params: initialParams }),
          }));
        }
        """
    )


def render_resource_store(resource: dict) -> str:
    item_name = f"{pascal(resource['key'])}Item"
    return dedent(
        f"""
        import {{ createResourceStore }} from './createResourceStore';
        import {{ {resource['api_name']} }} from '@/api/{resource['key']}';
        import type {{ {item_name}, {resource['list_params_name']} }} from '@/types/{resource['key']}';

        export const {resource['store_name']} = createResourceStore<{item_name}, {resource['list_params_name']}>(
          {resource['api_name']},
          {{
            pageNum: 1,
            pageSize: 20,
          }} as {resource['list_params_name']}
        );
        """
    )


def render_resources_meta() -> str:
    entries = []
    for resource in resources:
        meta = {
            "key": resource["key"],
            "label": resource["tag"],
            "route": resource["route"],
            "itemType": resource["item_type"],
            "listParamsType": resource["list_params_name"],
            "saveType": resource["save_type"] if resource["primary"]["save"] else None,
            "tableFields": resource["table_fields"],
            "detailFields": resource["detail_fields"],
            "formFields": resource["form_fields"],
            "filters": resource["filters"],
            "actions": resource["actions"],
            "hasList": bool(resource["primary"]["list"]),
            "hasDetail": bool(resource["primary"]["detail"]),
            "hasSave": bool(resource["primary"]["save"]),
            "hasDelete": bool(resource["primary"]["delete"]),
        }
        entries.append(f"  {json.dumps(resource['key'])}: {json.dumps(meta, ensure_ascii=False, indent=2).replace(chr(10), chr(10) + '  ')},")
    sidebar = [{"label": "仪表盘", "path": "/dashboard"}] + [{"label": resource["tag"], "path": resource["route"]} for resource in resources]
    return (
        "import type { ResourceMeta } from '@/types/common';\n\n"
        + "export interface SidebarItem {\n  label: string;\n  path: string;\n}\n\n"
        + "export interface SidebarGroup {\n  title: string;\n  items: SidebarItem[];\n}\n\n"
        + "export const resourceMetaMap: Record<string, ResourceMeta> = {\n"
        + "\n".join(entries)
        + "\n};\n\n"
        + f"export const sidebarItems: SidebarItem[] = {json.dumps(sidebar, ensure_ascii=False, indent=2)};\n\n"
        + "function resolveSidebarGroup(item: SidebarItem) {\n"
        + "  const path = item.path;\n"
        + "  if (path === '/dashboard') return '总览';\n"
        + "  if (['/admin-user', '/login-fail', '/login-log-page'].includes(path)) return '权限与安全';\n"
        + "  if (['/user', '/team'].includes(path)) return '用户与团队';\n"
        + "  if (['/auto-reply-rule-page', '/broadcast-message', '/reminder-notification-page', '/shortcut-reply-page'].includes(path)) return '消息与内容';\n"
        + "  if (['/chatbot-chat-log-page', '/chatbot-preview-chat-page', '/chatbot-route', '/datasource', '/translate-route'].includes(path)) return 'AI 与知识库';\n"
        + "  if (['/membership-order', '/membership-plan', '/token-package', '/token-recharge-order'].includes(path)) return '订单与会员';\n"
        + "  if (['/token-alert-config', '/token-alert-record-page'].includes(path)) return '监控与告警';\n"
        + "  return '系统配置';\n"
        + "}\n\n"
        + "const sidebarGroupOrder = ['总览', '权限与安全', '用户与团队', 'AI 与知识库', '消息与内容', '订单与会员', '监控与告警', '系统配置'];\n\n"
        + "export const sidebarGroups: SidebarGroup[] = sidebarGroupOrder\n"
        + "  .map((title) => ({\n"
        + "    title,\n"
        + "    items: sidebarItems.filter((item) => resolveSidebarGroup(item) === title),\n"
        + "  }))\n"
        + "  .filter((group) => group.items.length > 0);\n"
    )


def render_ui_components() -> dict[str, str]:
    return {
        "src/lib/utils.ts": dedent(
            """
            import { type ClassValue, clsx } from 'clsx';

            export function cn(...inputs: ClassValue[]) {
              return clsx(inputs);
            }
            """
        ),
        "src/components/ui/button.tsx": dedent(
            """
            import * as React from 'react';
            import { cn } from '@/lib/utils';

            interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
              variant?: 'default' | 'outline' | 'destructive' | 'ghost';
            }

            export function Button({ className, variant = 'default', ...props }: ButtonProps) {
              return (
                <button
                  className={cn(
                    'inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50',
                    variant === 'default' && 'bg-slate-900 text-white hover:bg-slate-800',
                    variant === 'outline' && 'border border-slate-200 bg-white hover:bg-slate-50',
                    variant === 'destructive' && 'bg-red-600 text-white hover:bg-red-500',
                    variant === 'ghost' && 'hover:bg-slate-100',
                    className
                  )}
                  {...props}
                />
              );
            }
            """
        ),
        "src/components/ui/input.tsx": dedent(
            """
            import * as React from 'react';
            import { cn } from '@/lib/utils';

            export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
              ({ className, ...props }, ref) => (
                <input
                  ref={ref}
                  className={cn(
                    'flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-slate-400',
                    className
                  )}
                  {...props}
                />
              )
            );

            Input.displayName = 'Input';
            """
        ),
        "src/components/ui/textarea.tsx": dedent(
            """
            import * as React from 'react';
            import { cn } from '@/lib/utils';

            export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
              ({ className, ...props }, ref) => (
                <textarea
                  ref={ref}
                  className={cn(
                    'flex min-h-24 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-slate-400',
                    className
                  )}
                  {...props}
                />
              )
            );

            Textarea.displayName = 'Textarea';
            """
        ),
        "src/components/ui/select.tsx": dedent(
            """
            import * as React from 'react';
            import { cn } from '@/lib/utils';

            export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
              return (
                <select
                  {...props}
                  className={cn(
                    'flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-slate-400',
                    props.className
                  )}
                />
              );
            }
            """
        ),
        "src/components/ui/switch.tsx": dedent(
            """
            interface SwitchProps {
              checked: boolean;
              onCheckedChange: (checked: boolean) => void;
            }

            export function Switch({ checked, onCheckedChange }: SwitchProps) {
              return (
                <button
                  type="button"
                  onClick={() => onCheckedChange(!checked)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${checked ? 'bg-slate-900' : 'bg-slate-300'}`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${checked ? 'translate-x-5' : 'translate-x-1'}`}
                  />
                </button>
              );
            }
            """
        ),
        "src/components/ui/card.tsx": dedent(
            """
            import * as React from 'react';
            import { cn } from '@/lib/utils';

            export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
              return <div className={cn('rounded-xl border border-slate-200 bg-white shadow-sm', className)} {...props} />;
            }

            export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
              return <div className={cn('border-b border-slate-100 px-5 py-4', className)} {...props} />;
            }

            export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
              return <h3 className={cn('text-base font-semibold text-slate-900', className)} {...props} />;
            }

            export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
              return <div className={cn('p-5', className)} {...props} />;
            }
            """
        ),
        "src/components/ui/badge.tsx": dedent(
            """
            import * as React from 'react';
            import { cn } from '@/lib/utils';

            type BadgeVariant = 'neutral' | 'success' | 'danger' | 'warning' | 'info';

            interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
              variant?: BadgeVariant;
            }

            const badgeVariants: Record<BadgeVariant, string> = {
              neutral: 'border-white/10 bg-white/[0.06] text-[var(--text-main)]',
              success: 'border-emerald-300/20 bg-emerald-400/15 text-emerald-200',
              danger: 'border-rose-300/20 bg-rose-400/15 text-rose-200',
              warning: 'border-amber-300/20 bg-amber-400/18 text-amber-100',
              info: 'border-sky-300/20 bg-sky-400/15 text-sky-200',
            };

            export function Badge({ className, variant = 'neutral', ...props }: BadgeProps) {
              return (
                <span
                  className={cn(
                    'inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold tracking-[0.01em]',
                    badgeVariants[variant],
                    className
                  )}
                  {...props}
                />
              );
            }
            """
        ),
        "src/components/ui/tooltip-text.tsx": dedent(
            """
            import type { ReactNode } from 'react';

            interface TooltipTextProps {
              content: string;
              children: ReactNode;
              className?: string;
            }

            export function TooltipText({ content, children, className = '' }: TooltipTextProps) {
              return (
                <span className={`group/tooltip relative inline-flex max-w-full items-center ${className}`}>
                  <span className="min-w-0">{children}</span>
                  <span className="pointer-events-none absolute left-1/2 top-full z-30 mt-2 w-max max-w-[280px] -translate-x-1/2 rounded-2xl border border-white/10 bg-[rgba(9,14,26,0.96)] px-3 py-2 text-[11px] font-medium normal-case tracking-normal text-[var(--text-main)] opacity-0 shadow-[0_16px_50px_rgba(0,0,0,0.45)] transition duration-200 group-hover/tooltip:translate-y-0 group-hover/tooltip:opacity-100">
                    {content}
                  </span>
                </span>
              );
            }
            """
        ),
        "src/components/ui/dialog.tsx": dedent(
            """
            import type * as React from 'react';
            import type { ReactNode } from 'react';

            interface DialogProps {
              open: boolean;
              onOpenChange: (open: boolean) => void;
              children: ReactNode;
            }

            export function Dialog({ open, onOpenChange, children }: DialogProps) {
              if (!open) return null;
              return (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={() => onOpenChange(false)}>
                  <div className="w-full max-w-2xl rounded-xl bg-white shadow-xl" onClick={(event) => event.stopPropagation()}>
                    {children}
                  </div>
                </div>
              );
            }

            export function DialogHeader({ children }: { children: ReactNode }) {
              return <div className="border-b border-slate-100 px-5 py-4">{children}</div>;
            }

            export function DialogTitle({ children }: { children: ReactNode }) {
              return <h3 className="text-base font-semibold text-slate-900">{children}</h3>;
            }

            export function DialogContent({ children }: { children: ReactNode }) {
              return <div className="p-5">{children}</div>;
            }
            """
        ),
        "src/components/ui/table.tsx": dedent(
            """
            import type { ReactNode } from 'react';

            export function Table({ children }: { children: ReactNode }) {
              return <table className="min-w-full w-max divide-y divide-slate-200">{children}</table>;
            }

            export function TableHead({ children }: { children: ReactNode }) {
              return <thead className="bg-slate-50">{children}</thead>;
            }

            export function TableBody({ children }: { children: ReactNode }) {
              return <tbody className="divide-y divide-slate-100 bg-white">{children}</tbody>;
            }

            export function TableRow({ children }: { children: ReactNode }) {
              return <tr>{children}</tr>;
            }

            export function TableHeaderCell({ children }: { children: ReactNode }) {
              return <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">{children}</th>;
            }

            export function TableCell({
              children,
              className = '',
              ...props
            }: React.TdHTMLAttributes<HTMLTableCellElement> & { children: ReactNode }) {
              return (
                <td className={`px-4 py-3 align-top text-sm text-slate-700 ${className}`} {...props}>
                  {children}
                </td>
              );
            }
            """
        ),
    }


def render_resource_components() -> dict[str, str]:
    return {
        "src/components/resource/ResourceFormDialog.tsx": dedent(
            """
            import { useEffect, useMemo } from 'react';
            import { useForm, Controller } from 'react-hook-form';
            import { z } from 'zod';
            import { zodResolver } from '@hookform/resolvers/zod';
            import { toast } from 'sonner';
            import type { FieldMeta, ResourceMeta } from '@/types/common';
            import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
            import { Input } from '@/components/ui/input';
            import { Textarea } from '@/components/ui/textarea';
            import { Select } from '@/components/ui/select';
            import { Switch } from '@/components/ui/switch';
            import { Button } from '@/components/ui/button';
            import { TooltipText } from '@/components/ui/tooltip-text';

            type AnyRecord = Record<string, unknown>;
            type FieldOptionLike = string | number | { label: string; value: string | number };

            function compactFieldLabel(label: string) {
              return label
                .replace(/（.*?）/g, '')
                .replace(/\(.*?\)/g, '')
                .replace(/[：:].*$/, '')
                .trim();
            }

            type FieldLayoutMode = 'half' | 'full' | 'row';

            function getFieldLayoutMode(field: FieldMeta): FieldLayoutMode {
              const lowered = field.name.toLowerCase();
              if (
                field.kind === 'textarea' ||
                ['description', 'content', 'prompt', 'instruction', 'rule', 'template', 'config', 'setting', 'json', 'body', 'message', 'remark', 'note'].some((token) =>
                  lowered.includes(token)
                )
              ) {
                return 'row';
              }
              if (
                field.kind === 'datetime' ||
                ['url', 'path', 'secret', 'token', 'key', 'code', 'domain', 'host', 'email', 'phone', 'start', 'end'].some((token) =>
                  lowered.includes(token)
                ) ||
                (field.label?.length ?? 0) >= 18
              ) {
                return 'full';
              }
              return 'half';
            }

            function getFieldGridClass(field: FieldMeta) {
              const layout = getFieldLayoutMode(field);
              if (layout === 'row') return 'col-span-12';
              if (layout === 'full') return 'col-span-12 xl:col-span-8';
              return 'col-span-12 md:col-span-6 xl:col-span-4';
            }

            function createSchema(fields: FieldMeta[]) {
              const shape: Record<string, z.ZodTypeAny> = {};
              for (const field of fields) {
                if (field.kind === 'switch') {
                  shape[field.name] = field.required ? z.boolean() : z.boolean().optional();
                  continue;
                }
                if (field.kind === 'number') {
                  const base = z.preprocess((value) => (value === '' || value === undefined ? undefined : Number(value)), z.number());
                  shape[field.name] = field.required ? base : base.optional();
                  continue;
                }
                const base = z.string();
                shape[field.name] = field.required ? base.min(1, `${field.label}不能为空`) : base.optional();
              }
              return z.object(shape);
            }

            function getTemporalInputType(field: FieldMeta) {
              if (field.format === 'date') return 'date';
              if (field.format === 'time') return 'time';
              return 'datetime-local';
            }

            function normalizeTemporalValue(field: FieldMeta, value: unknown) {
              if (typeof value !== 'string' || !value) return '';
              if (field.format === 'date') return value.slice(0, 10);
              if (field.format === 'time') return value.slice(0, 5);
              const date = new Date(value);
              if (Number.isNaN(date.getTime())) return value;
              const offset = date.getTimezoneOffset();
              const localDate = new Date(date.getTime() - offset * 60 * 1000);
              return localDate.toISOString().slice(0, 16);
            }

            function getDefaultValue(field: FieldMeta, initialValue: unknown) {
              if (initialValue !== undefined && initialValue !== null) {
                if (field.kind === 'datetime') {
                  return normalizeTemporalValue(field, initialValue);
                }
                return initialValue;
              }
              if (field.kind === 'switch') return false;
              return '';
            }

            function normalizeOption(option: FieldOptionLike) {
              if (typeof option === 'object' && option !== null && 'value' in option) {
                return option;
              }
              return { label: String(option), value: option };
            }

            function getTemporalInputType(field: { format?: string; name: string }) {
              if (field.format === 'date') return 'date';
              if (field.format === 'time') return 'time';
              if (field.name.toLowerCase().includes('time') || field.name.toLowerCase().includes('date')) return 'datetime-local';
              return 'datetime-local';
            }

            function normalizeTemporalFilterValue(field: { format?: string }, value: unknown) {
              if (typeof value !== 'string' || !value) return '';
              if (field.format === 'date') return value.slice(0, 10);
              if (field.format === 'time') return value.slice(0, 5);
              const date = new Date(value);
              if (Number.isNaN(date.getTime())) return value;
              const offset = date.getTimezoneOffset();
              const localDate = new Date(date.getTime() - offset * 60 * 1000);
              return localDate.toISOString().slice(0, 16);
            }

            function normalizeTemporalSubmitValue(field: { format?: string }, value: FormDataEntryValue | null) {
              if (typeof value !== 'string' || value === '') return undefined;
              if (field.format === 'date' || field.format === 'time') return value;
              return new Date(value).toISOString();
            }

            interface ResourceFormDialogProps {
              open: boolean;
              mode: 'create' | 'edit';
              meta: ResourceMeta;
              initialValues?: AnyRecord | null;
              onOpenChange: (open: boolean) => void;
              onSubmit: (payload: AnyRecord) => Promise<void>;
            }

            export function ResourceFormDialog({
              open,
              mode,
              meta,
              initialValues,
              onOpenChange,
              onSubmit,
            }: ResourceFormDialogProps) {
              const schema = useMemo(() => createSchema(meta.formFields), [meta.formFields]);
              const form = useForm<AnyRecord>({
                resolver: zodResolver(schema),
                defaultValues: {},
              });

              useEffect(() => {
                const nextValues: AnyRecord = {};
                for (const field of meta.formFields) {
                  nextValues[field.name] = getDefaultValue(field, initialValues?.[field.name]);
                }
                form.reset(nextValues);
              }, [form, initialValues, meta.formFields, open]);

              const submit = form.handleSubmit(async (values) => {
                try {
                  const payload = { ...values };
                  for (const field of meta.formFields) {
                    const value = payload[field.name];
                    if (value === '' || value === undefined) continue;
                    if (field.type === 'integer' || field.type === 'number') {
                      payload[field.name] = Number(value);
                    }
                    if (field.kind === 'datetime' && typeof value === 'string' && field.format === 'date-time') {
                      payload[field.name] = new Date(value).toISOString();
                    }
                  }
                  if (mode === 'edit' && initialValues?.id !== undefined) {
                    payload.id = initialValues.id;
                  }
                  await onSubmit(payload);
                  toast.success(mode === 'create' ? '创建成功' : '保存成功');
                  onOpenChange(false);
                } catch (error) {
                  console.error(error);
                  toast.error(mode === 'create' ? '创建失败' : '保存失败');
                }
              });

              return (
                <Dialog open={open} onOpenChange={onOpenChange}>
                  <DialogHeader>
                    <DialogTitle>{mode === 'create' ? `新增${meta.label}` : `编辑${meta.label}`}</DialogTitle>
                  </DialogHeader>
                  <DialogContent>
                    <form className="grid grid-cols-12 gap-6" onSubmit={submit}>
                      {meta.formFields.map((field) => (
                        <div className={`grid gap-2 ${getFieldGridClass(field)}`} key={field.name}>
                          <label className="text-sm font-medium text-slate-700">
                            <TooltipText content={field.label}>
                              <span className="truncate">{compactFieldLabel(field.label)}</span>
                            </TooltipText>
                          </label>
                          <Controller
                            control={form.control}
                            name={field.name}
                            render={({ field: controllerField }) => {
                              if (field.kind === 'textarea') {
                                return <Textarea {...controllerField} value={(controllerField.value as string) ?? ''} />;
                              }
                              if (field.kind === 'select') {
                                return (
                                  <Select {...controllerField} value={(controllerField.value as string) ?? ''}>
                                    <option value="">请选择</option>
                                    {(field.options ?? []).map((rawOption) => {
                                      const option = normalizeOption(rawOption);
                                      return (
                                        <option key={String(option.value)} value={String(option.value)}>
                                          {option.label}
                                        </option>
                                      );
                                    })}
                                        </option>
                                      );
                                    })}
                                  </Select>
                                );
                              }
                              if (field.kind === 'switch') {
                                return (
                                  <div className="pt-2">
                                    <Switch checked={Boolean(controllerField.value)} onCheckedChange={controllerField.onChange} />
                                  </div>
                                );
                              }
                              if (field.kind === 'datetime') {
                                return (
                                  <Input
                                    {...controllerField}
                                    type={getTemporalInputType(field)}
                                    value={(controllerField.value as string) ?? ''}
                                  />
                                );
                              }
                              return (
                                <Input
                                  {...controllerField}
                                  type={field.kind === 'number' ? 'number' : 'text'}
                                  value={(controllerField.value as string | number) ?? ''}
                                />
                              );
                            }}
                          />
                          {form.formState.errors[field.name] ? (
                            <p className="text-xs text-red-500">{String(form.formState.errors[field.name]?.message ?? '')}</p>
                          ) : null}
                        </div>
                      ))}
                      <div className="flex justify-end gap-3">
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                          取消
                        </Button>
                        <Button type="submit">提交</Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              );
            }
            """
        ),
        "src/components/resource/ResourceTablePage.tsx": dedent(
            """
            import { useEffect, useMemo, useState } from 'react';
            import type { ComponentProps, ComponentType } from 'react';
            import { Link } from 'react-router-dom';
            import { toast } from 'sonner';
            import type { ResourceMeta } from '@/types/common';
            import { formatFieldValue, getFieldValueTone } from '@/types/common';
            import { Badge } from '@/components/ui/badge';
            import { Button } from '@/components/ui/button';
            import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
            import { Input } from '@/components/ui/input';
            import { Select } from '@/components/ui/select';
            import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '@/components/ui/table';
            import { TooltipText } from '@/components/ui/tooltip-text';

            type AnyRecord = Record<string, unknown>;
            type FieldOptionLike = string | number | { label: string; value: string | number };
            type FormSubmitEvent = Parameters<NonNullable<ComponentProps<'form'>['onSubmit']>>[0];

            function compactFieldLabel(label: string) {
              return label
                .replace(/（.*?）/g, '')
                .replace(/\(.*?\)/g, '')
                .replace(/[：:].*$/, '')
                .replace(/管理$/, '')
                .trim();
            }

            function normalizeOption(option: FieldOptionLike) {
              if (typeof option === 'object' && option !== null && 'value' in option) {
                return option;
              }
              return { label: String(option), value: option };
            }

            interface ResourceTablePageProps {
              meta: ResourceMeta;
              api: Record<string, (...args: any[]) => Promise<any>>;
              useStore: any;
              CreateModal?: ComponentType<{ open: boolean; onOpenChange: (open: boolean) => void; onSuccess: () => Promise<void> }>;
              EditModal?: ComponentType<{ open: boolean; onOpenChange: (open: boolean) => void; data: AnyRecord | null; onSuccess: () => Promise<void> }>;
            }

            export function ResourceTablePage({ meta, api, useStore, CreateModal, EditModal }: ResourceTablePageProps) {
              const list = useStore((state: AnyRecord) => state.list as AnyRecord[]);
              const total = useStore((state: AnyRecord) => state.total as number);
              const loading = useStore((state: AnyRecord) => state.loading as boolean);
              const params = useStore((state: AnyRecord) => state.params as AnyRecord);
              const setParams = useStore((state: AnyRecord) => state.setParams as (patch: AnyRecord) => void);
              const resetParams = useStore((state: AnyRecord) => state.resetParams as () => void);
              const fetchList = useStore((state: AnyRecord) => state.fetchList as () => Promise<void>);
              const removeItem = useStore((state: AnyRecord) => state.removeItem as (id: string | number) => Promise<void>);

              const [createOpen, setCreateOpen] = useState(false);
              const [editOpen, setEditOpen] = useState(false);
              const [selected, setSelected] = useState<AnyRecord | null>(null);
              const filterValues = useMemo(() => ({ ...params }), [params]);
              const pageKey = 'page' in params ? 'page' : 'pageNum';
              const pageSizeKey = 'pageSize' in params ? 'pageSize' : 'pageSize';
              const currentPage = Number(params[pageKey] ?? 1);
              const currentPageSize = Number(params[pageSizeKey] ?? 20);
              const totalPages = Math.max(1, Math.ceil(total / Math.max(currentPageSize, 1)));
              const filterFormKey = useMemo(
                () => JSON.stringify(meta.filters.map((filter) => [filter.name, String(filterValues[filter.name] ?? '')])),
                [filterValues, meta.filters]
              );

              useEffect(() => {
                void fetchList();
              }, [fetchList, params]);

              const handleSearch = (event: FormSubmitEvent) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                const next: AnyRecord = { [pageKey]: 1 };
                for (const filter of meta.filters) {
                  const value = formData.get(filter.name);
                  next[filter.name] = filter.kind === 'datetime' ? normalizeTemporalSubmitValue(filter, value) : value === '' ? undefined : value;
                }
                setParams(next);
              };

              const invokeAction = async (action: { name: string; label: string; pathParam: string; queryParams?: Array<{ name: string; label: string }> }, row: AnyRecord) => {
                const fn = api[action.name];
                if (!fn) return;
                const pathValue = row[action.pathParam];
                if (pathValue === undefined) {
                  toast.error('缺少操作主键');
                  return;
                }
                if (action.queryParams?.length) {
                  const params: AnyRecord = {};
                  for (const field of action.queryParams) {
                    const result = window.prompt(`请输入${field.label}`, '');
                    if (result === null) return;
                    params[field.name] = result;
                  }
                  await fn(pathValue as string | number, params);
                } else {
                  await fn(pathValue as string | number);
                }
                toast.success(`${action.label}成功`);
                await fetchList();
              };

              return (
                <Card>
                  <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <CardTitle>{meta.label}</CardTitle>
                    <div className="flex gap-2">
                      {meta.hasSave && CreateModal ? (
                        <Button onClick={() => setCreateOpen(true)}>新增</Button>
                      ) : null}
                    </div>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    {meta.filters.length ? (
                      <form
                        key={filterFormKey}
                        className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-3 rounded-lg bg-slate-50 p-4"
                        onSubmit={handleSearch}
                      >
                        {meta.filters.map((filter) => (
                          <div className="grid gap-1" key={filter.name}>
                            <label className="text-xs font-medium text-slate-500">
                              <TooltipText content={filter.label}>
                                <span className="truncate">{compactFieldLabel(filter.label)}</span>
                              </TooltipText>
                            </label>
                            {filter.kind === 'select' ? (
                              <Select name={filter.name} defaultValue={String(filterValues[filter.name] ?? '')}>
                                <option value="">全部</option>
                                {(filter.options ?? []).map((rawOption) => {
                                  const option = normalizeOption(rawOption);
                                  return (
                                    <option key={String(option.value)} value={String(option.value)}>
                                      {option.label}
                                    </option>
                                  );
                                })}
                              </Select>
                            ) : filter.kind === 'datetime' ? (
                              <Input
                                defaultValue={normalizeTemporalFilterValue(filter, filterValues[filter.name])}
                                name={filter.name}
                                type={getTemporalInputType(filter)}
                              />
                            ) : (
                              <Input name={filter.name} defaultValue={String(filterValues[filter.name] ?? '')} />
                            )}
                          </div>
                        ))}
                        <div className="col-span-full flex flex-wrap items-end gap-2 pt-1">
                          <Button type="submit">查询</Button>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                              resetParams();
                            }}
                          >
                            重置
                          </Button>
                        </div>
                      </form>
                    ) : null}

                    <div className="overflow-x-auto overflow-y-hidden rounded-lg border border-slate-200">
                      <Table>
                        <TableHead>
                          <TableRow>
                            {meta.tableFields.map((field) => (
                              <TableHeaderCell key={field.name}>
                                <TooltipText content={field.label}>
                                  <span className="truncate">{compactFieldLabel(field.label)}</span>
                                </TooltipText>
                              </TableHeaderCell>
                            ))}
                            <TableHeaderCell>操作</TableHeaderCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {loading ? (
                            <TableRow>
                              <TableCell className="text-center" colSpan={meta.tableFields.length + 1}>
                                加载中...
                              </TableCell>
                            </TableRow>
                          ) : list.length ? (
                            list.map((row: AnyRecord, index: number) => (
                              <TableRow key={String(row.id ?? row.orderNo ?? index)}>
                                {meta.tableFields.map((field) => (
                                  <TableCell key={field.name}>
                                    {(() => {
                                      const text = formatFieldValue(field, row[field.name]);
                                      const tone = getFieldValueTone(field, row[field.name]);
                                      return tone ? <Badge variant={tone}>{text}</Badge> : text;
                                    })()}
                                  </TableCell>
                                ))}
                                <TableCell className="flex flex-wrap gap-2">
                                  {meta.hasDetail && row.id !== undefined ? (
                                    <Link className="text-sm text-blue-600 hover:underline" to={`${meta.route}/${row.id}`}>
                                      详情
                                    </Link>
                                  ) : null}
                                  {meta.hasSave && EditModal ? (
                                    <button
                                      className="text-sm text-slate-700 hover:underline"
                                      type="button"
                                      onClick={() => {
                                        setSelected(row);
                                        setEditOpen(true);
                                      }}
                                    >
                                      编辑
                                    </button>
                                  ) : null}
                                  {meta.hasDelete && row.id !== undefined ? (
                                    <button
                                      className="text-sm text-red-600 hover:underline"
                                      type="button"
                                      onClick={async () => {
                                        if (!window.confirm('确认删除该记录吗？')) return;
                                        await removeItem(row.id as string | number);
                                      }}
                                    >
                                      删除
                                    </button>
                                  ) : null}
                                  {meta.actions.map((action) => (
                                    <button
                                      className="text-sm text-slate-700 hover:underline"
                                      key={action.name}
                                      type="button"
                                      onClick={() => void invokeAction(action, row)}
                                    >
                                      {action.label}
                                    </button>
                                  ))}
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell className="text-center" colSpan={meta.tableFields.length + 1}>
                                暂无数据
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-sm text-slate-500">共 {total} 条</p>
                      <div className="flex items-center gap-2">
                        <Select
                          className="w-28"
                          value={String(currentPageSize)}
                          onChange={(event) => setParams({ [pageKey]: 1, [pageSizeKey]: Number(event.target.value) })}
                        >
                          {[10, 20, 50, 100].map((size) => (
                            <option key={size} value={size}>
                              {size} / 页
                            </option>
                          ))}
                        </Select>
                        <Button
                          variant="outline"
                          disabled={currentPage <= 1}
                          onClick={() => setParams({ [pageKey]: Math.max(1, currentPage - 1) })}
                        >
                          上一页
                        </Button>
                        <span className="text-sm text-slate-600">第 {currentPage} / {totalPages} 页</span>
                        <Button
                          variant="outline"
                          disabled={currentPage >= totalPages}
                          onClick={() => setParams({ [pageKey]: Math.min(totalPages, currentPage + 1) })}
                        >
                          下一页
                        </Button>
                      </div>
                    </div>
                  </CardContent>

                  {CreateModal ? <CreateModal open={createOpen} onOpenChange={setCreateOpen} onSuccess={fetchList} /> : null}
                  {EditModal ? (
                    <EditModal open={editOpen} onOpenChange={setEditOpen} data={selected} onSuccess={fetchList} />
                  ) : null}
                </Card>
              );
            }
            """
        ),
        "src/components/resource/ResourceDetailPage.tsx": dedent(
            """
            import { useEffect, useState } from 'react';
            import { useParams } from 'react-router-dom';
            import type { ResourceMeta } from '@/types/common';
            import { unwrapApiData, formatFieldValue, getFieldValueTone } from '@/types/common';
            import { Badge } from '@/components/ui/badge';
            import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

            type AnyRecord = Record<string, unknown>;

            interface ResourceDetailPageProps {
              meta: ResourceMeta;
              api: Record<string, (...args: any[]) => Promise<any>>;
            }

            export function ResourceDetailPage({ meta, api }: ResourceDetailPageProps) {
              const { id } = useParams();
              const [data, setData] = useState<AnyRecord | null>(null);
              const [loading, setLoading] = useState(false);

              const renderFieldValue = (field: ResourceMeta['detailFields'][number], value: unknown, className: string) => {
                const text = formatFieldValue(field, value);
                const tone = getFieldValueTone(field, value);
                if (tone) {
                  return (
                    <div className={className}>
                      <Badge variant={tone}>{text}</Badge>
                    </div>
                  );
                }
                return <p className={className}>{text}</p>;
              };

              useEffect(() => {
                if (!id || !api.detail) return;
                setLoading(true);
                api
                  .detail(id)
                  .then((response) => setData(unwrapApiData(response.data)))
                  .finally(() => setLoading(false));
              }, [api, id]);

              return (
                <Card>
                  <CardHeader>
                    <CardTitle>{meta.label}详情</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <p className="text-sm text-slate-500">加载中...</p>
                    ) : data ? (
                      <div className="grid gap-4 md:grid-cols-2">
                        {meta.detailFields.map((field) => (
                          <div className="rounded-lg border border-slate-100 p-4" key={field.name}>
                            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">{field.label}</p>
                            {renderFieldValue(field, data[field.name], 'mt-2 whitespace-pre-wrap text-sm text-slate-700')}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-slate-500">未找到数据</p>
                    )}
                  </CardContent>
                </Card>
              );
            }
            """
        ),
        "src/components/dashboard/StatsOverview.tsx": dedent(
            """
            import { useEffect, useState } from 'react';
            import { dashboardApi } from '@/api/dashboard';
            import { unwrapApiData, formatValue } from '@/types/common';
            import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

            export default function StatsOverview() {
              const [data, setData] = useState<Record<string, unknown> | null>(null);

              useEffect(() => {
                dashboardApi.stats().then((response) => {
                  setData(unwrapApiData(response.data) as unknown as Record<string, unknown>);
                });
              }, []);

              return (
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  {(data
                    ? Object.entries(data)
                    : []).map(([key, value]) => (
                    <Card key={key}>
                      <CardHeader>
                        <CardTitle className="text-sm text-slate-500">{key}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-semibold text-slate-900">{formatValue(value)}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              );
            }
            """
        ),
    }


def render_layout_files() -> dict[str, str]:
    return {
        "src/components/layout/AuthGuard.tsx": dedent(
            """
            import type { ReactNode } from 'react';
            import { Navigate, useLocation } from 'react-router-dom';
            import { useAuthStore } from '@/stores/authStore';

            export default function AuthGuard({ children }: { children: ReactNode }) {
              const token = useAuthStore((state) => state.token);
              const location = useLocation();
              if (!token) {
                return <Navigate replace state={{ from: location }} to="/login" />;
              }
              return <>{children}</>;
            }
            """
        ),
        "src/components/layout/Sidebar.tsx": dedent(
            """
            import { useEffect, useMemo, useState } from 'react';
            import { NavLink, useLocation } from 'react-router-dom';
            import { sidebarGroups } from '@/generated/resources';

            const SIDEBAR_STORAGE_KEY = 'wp-admin-sidebar-open-group';

            export default function Sidebar() {
              const location = useLocation();
              const groupTitles = useMemo(() => sidebarGroups.map((group) => group.title), []);
              const currentGroupTitle = useMemo(
                () =>
                  sidebarGroups.find((group) =>
                    group.items.some((item) => location.pathname === item.path || location.pathname.startsWith(`${item.path}/`))
                  )?.title ?? groupTitles[0],
                [groupTitles, location.pathname]
              );
              const [openGroup, setOpenGroup] = useState<string | null>(null);

              useEffect(() => {
                const savedGroup = window.localStorage.getItem(SIDEBAR_STORAGE_KEY);
                if (savedGroup && groupTitles.includes(savedGroup)) {
                  setOpenGroup(savedGroup);
                  return;
                }
                setOpenGroup(currentGroupTitle);
              }, [currentGroupTitle, groupTitles]);

              useEffect(() => {
                if (!currentGroupTitle) return;
                setOpenGroup(currentGroupTitle);
                window.localStorage.setItem(SIDEBAR_STORAGE_KEY, currentGroupTitle);
              }, [location.pathname]);

              const toggleGroup = (title: string) => {
                const nextOpenGroup = openGroup === title ? null : title;
                setOpenGroup(nextOpenGroup);
                if (nextOpenGroup) {
                  window.localStorage.setItem(SIDEBAR_STORAGE_KEY, nextOpenGroup);
                } else {
                  window.localStorage.removeItem(SIDEBAR_STORAGE_KEY);
                }
              };

              return (
                <aside className="hidden w-80 shrink-0 p-5 lg:block">
                  <div className="sticky top-5 overflow-hidden rounded-[28px] border border-[var(--border-soft)] bg-[linear-gradient(180deg,rgba(12,19,34,0.95),rgba(10,14,27,0.78))] shadow-[0_20px_80px_rgba(0,0,0,0.28)] backdrop-blur">
                    <div className="border-b border-[var(--border-soft)] px-6 py-6">
                      <div className="mb-4 inline-flex rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-amber-200">
                        Control Room
                      </div>
                      <h1 className="font-['Fraunces'] text-2xl font-semibold text-[var(--text-main)]">WP Admin</h1>
                      <p className="mt-2 max-w-[14rem] text-sm leading-6 text-[var(--text-muted)]">为内容、账户与业务数据准备的深色运营控制台。</p>
                    </div>
                    <nav className="flex max-h-[calc(100vh-180px)] flex-col gap-4 overflow-auto p-4">
                      {sidebarGroups.map((group) => (
                        <section
                          key={group.title}
                          className={`grid gap-1.5 rounded-[24px] border p-2 transition ${
                            currentGroupTitle === group.title
                              ? 'border-amber-300/20 bg-[linear-gradient(180deg,rgba(240,169,79,0.12),rgba(255,255,255,0.02))] shadow-[inset_0_0_0_1px_rgba(240,169,79,0.06)]'
                              : 'border-transparent bg-transparent'
                          }`}
                        >
                          <button
                            className={`flex items-center justify-between rounded-2xl px-3 py-2 text-left transition ${
                              currentGroupTitle === group.title ? 'bg-white/[0.04]' : 'hover:bg-white/[0.04]'
                            }`}
                            onClick={() => toggleGroup(group.title)}
                            type="button"
                          >
                            <span className="flex min-w-0 items-center gap-3">
                              <span
                                className={`h-8 w-1 rounded-full transition ${
                                  currentGroupTitle === group.title ? 'bg-amber-300 shadow-[0_0_18px_rgba(240,169,79,0.8)]' : 'bg-white/10'
                                }`}
                              />
                              <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--text-soft)]">{group.title}</span>
                            </span>
                            <span className="flex items-center gap-3">
                              <span
                                className={`inline-flex min-w-8 items-center justify-center rounded-full border px-2.5 py-1 text-[10px] font-semibold ${
                                  currentGroupTitle === group.title
                                    ? 'border-amber-300/30 bg-amber-300/12 text-amber-100'
                                    : 'border-white/10 bg-white/[0.04] text-[var(--text-soft)]'
                                }`}
                              >
                                {group.items.length}
                              </span>
                              <span
                                className={`text-xs text-[var(--text-soft)] transition-transform duration-200 ${
                                  openGroup === group.title ? 'rotate-0' : 'rotate-[-90deg]'
                                }`}
                              >
                                v
                              </span>
                            </span>
                          </button>
                          <div
                            className={`grid gap-1 overflow-hidden transition-all duration-300 ${
                              openGroup === group.title ? 'max-h-[640px] opacity-100' : 'max-h-0 opacity-0'
                            }`}
                          >
                            {group.items.map((item) => (
                              <NavLink
                                key={item.path}
                                className={({ isActive }) =>
                                  [
                                    'group relative overflow-hidden rounded-2xl px-4 py-3 text-sm transition',
                                    isActive
                                      ? 'bg-[linear-gradient(135deg,rgba(240,169,79,0.24),rgba(240,169,79,0.1))] text-[var(--text-main)] shadow-[inset_0_0_0_1px_rgba(240,169,79,0.2)]'
                                      : 'text-[var(--text-muted)] hover:bg-white/[0.045] hover:text-[var(--text-main)]',
                                  ].join(' ')
                                }
                                to={item.path}
                              >
                                <span className="relative z-10 flex items-center justify-between gap-3">
                                  <span>{item.label}</span>
                                  <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-soft)]">view</span>
                                </span>
                              </NavLink>
                            ))}
                          </div>
                        </section>
                      ))}
                    </nav>
                  </div>
                </aside>
              );
            }
            """
        ),
        "src/components/layout/Header.tsx": dedent(
            """
            import { useMemo } from 'react';
            import { useLocation, useNavigate } from 'react-router-dom';
            import { authApi } from '@/api/auth';
            import { Button } from '@/components/ui/button';
            import { useAuthStore } from '@/stores/authStore';

            export default function Header() {
              const location = useLocation();
              const navigate = useNavigate();
              const user = useAuthStore((state) => state.user);
              const clearAuth = useAuthStore((state) => state.clearAuth);

              const breadcrumb = useMemo(() => location.pathname.split('/').filter(Boolean).join(' / ') || 'dashboard', [location.pathname]);

              return (
                <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-400">当前位置</p>
                    <p className="text-sm font-medium text-slate-800">{breadcrumb}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-slate-600">{String(user?.username ?? user?.nickname ?? '管理员')}</span>
                    <Button
                      variant="outline"
                      onClick={async () => {
                        try {
                          await authApi.logout();
                        } catch (error) {
                          console.error(error);
                        } finally {
                          clearAuth();
                          navigate('/login');
                        }
                      }}
                    >
                      退出登录
                    </Button>
                  </div>
                </header>
              );
            }
            """
        ),
        "src/components/layout/AppLayout.tsx": dedent(
            """
            import { Outlet } from 'react-router-dom';
            import Sidebar from './Sidebar';
            import Header from './Header';

            export default function AppLayout() {
              return (
                <div className="flex min-h-screen bg-slate-100">
                  <Sidebar />
                  <div className="flex min-h-screen flex-1 flex-col">
                    <Header />
                    <main className="flex-1 p-6">
                      <Outlet />
                    </main>
                  </div>
                </div>
              );
            }
            """
        ),
    }


def render_login_page() -> str:
    return dedent(
        """
        import { useState } from 'react';
        import { useNavigate } from 'react-router-dom';
        import axios from 'axios';
        import { toast } from 'sonner';
        import { authApi } from '@/api/auth';
        import { unwrapApiData } from '@/types/common';
        import { Button } from '@/components/ui/button';
        import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
        import { Input } from '@/components/ui/input';
        import { useAuthStore } from '@/stores/authStore';

        export default function LoginPage() {
          const navigate = useNavigate();
          const setAuth = useAuthStore((state) => state.setAuth);
          const [form, setForm] = useState({ username: 'admin', password: 'admin123456' });
          const [loading, setLoading] = useState(false);

          return (
            <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
              <Card className="w-full max-w-md">
                <CardHeader>
                  <CardTitle>后台登录</CardTitle>
                </CardHeader>
                <CardContent>
                  <form
                    className="grid gap-4"
                    onSubmit={async (event) => {
                      event.preventDefault();
                      setLoading(true);
                      try {
                        const loginResponse = await authApi.login(form);
                        const loginData = unwrapApiData(loginResponse.data);
                        if (!loginData.token) {
                          throw new Error('登录响应缺少 token');
                        }

                        // Persist token first so the next /auth/info request carries auth headers.
                        setAuth(loginData.token, { username: loginData.username, role: loginData.role });

                        try {
                          const infoResponse = await authApi.info();
                          const currentUser = unwrapApiData(infoResponse.data);
                          setAuth(loginData.token, currentUser ?? { username: loginData.username, role: loginData.role });
                        } catch (error) {
                          console.error(error);
                        }

                        toast.success('登录成功');
                        navigate('/dashboard');
                      } catch (error) {
                        console.error(error);
                        const message = axios.isAxiosError(error)
                          ? error.response?.data?.message || error.message
                          : error instanceof Error
                            ? error.message
                            : '登录失败，请检查账号密码';
                        toast.error(message);
                      } finally {
                        setLoading(false);
                      }
                    }}
                  >
                    <div className="grid gap-2">
                      <label className="text-sm font-medium text-slate-700">用户名</label>
                      <Input value={form.username} onChange={(event) => setForm((state) => ({ ...state, username: event.target.value }))} />
                    </div>
                    <div className="grid gap-2">
                      <label className="text-sm font-medium text-slate-700">密码</label>
                      <Input
                        type="password"
                        value={form.password}
                        onChange={(event) => setForm((state) => ({ ...state, password: event.target.value }))}
                      />
                    </div>
                    <Button disabled={loading} type="submit">
                      {loading ? '登录中...' : '登录'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          );
        }
        """
    )


def render_router() -> str:
    imports = [
        "import { Suspense, lazy } from 'react';",
        "import { Navigate, createBrowserRouter } from 'react-router-dom';",
        "import AppLayout from '@/components/layout/AppLayout';",
        "import AuthGuard from '@/components/layout/AuthGuard';",
        "import LoginPage from '@/pages/login/LoginPage';",
        "import StatsOverview from '@/components/dashboard/StatsOverview';",
    ]
    routes = [
        "{ path: '/login', element: <LoginPage /> },",
        dedent(
            """
            {
              path: '/',
              element: (
                <AuthGuard>
                  <AppLayout />
                </AuthGuard>
              ),
              children: [
                { index: true, element: <Navigate replace to="/dashboard" /> },
                { path: 'dashboard', element: <StatsOverview /> },
            """
        ).strip(),
    ]
    for resource in resources:
        page_name = pascal(resource["key"])
        imports.append(f"const {page_name}List = lazy(() => import('@/pages/{resource['key']}/List'));")
        if resource["primary"]["detail"]:
            imports.append(f"const {page_name}Detail = lazy(() => import('@/pages/{resource['key']}/Detail'));")
        children = [
            f"{{ index: true, element: <Suspense fallback={{null}}><{page_name}List /></Suspense> }},"
        ]
        if resource["primary"]["detail"]:
            children.append(f"{{ path: ':id', element: <Suspense fallback={{null}}><{page_name}Detail /></Suspense> }},")
        routes.append(
            dedent(
                f"""
                    {{
                      path: '{resource['key']}',
                      children: [
                        {' '.join(children)}
                      ],
                    }},
                """
            ).strip()
        )
    routes.append("              ],\n            },")
    return "\n".join(imports) + "\n\nexport const router = createBrowserRouter([\n  " + "\n  ".join(routes) + "\n]);\n"


def render_app_files() -> dict[str, str]:
    return {
        "src/App.tsx": dedent(
            """
            import { RouterProvider } from 'react-router-dom';
            import { Toaster } from 'sonner';
            import { router } from '@/router';

            export default function App() {
              return (
                <>
                  <RouterProvider router={router} />
                  <Toaster richColors position="top-right" />
                </>
              );
            }
            """
        ),
        "src/main.tsx": dedent(
            """
            import React from 'react';
            import ReactDOM from 'react-dom/client';
            import App from './App';
            import './index.css';

            ReactDOM.createRoot(document.getElementById('root')!).render(
              <React.StrictMode>
                <App />
              </React.StrictMode>
            );
            """
        ),
        "src/index.css": dedent(
            """
            @tailwind base;
            @tailwind components;
            @tailwind utilities;

            :root {
              color: #0f172a;
              background: #f8fafc;
              font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            }

            body {
              margin: 0;
              min-width: 320px;
              min-height: 100vh;
              background: #f8fafc;
            }

            * {
              box-sizing: border-box;
            }

            a {
              color: inherit;
              text-decoration: none;
            }
            """
        ),
        "src/vite-env.d.ts": dedent(
            """
            /// <reference types="vite/client" />
            """
        ),
    }


def render_root_files() -> dict[str, str]:
    return {
        "package.json": dedent(
            """
            {
              "name": "wp-admin-generated",
              "private": true,
              "version": "0.0.1",
              "type": "module",
              "scripts": {
                "dev": "vite",
                "build": "tsc -b && vite build",
                "preview": "vite preview"
              },
              "dependencies": {
                "@hookform/resolvers": "^5.2.2",
                "@tanstack/react-table": "^8.21.3",
                "axios": "^1.11.0",
                "clsx": "^2.1.1",
                "lucide-react": "^0.542.0",
                "react": "^19.1.1",
                "react-dom": "^19.1.1",
                "react-hook-form": "^7.62.0",
                "react-router-dom": "^7.8.2",
                "sonner": "^2.0.7",
                "zod": "^4.1.5",
                "zustand": "^5.0.8"
              },
              "devDependencies": {
                "@types/react": "^19.1.11",
                "@types/react-dom": "^19.1.7",
                "@types/node": "^24.3.1",
                "@vitejs/plugin-react": "^5.0.2",
                "autoprefixer": "^10.4.21",
                "postcss": "^8.5.6",
                "tailwindcss": "^3.4.17",
                "typescript": "^5.9.2",
                "vite": "^7.1.3"
              }
            }
            """
        ),
        "tsconfig.json": dedent(
            """
            {
              "compilerOptions": {
                "target": "ES2020",
                "useDefineForClassFields": true,
                "lib": ["ES2020", "DOM", "DOM.Iterable"],
                "allowJs": false,
                "skipLibCheck": true,
                "esModuleInterop": true,
                "allowSyntheticDefaultImports": true,
                "strict": true,
                "forceConsistentCasingInFileNames": true,
                "module": "ESNext",
                "moduleResolution": "Bundler",
                "resolveJsonModule": true,
                "isolatedModules": true,
                "noEmit": true,
                "jsx": "react-jsx",
                "baseUrl": ".",
                "paths": {
                  "@/*": ["src/*"]
                }
              },
              "include": ["src"],
              "references": [{ "path": "./tsconfig.node.json" }]
            }
            """
        ),
        "tsconfig.node.json": dedent(
            """
            {
              "compilerOptions": {
                "composite": true,
                "skipLibCheck": true,
                "types": ["node"],
                "module": "ESNext",
                "moduleResolution": "Bundler",
                "allowSyntheticDefaultImports": true
              },
              "include": ["vite.config.ts"]
            }
            """
        ),
        "vite.config.ts": dedent(
            """
            import { defineConfig } from 'vite';
            import react from '@vitejs/plugin-react';
            import { fileURLToPath, URL } from 'node:url';

            export default defineConfig({
              plugins: [react()],
              resolve: {
                alias: {
                  '@': fileURLToPath(new URL('./src', import.meta.url)),
                },
              },
            });
            """
        ),
        "tailwind.config.ts": dedent(
            """
            import type { Config } from 'tailwindcss';

            export default {
              content: ['./index.html', './src/**/*.{ts,tsx}'],
              theme: {
                extend: {},
              },
              plugins: [],
            } satisfies Config;
            """
        ),
        "postcss.config.js": dedent(
            """
            export default {
              plugins: {
                tailwindcss: {},
                autoprefixer: {},
              },
            };
            """
        ),
        "index.html": dedent(
            """
            <!doctype html>
            <html lang="zh-CN">
              <head>
                <meta charset="UTF-8" />
                <meta content="width=device-width, initial-scale=1.0" name="viewport" />
                <title>WP Admin</title>
              </head>
              <body>
                <div id="root"></div>
                <script src="/src/main.tsx" type="module"></script>
              </body>
            </html>
            """
        ),
        ".gitignore": dedent(
            """
            node_modules
            dist
            .DS_Store
            .env.local
            .env.*.local
            """
        ),
    }


def render_page_wrappers(resource: dict) -> dict[str, str]:
    key = resource["key"]
    api_name = resource["api_name"]
    store_name = resource["store_name"]
    page_name = pascal(key)
    files = {
        f"src/pages/{key}/List.tsx": dedent(
            f"""
            import {{ ResourceTablePage }} from '@/components/resource/ResourceTablePage';
            import {{ resourceMetaMap }} from '@/generated/resources';
            import {{ {api_name} }} from '@/api/{key}';
            import {{ {store_name} }} from '@/stores/{key}Store';
            {f"import CreateModal from './CreateModal';" if resource['primary']['save'] else ""}
            {f"import EditModal from './EditModal';" if resource['primary']['save'] else ""}

            const meta = resourceMetaMap[{json.dumps(key)}];

            export default function {page_name}ListPage() {{
              return (
                <ResourceTablePage
                  api={{{api_name}}}
                  meta={{meta}}
                  useStore={{{store_name}}}
                  {f'CreateModal={{CreateModal}}' if resource['primary']['save'] else ''}
                  {f'EditModal={{EditModal}}' if resource['primary']['save'] else ''}
                />
              );
            }}
            """
        )
    }
    if resource["primary"]["save"]:
        save_type_name = f"{pascal(key)}SaveDto"
        files[f"src/pages/{key}/CreateModal.tsx"] = dedent(
            f"""
            import {{ resourceMetaMap }} from '@/generated/resources';
            import {{ ResourceFormDialog }} from '@/components/resource/ResourceFormDialog';
            import {{ {api_name} }} from '@/api/{key}';
            import type {{ {save_type_name} }} from '@/types/{key}';

            const meta = resourceMetaMap[{json.dumps(key)}];

            export default function CreateModal({{
              open,
              onOpenChange,
              onSuccess,
            }}: {{
              open: boolean;
              onOpenChange: (open: boolean) => void;
              onSuccess: () => Promise<void>;
            }}) {{
              const handleSubmit = async (payload: Record<string, unknown>) => {{
                await {api_name}.save(payload as unknown as {save_type_name});
                await onSuccess();
              }};

              return (
                <ResourceFormDialog
                  meta={{meta}}
                  mode="create"
                  onOpenChange={{onOpenChange}}
                  onSubmit={{handleSubmit}}
                  open={{open}}
                />
              );
            }}
            """
        )
        files[f"src/pages/{key}/EditModal.tsx"] = dedent(
            f"""
            import {{ resourceMetaMap }} from '@/generated/resources';
            import {{ ResourceFormDialog }} from '@/components/resource/ResourceFormDialog';
            import {{ {api_name} }} from '@/api/{key}';
            import type {{ {save_type_name} }} from '@/types/{key}';

            const meta = resourceMetaMap[{json.dumps(key)}];

            export default function EditModal({{
              open,
              onOpenChange,
              data,
              onSuccess,
            }}: {{
              open: boolean;
              onOpenChange: (open: boolean) => void;
              data: Record<string, unknown> | null;
              onSuccess: () => Promise<void>;
            }}) {{
              const handleSubmit = async (payload: Record<string, unknown>) => {{
                await {api_name}.save(payload as unknown as {save_type_name});
                await onSuccess();
              }};

              return (
                <ResourceFormDialog
                  initialValues={{data}}
                  meta={{meta}}
                  mode="edit"
                  onOpenChange={{onOpenChange}}
                  onSubmit={{handleSubmit}}
                  open={{open}}
                />
              );
            }}
            """
        )
    if resource["primary"]["detail"]:
        files[f"src/pages/{key}/Detail.tsx"] = dedent(
            f"""
            import {{ ResourceDetailPage }} from '@/components/resource/ResourceDetailPage';
            import {{ resourceMetaMap }} from '@/generated/resources';
            import {{ {api_name} }} from '@/api/{key}';

            const meta = resourceMetaMap[{json.dumps(key)}];

            export default function {page_name}DetailPage() {{
              return <ResourceDetailPage api={{{api_name}}} meta={{meta}} />;
            }}
            """
        )
    return files


all_files: dict[str, str] = {}
all_files.update(render_root_files())
all_files.update(render_app_files())
all_files.update(render_ui_components())
all_files.update(render_resource_components())
all_files.update(render_layout_files())
all_files["src/router/index.tsx"] = render_router()
all_files["src/pages/login/LoginPage.tsx"] = render_login_page()
all_files["src/api/client.ts"] = render_client()
all_files["src/api/auth.ts"] = render_auth_api()
all_files["src/api/dashboard.ts"] = render_dashboard_api()
all_files["src/stores/authStore.ts"] = render_auth_store()
all_files["src/stores/createResourceStore.ts"] = render_create_resource_store()
all_files["src/types/common.ts"] = render_common_types()
all_files["src/types/openapi.ts"] = render_openapi_types()
all_files["src/generated/resources.ts"] = render_resources_meta()

for resource in resources:
    all_files[f"src/types/{resource['key']}.ts"] = render_resource_type(resource)
    all_files[f"src/api/{resource['key']}.ts"] = render_api_file(resource)
    all_files[f"src/stores/{resource['key']}Store.ts"] = render_resource_store(resource)
    all_files.update(render_page_wrappers(resource))

for relative_path, content in all_files.items():
    write_file(relative_path, content)

print(f"Generated {len(all_files)} files from {SPEC_FILE.name}")
