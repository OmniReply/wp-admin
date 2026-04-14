import type { AdminBroadcastMessageResponse } from './openapi';
import type { FieldMeta } from './common';

export type BroadcastMessageItem = AdminBroadcastMessageResponse;
export interface BroadcastMessageListParams {
  pageNum?: number;
  pageSize?: number;
  teamId?: number;
  userId?: number;
  status?: string;
  keyword?: string;
  startTime?: string;
  endTime?: string;
}

export const broadcastMessageFormFields: FieldMeta[] = [];

export const broadcastMessageTableFields: FieldMeta[] = [
  {
    "name": "teamBroadcastCount",
    "label": "该团队下的广播消息总数",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int64",
    "options": []
  },
  {
    "name": "teamId",
    "label": "团队ID",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int64",
    "options": []
  },
  {
    "name": "teamName",
    "label": "团队名称",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  }
];

export const broadcastMessageDetailFields: FieldMeta[] = [
  {
    "name": "teamId",
    "label": "团队ID",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int64",
    "options": []
  },
  {
    "name": "teamName",
    "label": "团队名称",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "teamBroadcastCount",
    "label": "该团队下的广播消息总数",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int64",
    "options": []
  }
];
