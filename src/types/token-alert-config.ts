import type { AdminTokenAlertConfigSaveRequest, TokenAlertConfig } from './openapi';
import type { FieldMeta } from './common';

export type TokenAlertConfigItem = TokenAlertConfig;
export type TokenAlertConfigSaveDto = AdminTokenAlertConfigSaveRequest;
export interface TokenAlertConfigListParams {
  pageNum?: number;
  pageSize?: number;
  teamId?: number;
  userId?: number;
  isEnabled?: number;
}

export const tokenAlertConfigFormFields: FieldMeta[] = [
  {
    "name": "teamId",
    "label": "团队ID（0表示全局配置）",
    "kind": "number",
    "required": true,
    "type": "integer",
    "format": "int64",
    "options": []
  },
  {
    "name": "userId",
    "label": "用户ID（null表示团队级别监测）",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int64",
    "options": []
  },
  {
    "name": "alertName",
    "label": "监测规则名称",
    "kind": "text",
    "required": true,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "timeWindowType",
    "label": "时间窗口类型：hour-小时，day-天",
    "kind": "text",
    "required": true,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "timeWindowValue",
    "label": "时间窗口值（如1、24、7等）",
    "kind": "number",
    "required": true,
    "type": "integer",
    "format": "int32",
    "options": []
  },
  {
    "name": "threshold",
    "label": "Token阈值",
    "kind": "number",
    "required": true,
    "type": "integer",
    "format": "int64",
    "options": []
  },
  {
    "name": "alertEmail",
    "label": "告警邮箱（null则使用平台邮箱）",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "isEnabled",
    "label": "是否启用：0-禁用，1-启用",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int32",
    "options": []
  },
  {
    "name": "alertIntervalMinutes",
    "label": "告警间隔（分钟），防止频繁发送",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int32",
    "options": []
  }
];

export const tokenAlertConfigTableFields: FieldMeta[] = [
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
    "name": "alertEmail",
    "label": "alert Email",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "alertIntervalMinutes",
    "label": "alert Interval Minutes",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int32",
    "options": []
  },
  {
    "name": "alertName",
    "label": "alert Name",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
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

export const tokenAlertConfigDetailFields: FieldMeta[] = [
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
    "name": "teamId",
    "label": "team Id",
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
    "name": "alertName",
    "label": "alert Name",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "timeWindowType",
    "label": "time Window Type",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "timeWindowValue",
    "label": "time Window Value",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int32",
    "options": []
  },
  {
    "name": "threshold",
    "label": "threshold",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int64",
    "options": []
  },
  {
    "name": "alertEmail",
    "label": "alert Email",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "isEnabled",
    "label": "is Enabled",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int32",
    "options": []
  },
  {
    "name": "lastAlertTime",
    "label": "last Alert Time",
    "kind": "datetime",
    "required": false,
    "type": "string",
    "format": "date-time",
    "options": []
  },
  {
    "name": "alertIntervalMinutes",
    "label": "alert Interval Minutes",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int32",
    "options": []
  }
];
