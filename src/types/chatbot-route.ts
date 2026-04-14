import type { AdminAiChatbotRouteSaveRequest, AiChatbotRoute } from './openapi';
import type { FieldMeta } from './common';

export type ChatbotRouteItem = AiChatbotRoute;
export type ChatbotRouteSaveDto = AdminAiChatbotRouteSaveRequest;
export interface ChatbotRouteListParams {
  pageNum?: number;
  pageSize?: number;
}

export const chatbotRouteFormFields: FieldMeta[] = [
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
    "name": "provider",
    "label": "提供商：openai/aliyun/deepseek/kimi等",
    "kind": "text",
    "required": true,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "modelCode",
    "label": "AI模型代码（如qwen3-max, gpt-4等）",
    "kind": "text",
    "required": true,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "apiUrl",
    "label": "API地址（可选，不填使用默认）",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "apiKey",
    "label": "API密钥（可选，不填使用环境变量配置）",
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
    "name": "maxTokens",
    "label": "最大Token数",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int32",
    "options": []
  },
  {
    "name": "temperature",
    "label": "温度参数",
    "kind": "number",
    "required": false,
    "type": "number",
    "format": "",
    "options": []
  },
  {
    "name": "tokensRate",
    "label": "Token消耗倍率",
    "kind": "number",
    "required": false,
    "type": "number",
    "format": "",
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
  },
  {
    "name": "rerankerMode",
    "label": "重排序模式（本地RAG用）：cohere/jina/bge/none",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  }
];

export const chatbotRouteTableFields: FieldMeta[] = [
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
    "name": "apiKey",
    "label": "api Key",
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
    "name": "defaultRoute",
    "label": "default Route",
    "kind": "switch",
    "required": false,
    "type": "boolean",
    "format": "",
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
  }
];

export const chatbotRouteDetailFields: FieldMeta[] = [
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
    "name": "provider",
    "label": "provider",
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
    "name": "apiKey",
    "label": "api Key",
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
    "name": "maxTokens",
    "label": "max Tokens",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int32",
    "options": []
  },
  {
    "name": "temperature",
    "label": "temperature",
    "kind": "number",
    "required": false,
    "type": "number",
    "format": "",
    "options": []
  },
  {
    "name": "tokensRate",
    "label": "tokens Rate",
    "kind": "number",
    "required": false,
    "type": "number",
    "format": "",
    "options": []
  },
  {
    "name": "isDefault",
    "label": "is Default",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int32",
    "options": []
  }
];
