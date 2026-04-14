import type { TokenAlertRecord } from './openapi';
import type { FieldMeta } from './common';

export type TokenAlertRecordPageItem = TokenAlertRecord;
export interface TokenAlertRecordPageListParams {
  pageNum?: number;
  pageSize?: number;
  alertConfigId?: number;
  teamId?: number;
  userId?: number;
  alertStatus?: string;
  startTime?: string;
  endTime?: string;
}

export const tokenAlertRecordPageFormFields: FieldMeta[] = [];

export const tokenAlertRecordPageTableFields: FieldMeta[] = [
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
    "name": "actualConsumption",
    "label": "actual Consumption",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int64",
    "options": []
  },
  {
    "name": "alertConfigId",
    "label": "alert Config Id",
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
    "name": "alertMessage",
    "label": "alert Message",
    "kind": "textarea",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  }
];

export const tokenAlertRecordPageDetailFields: FieldMeta[] = [
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
    "name": "alertConfigId",
    "label": "alert Config Id",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int64",
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
    "name": "actualConsumption",
    "label": "actual Consumption",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int64",
    "options": []
  },
  {
    "name": "startTime",
    "label": "start Time",
    "kind": "datetime",
    "required": false,
    "type": "string",
    "format": "date-time",
    "options": []
  },
  {
    "name": "endTime",
    "label": "end Time",
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
    "name": "alertStatus",
    "label": "alert Status",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "alertMessage",
    "label": "alert Message",
    "kind": "textarea",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  }
];
