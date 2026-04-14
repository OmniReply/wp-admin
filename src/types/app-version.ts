import type { AppVersion, AppVersionSaveRequest } from './openapi';
import type { FieldMeta } from './common';

export type AppVersionItem = AppVersion;
export type AppVersionSaveDto = AppVersionSaveRequest;
export interface AppVersionListParams {
  appType?: string;
  status?: number;
  pageNum?: number;
  pageSize?: number;
}

export const appVersionFormFields: FieldMeta[] = [
  {
    "name": "appType",
    "label": "应用类型：web, android, ios, desktop, chrome",
    "kind": "text",
    "required": true,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "versionCode",
    "label": "版本号",
    "kind": "text",
    "required": true,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "versionNumber",
    "label": "版本数字（用于比较）",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int32",
    "options": []
  },
  {
    "name": "title",
    "label": "版本标题",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "announcement",
    "label": "更新公告内容",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "content",
    "label": "更新内容描述（Markdown格式）",
    "kind": "textarea",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "guideUrl",
    "label": "升级指南链接",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "downloadUrl",
    "label": "下载链接",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "packageSize",
    "label": "安装包大小（字节）",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int64",
    "options": []
  },
  {
    "name": "packageMd5",
    "label": "安装包MD5校验值",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "forceUpdate",
    "label": "是否强制更新：0-否，1-是",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int32",
    "options": []
  },
  {
    "name": "minSupportVersion",
    "label": "最低支持版本号",
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

export const appVersionTableFields: FieldMeta[] = [
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
    "name": "title",
    "label": "title",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
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
    "name": "updateTime",
    "label": "update Time",
    "kind": "datetime",
    "required": false,
    "type": "string",
    "format": "date-time",
    "options": []
  },
  {
    "name": "announcement",
    "label": "announcement",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "appType",
    "label": "app Type",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  }
];

export const appVersionDetailFields: FieldMeta[] = [
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
    "name": "appType",
    "label": "app Type",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "versionCode",
    "label": "version Code",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "versionNumber",
    "label": "version Number",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int32",
    "options": []
  },
  {
    "name": "title",
    "label": "title",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "announcement",
    "label": "announcement",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "content",
    "label": "content",
    "kind": "textarea",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "guideUrl",
    "label": "guide Url",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "downloadUrl",
    "label": "download Url",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "packageSize",
    "label": "package Size",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int64",
    "options": []
  },
  {
    "name": "packageMd5",
    "label": "package Md5",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "forceUpdate",
    "label": "force Update",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int32",
    "options": []
  },
  {
    "name": "minSupportVersion",
    "label": "min Support Version",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  }
];
