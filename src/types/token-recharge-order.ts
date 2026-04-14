import type { TokenRechargeOrder } from './openapi';
import type { FieldMeta } from './common';

export type TokenRechargeOrderItem = TokenRechargeOrder;
export interface TokenRechargeOrderListParams {
  pageNum?: number;
  pageSize?: number;
  orderNo?: string;
  teamId?: number;
  userId?: number;
  status?: number;
  paymentStatus?: string;
  paymentMethod?: string;
}

export const tokenRechargeOrderFormFields: FieldMeta[] = [];

export const tokenRechargeOrderTableFields: FieldMeta[] = [
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
    "name": "actualPrice",
    "label": "actual Price",
    "kind": "number",
    "required": false,
    "type": "number",
    "format": "",
    "options": []
  },
  {
    "name": "currency",
    "label": "currency",
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

export const tokenRechargeOrderDetailFields: FieldMeta[] = [
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
    "name": "orderNo",
    "label": "order No",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
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
    "name": "tokensAmount",
    "label": "tokens Amount",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int64",
    "options": []
  },
  {
    "name": "originalPrice",
    "label": "original Price",
    "kind": "number",
    "required": false,
    "type": "number",
    "format": "",
    "options": []
  },
  {
    "name": "discountRate",
    "label": "discount Rate",
    "kind": "number",
    "required": false,
    "type": "number",
    "format": "",
    "options": []
  },
  {
    "name": "actualPrice",
    "label": "actual Price",
    "kind": "number",
    "required": false,
    "type": "number",
    "format": "",
    "options": []
  },
  {
    "name": "currency",
    "label": "currency",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "paymentMethod",
    "label": "payment Method",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "paymentOrderId",
    "label": "payment Order Id",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "paymentUrl",
    "label": "payment Url",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "paymentStatus",
    "label": "payment Status",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  }
];
