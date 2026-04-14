import type { AdminShortcutReplyResponse } from './openapi';
import type { FieldMeta } from './common';

export type ShortcutReplyPageItem = AdminShortcutReplyResponse;
export interface ShortcutReplyPageListParams {
  pageNum?: number;
  pageSize?: number;
  teamId?: number;
  userId?: number;
  replyScope?: string;
  keyword?: string;
  startTime?: string;
  endTime?: string;
}

export const shortcutReplyPageFormFields: FieldMeta[] = [];

export const shortcutReplyPageTableFields: FieldMeta[] = [
  {
    "name": "teamId",
    "label": "团队ID，个人版时为null",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int64",
    "options": []
  },
  {
    "name": "teamName",
    "label": "团队名称，个人版时为'个人版'",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "teamReplyCount",
    "label": "该团队/用户下的快捷回复总数",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int64",
    "options": []
  }
];

export const shortcutReplyPageDetailFields: FieldMeta[] = [
  {
    "name": "teamId",
    "label": "团队ID，个人版时为null",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int64",
    "options": []
  },
  {
    "name": "teamName",
    "label": "团队名称，个人版时为'个人版'",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "teamReplyCount",
    "label": "该团队/用户下的快捷回复总数",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int64",
    "options": []
  }
];
