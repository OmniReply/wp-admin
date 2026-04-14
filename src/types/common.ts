
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
