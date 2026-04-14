import type { AdminUserResponse } from './openapi';
import type { FieldMeta } from './common';

export type UserItem = AdminUserResponse;
export interface UserListParams {
  pageNum?: number;
  pageSize?: number;
  keyword?: string;
  status?: number;
  membershipLevel?: number;
  registerSource?: string;
}

export const userFormFields: FieldMeta[] = [];

export const userTableFields: FieldMeta[] = [
  {
    "name": "id",
    "label": "用户ID",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int64",
    "options": []
  },
  {
    "name": "email",
    "label": "邮箱",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "status",
    "label": "用户状态：0-禁用，1-正常",
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
    "name": "avatar",
    "label": "头像URL",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "currentTeamId",
    "label": "当前所属团队ID",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int64",
    "options": []
  },
  {
    "name": "emailVerified",
    "label": "邮箱是否验证：0-未验证，1-已验证",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int32",
    "options": []
  }
];

export const userDetailFields: FieldMeta[] = [
  {
    "name": "id",
    "label": "用户ID",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int64",
    "options": []
  },
  {
    "name": "email",
    "label": "邮箱",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "nickname",
    "label": "昵称",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "avatar",
    "label": "头像URL",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "phone",
    "label": "手机号",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "status",
    "label": "用户状态：0-禁用，1-正常",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int32",
    "options": []
  },
  {
    "name": "emailVerified",
    "label": "邮箱是否验证：0-未验证，1-已验证",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int32",
    "options": []
  },
  {
    "name": "googleAuthBound",
    "label": "是否绑定谷歌验证",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int32",
    "options": []
  },
  {
    "name": "currentTeamId",
    "label": "当前所属团队ID",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int64",
    "options": []
  },
  {
    "name": "membershipLevel",
    "label": "当前会员等级",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int32",
    "options": []
  },
  {
    "name": "lastLoginTime",
    "label": "最后登录时间",
    "kind": "datetime",
    "required": false,
    "type": "string",
    "format": "date-time",
    "options": []
  },
  {
    "name": "lastLoginIp",
    "label": "最后登录IP",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "registerSource",
    "label": "注册来源",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "remark",
    "label": "备注",
    "kind": "textarea",
    "required": false,
    "type": "string",
    "format": "",
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
  }
];
