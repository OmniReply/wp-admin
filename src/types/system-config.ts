import type { SystemConfig, SystemConfigSaveRequest } from './openapi';
import type { FieldMeta } from './common';

export type SystemConfigItem = SystemConfig;
export type SystemConfigSaveDto = SystemConfigSaveRequest;
export interface SystemConfigListParams {
  pageNum?: number;
  pageSize?: number;
}

export const systemConfigFormFields: FieldMeta[] = [
  {
    "name": "configKey",
    "label": "配置键",
    "kind": "text",
    "required": true,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "configValue",
    "label": "配置值",
    "kind": "text",
    "required": true,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "configName",
    "label": "配置名称",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "configDesc",
    "label": "配置描述",
    "kind": "textarea",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "configType",
    "label": "配置值类型：STRING, INTEGER, LONG, DOUBLE, BOOLEAN, JSON",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "configGroup",
    "label": "配置分组",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "sortOrder",
    "label": "排序序号",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int32",
    "options": []
  }
];

export const systemConfigTableFields: FieldMeta[] = [
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
    "name": "configDesc",
    "label": "config Desc",
    "kind": "textarea",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "configGroup",
    "label": "config Group",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "configKey",
    "label": "config Key",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "configName",
    "label": "config Name",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  }
];

export const systemConfigDetailFields: FieldMeta[] = [
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
    "name": "configKey",
    "label": "config Key",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "configValue",
    "label": "config Value",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "configName",
    "label": "config Name",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "configDesc",
    "label": "config Desc",
    "kind": "textarea",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "configType",
    "label": "config Type",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "configGroup",
    "label": "config Group",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "sortOrder",
    "label": "sort Order",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int32",
    "options": []
  },
  {
    "name": "isSystem",
    "label": "is System",
    "kind": "switch",
    "required": false,
    "type": "boolean",
    "format": "",
    "options": []
  },
  {
    "name": "isEncrypted",
    "label": "is Encrypted",
    "kind": "switch",
    "required": false,
    "type": "boolean",
    "format": "",
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
  }
];
