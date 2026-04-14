import type { AiChatbotChatLog } from './openapi';
import type { FieldMeta } from './common';

export type ChatbotChatLogPageItem = AiChatbotChatLog;
export interface ChatbotChatLogPageListParams {
  pageNum?: number;
  pageSize?: number;
  userId?: number;
  socialAccountId?: number;
  conversationId?: number;
  platformContactId?: string;
  matchType?: string;
  status?: number;
  startTime?: string;
  endTime?: string;
}

export const chatbotChatLogPageFormFields: FieldMeta[] = [];

export const chatbotChatLogPageTableFields: FieldMeta[] = [
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
    "name": "status",
    "label": "status",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int32",
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
    "name": "aiModel",
    "label": "ai Model",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "botReply",
    "label": "bot Reply",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "conversationId",
    "label": "conversation Id",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int64",
    "options": []
  },
  {
    "name": "errorMessage",
    "label": "error Message",
    "kind": "textarea",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  }
];

export const chatbotChatLogPageDetailFields: FieldMeta[] = [
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
    "name": "userId",
    "label": "user Id",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int64",
    "options": []
  },
  {
    "name": "socialAccountId",
    "label": "social Account Id",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int64",
    "options": []
  },
  {
    "name": "conversationId",
    "label": "conversation Id",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int64",
    "options": []
  },
  {
    "name": "platformContactId",
    "label": "platform Contact Id",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "userMessage",
    "label": "user Message",
    "kind": "textarea",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "botReply",
    "label": "bot Reply",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "aiModel",
    "label": "ai Model",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "inputTokens",
    "label": "input Tokens",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int32",
    "options": []
  },
  {
    "name": "outputTokens",
    "label": "output Tokens",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int32",
    "options": []
  },
  {
    "name": "totalTokens",
    "label": "total Tokens",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int32",
    "options": []
  },
  {
    "name": "responseTime",
    "label": "response Time",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int32",
    "options": []
  },
  {
    "name": "matchType",
    "label": "match Type",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "matchSourceId",
    "label": "match Source Id",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int64",
    "options": []
  },
  {
    "name": "similarityScore",
    "label": "similarity Score",
    "kind": "number",
    "required": false,
    "type": "number",
    "format": "",
    "options": []
  },
  {
    "name": "referenceChunks",
    "label": "reference Chunks",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  }
];
