import type { MembershipOrder } from './openapi';
import type { FieldMeta } from './common';

export type MembershipOrderItem = MembershipOrder;
export interface MembershipOrderListParams {
  pageNum?: number;
  pageSize?: number;
  orderNo?: string;
  teamId?: number;
  userId?: number;
  status?: number;
  paymentStatus?: string;
  paymentMethod?: string;
}

export const membershipOrderFormFields: FieldMeta[] = [];

export const membershipOrderTableFields: FieldMeta[] = [
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

export const membershipOrderDetailFields: FieldMeta[] = [
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
    "name": "planId",
    "label": "plan Id",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int64",
    "options": []
  },
  {
    "name": "planLevel",
    "label": "plan Level",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int32",
    "options": []
  },
  {
    "name": "planName",
    "label": "plan Name",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "subscriptionType",
    "label": "subscription Type",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
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
    "name": "tokensAmount",
    "label": "tokens Amount",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int64",
    "options": []
  }
];
