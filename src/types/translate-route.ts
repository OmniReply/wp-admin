import type { AdminTranslateRouteSaveRequest, TranslateRoute } from './openapi';
import type { FieldMeta } from './common';

export type TranslateRouteItem = TranslateRoute;
export type TranslateRouteSaveDto = AdminTranslateRouteSaveRequest;
export interface TranslateRouteListParams {
  pageNum?: number;
  pageSize?: number;
}

export const translateRouteFormFields: FieldMeta[] = [
  {
    "name": "routeCode",
    "label": "线路编码（唯一标识）",
    "kind": "text",
    "required": true,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "routeName",
    "label": "线路名称",
    "kind": "text",
    "required": true,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "routeType",
    "label": "线路类型：ai-AI智能翻译，basic-基础翻译引擎",
    "kind": "text",
    "required": true,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "provider",
    "label": "提供商：openai/aliyun/google/tencent/microsoft等",
    "kind": "text",
    "required": true,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "modelCode",
    "label": "AI模型代码（AI智能翻译时使用，如qwen-mt-flash）",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "apiUrl",
    "label": "API地址",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "apiKeyConfig",
    "label": "API密钥配置Key（指向系统配置）",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "icon",
    "label": "图标URL",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "description",
    "label": "线路描述",
    "kind": "textarea",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "supportedLangs",
    "label": "支持的语言列表（JSON数组）",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "tokensPerChar",
    "label": "每字符消耗tokens数（基础翻译引擎用）",
    "kind": "number",
    "required": false,
    "type": "number",
    "format": "",
    "options": []
  },
  {
    "name": "isAi",
    "label": "是否AI翻译：0-否，1-是",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int32",
    "options": []
  },
  {
    "name": "isDefault",
    "label": "是否默认线路：0-否，1-是",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int32",
    "options": []
  },
  {
    "name": "isEnabled",
    "label": "是否启用：0-禁用，1-启用",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int32",
    "options": []
  },
  {
    "name": "sortOrder",
    "label": "排序序号",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int32",
    "options": []
  }
];

export const translateRouteTableFields: FieldMeta[] = [
  {
    "name": "id",
    "label": "id",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int64",
    "options": []
  },
  {
    "name": "createTime",
    "label": "create Time",
    "kind": "datetime",
    "required": false,
    "type": "string",
    "format": "date-time",
    "options": []
  },
  {
    "name": "updateTime",
    "label": "update Time",
    "kind": "datetime",
    "required": false,
    "type": "string",
    "format": "date-time",
    "options": []
  },
  {
    "name": "aiRoute",
    "label": "ai Route",
    "kind": "switch",
    "required": false,
    "type": "boolean",
    "format": "",
    "options": []
  },
  {
    "name": "apiKeyConfig",
    "label": "api Key Config",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "apiUrl",
    "label": "api Url",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "basicRoute",
    "label": "basic Route",
    "kind": "switch",
    "required": false,
    "type": "boolean",
    "format": "",
    "options": []
  }
];

export const translateRouteDetailFields: FieldMeta[] = [
  {
    "name": "id",
    "label": "id",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int64",
    "options": []
  },
  {
    "name": "createTime",
    "label": "create Time",
    "kind": "datetime",
    "required": false,
    "type": "string",
    "format": "date-time",
    "options": []
  },
  {
    "name": "updateTime",
    "label": "update Time",
    "kind": "datetime",
    "required": false,
    "type": "string",
    "format": "date-time",
    "options": []
  },
  {
    "name": "deleted",
    "label": "deleted",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int32",
    "options": []
  },
  {
    "name": "routeCode",
    "label": "route Code",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "routeName",
    "label": "route Name",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "routeType",
    "label": "route Type",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "provider",
    "label": "provider",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "modelId",
    "label": "model Id",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "modelCode",
    "label": "model Code",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "apiUrl",
    "label": "api Url",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "apiKeyConfig",
    "label": "api Key Config",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "icon",
    "label": "icon",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "description",
    "label": "description",
    "kind": "textarea",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "supportedLangs",
    "label": "supported Langs",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "tokensPerChar",
    "label": "tokens Per Char",
    "kind": "number",
    "required": false,
    "type": "number",
    "format": "",
    "options": []
  }
];
