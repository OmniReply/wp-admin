import type { AdminChatbotPreviewChatResponse } from './openapi';
import type { FieldMeta } from './common';

export type ChatbotPreviewChatPageItem = AdminChatbotPreviewChatResponse;
export interface ChatbotPreviewChatPageListParams {
  pageNum?: number;
  pageSize?: number;
  userId?: number;
  sessionId?: string;
}

export const chatbotPreviewChatPageFormFields: FieldMeta[] = [];

export const chatbotPreviewChatPageTableFields: FieldMeta[] = [
  {
    "name": "sessionId",
    "label": "会话ID",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "sessionLastTime",
    "label": "会话最后消息时间",
    "kind": "datetime",
    "required": false,
    "type": "string",
    "format": "date-time",
    "options": []
  },
  {
    "name": "sessionStartTime",
    "label": "会话开始时间",
    "kind": "datetime",
    "required": false,
    "type": "string",
    "format": "date-time",
    "options": []
  },
  {
    "name": "totalTokensConsumed",
    "label": "本会话消耗Tokens总量",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int32",
    "options": []
  },
  {
    "name": "userId",
    "label": "用户ID",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int64",
    "options": []
  }
];

export const chatbotPreviewChatPageDetailFields: FieldMeta[] = [
  {
    "name": "sessionId",
    "label": "会话ID",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "userId",
    "label": "用户ID",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int64",
    "options": []
  },
  {
    "name": "sessionStartTime",
    "label": "会话开始时间",
    "kind": "datetime",
    "required": false,
    "type": "string",
    "format": "date-time",
    "options": []
  },
  {
    "name": "sessionLastTime",
    "label": "会话最后消息时间",
    "kind": "datetime",
    "required": false,
    "type": "string",
    "format": "date-time",
    "options": []
  },
  {
    "name": "totalTokensConsumed",
    "label": "本会话消耗Tokens总量",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int32",
    "options": []
  }
];
