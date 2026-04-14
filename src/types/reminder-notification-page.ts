import type { AdminReminderNotificationResponse } from './openapi';
import type { FieldMeta } from './common';

export type ReminderNotificationPageItem = AdminReminderNotificationResponse;
export interface ReminderNotificationPageListParams {
  pageNum?: number;
  pageSize?: number;
  teamId?: number;
  userId?: number;
  status?: string;
  isRead?: number;
  keyword?: string;
  startTime?: string;
  endTime?: string;
}

export const reminderNotificationPageFormFields: FieldMeta[] = [];

export const reminderNotificationPageTableFields: FieldMeta[] = [
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
    "name": "teamNotificationCount",
    "label": "该团队下的通知总数",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int64",
    "options": []
  }
];

export const reminderNotificationPageDetailFields: FieldMeta[] = [
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
    "name": "teamNotificationCount",
    "label": "该团队下的通知总数",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int64",
    "options": []
  }
];
