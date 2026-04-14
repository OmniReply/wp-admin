import type { AdminDatasourceReVectorizeRequest, AdminUserDatasourceResponse } from './openapi';
import type { FieldMeta } from './common';

export type DatasourceItem = AdminUserDatasourceResponse;
export type DatasourceSaveDto = AdminDatasourceReVectorizeRequest;
export interface DatasourceListParams {
  pageNum?: number;
  pageSize?: number;
  userId?: number;
  teamId?: number;
  keyword?: string;
  sourceType?: string;
  vectorStatus?: number;
  kbProviderType?: string;
}

export const datasourceFormFields: FieldMeta[] = [
  {
    "name": "items",
    "label": "数据源条目列表",
    "kind": "text",
    "required": true,
    "type": "array",
    "format": "",
    "options": []
  },
  {
    "name": "targetKbProviderType",
    "label": "目标知识库提供商类型：local/dify/aliyun/volcano/xai",
    "kind": "text",
    "required": true,
    "type": "string",
    "format": "",
    "options": []
  }
];

export const datasourceTableFields: FieldMeta[] = [
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
    "name": "nickname",
    "label": "用户昵称",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "registerTime",
    "label": "注册时间",
    "kind": "datetime",
    "required": false,
    "type": "string",
    "format": "date-time",
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
  },
  {
    "name": "tokenBalance",
    "label": "Token余额",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int64",
    "options": []
  },
  {
    "name": "usedTokens",
    "label": "已使用Token",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int64",
    "options": []
  }
];

export const datasourceDetailFields: FieldMeta[] = [
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
    "name": "teamId",
    "label": "团队ID",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int64",
    "options": []
  },
  {
    "name": "userEmail",
    "label": "用户账号（邮箱）",
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
    "name": "nickname",
    "label": "用户昵称",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "registerTime",
    "label": "注册时间",
    "kind": "datetime",
    "required": false,
    "type": "string",
    "format": "date-time",
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
    "name": "tokenBalance",
    "label": "Token余额",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int64",
    "options": []
  },
  {
    "name": "usedTokens",
    "label": "已使用Token",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int64",
    "options": []
  }
];
