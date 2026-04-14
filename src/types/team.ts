import type { AdminTeamResponse } from './openapi';
import type { FieldMeta } from './common';

export type TeamItem = AdminTeamResponse;
export interface TeamListParams {
  pageNum?: number;
  pageSize?: number;
  keyword?: string;
  status?: number;
}

export const teamFormFields: FieldMeta[] = [];

export const teamTableFields: FieldMeta[] = [
  {
    "name": "id",
    "label": "团队ID",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int64",
    "options": []
  },
  {
    "name": "name",
    "label": "团队名称",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "status",
    "label": "团队状态：0-禁用，1-正常",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int32",
    "options": []
  },
  {
    "name": "createTime",
    "label": "创建时间",
    "kind": "datetime",
    "required": false,
    "type": "string",
    "format": "date-time",
    "options": []
  },
  {
    "name": "currentMembers",
    "label": "当前成员数",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int32",
    "options": []
  },
  {
    "name": "description",
    "label": "团队描述",
    "kind": "textarea",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "logo",
    "label": "团队Logo URL",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  }
];

export const teamDetailFields: FieldMeta[] = [
  {
    "name": "id",
    "label": "团队ID",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int64",
    "options": []
  },
  {
    "name": "name",
    "label": "团队名称",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "description",
    "label": "团队描述",
    "kind": "textarea",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "logo",
    "label": "团队Logo URL",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "ownerId",
    "label": "团队所有者用户ID",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int64",
    "options": []
  },
  {
    "name": "ownerEmail",
    "label": "团队所有者邮箱",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "status",
    "label": "团队状态：0-禁用，1-正常",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int32",
    "options": []
  },
  {
    "name": "maxMembers",
    "label": "最大成员数",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int32",
    "options": []
  },
  {
    "name": "currentMembers",
    "label": "当前成员数",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int32",
    "options": []
  },
  {
    "name": "createTime",
    "label": "创建时间",
    "kind": "datetime",
    "required": false,
    "type": "string",
    "format": "date-time",
    "options": []
  },
  {
    "name": "tokenBalance",
    "label": "Token余额（剩余可用）",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int64",
    "options": []
  },
  {
    "name": "usedTokens",
    "label": "已使用Token总量",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int64",
    "options": []
  },
  {
    "name": "totalTokens",
    "label": "总获得Token数量",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int64",
    "options": []
  }
];
