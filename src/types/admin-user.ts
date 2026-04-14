import type { AdminUserCreateRequest, AdminUserInfoResponse } from './openapi';
import type { FieldMeta } from './common';

export type AdminUserItem = AdminUserInfoResponse;
export type AdminUserSaveDto = AdminUserCreateRequest;
export interface AdminUserListParams {
  pageNum?: number;
  pageSize?: number;
  keyword?: string;
  status?: number;
}

export const adminUserFormFields: FieldMeta[] = [
  {
    "name": "username",
    "label": "用户名",
    "kind": "text",
    "required": true,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "password",
    "label": "登录密码（明文，将在服务端 BCrypt 加密）",
    "kind": "text",
    "required": true,
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
    "name": "remark",
    "label": "备注",
    "kind": "textarea",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  }
];

export const adminUserTableFields: FieldMeta[] = [
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
    "name": "username",
    "label": "用户名",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "status",
    "label": "状态：0-启用，1-禁用",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int32",
    "options": []
  },
  {
    "name": "role",
    "label": "角色：SUPER_ADMIN-超级管理员，ADMIN-普通管理员",
    "kind": "text",
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
  },
  {
    "name": "lastLoginIp",
    "label": "最近登录IP",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "lastLoginTime",
    "label": "最近登录时间",
    "kind": "datetime",
    "required": false,
    "type": "string",
    "format": "date-time",
    "options": []
  }
];

export const adminUserDetailFields: FieldMeta[] = [
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
    "name": "username",
    "label": "用户名",
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
    "name": "role",
    "label": "角色：SUPER_ADMIN-超级管理员，ADMIN-普通管理员",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "status",
    "label": "状态：0-启用，1-禁用",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int32",
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
    "name": "lastLoginTime",
    "label": "最近登录时间",
    "kind": "datetime",
    "required": false,
    "type": "string",
    "format": "date-time",
    "options": []
  },
  {
    "name": "lastLoginIp",
    "label": "最近登录IP",
    "kind": "text",
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
