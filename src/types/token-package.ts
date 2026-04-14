import type { TokenPricePackage, TokenPricePackageSaveRequest } from './openapi';
import type { FieldMeta } from './common';

export type TokenPackageItem = TokenPricePackage;
export type TokenPackageSaveDto = TokenPricePackageSaveRequest;
export interface TokenPackageListParams {
  pageNum?: number;
  pageSize?: number;
}

export const tokenPackageFormFields: FieldMeta[] = [
  {
    "name": "tokensAmount",
    "label": "Token数量",
    "kind": "number",
    "required": true,
    "type": "integer",
    "format": "int64",
    "options": []
  },
  {
    "name": "packageName",
    "label": "套餐名称",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "description",
    "label": "套餐描述",
    "kind": "textarea",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "usdOriginalPrice",
    "label": "USD原价",
    "kind": "number",
    "required": false,
    "type": "number",
    "format": "",
    "options": []
  },
  {
    "name": "usdDiscountRate",
    "label": "USD折扣率",
    "kind": "number",
    "required": false,
    "type": "number",
    "format": "",
    "options": []
  },
  {
    "name": "usdActualPrice",
    "label": "USD实际价格",
    "kind": "number",
    "required": false,
    "type": "number",
    "format": "",
    "options": []
  },
  {
    "name": "cnyOriginalPrice",
    "label": "CNY原价",
    "kind": "number",
    "required": false,
    "type": "number",
    "format": "",
    "options": []
  },
  {
    "name": "cnyDiscountRate",
    "label": "CNY折扣率",
    "kind": "number",
    "required": false,
    "type": "number",
    "format": "",
    "options": []
  },
  {
    "name": "cnyActualPrice",
    "label": "CNY实际价格",
    "kind": "number",
    "required": false,
    "type": "number",
    "format": "",
    "options": []
  },
  {
    "name": "eurOriginalPrice",
    "label": "EUR原价",
    "kind": "number",
    "required": false,
    "type": "number",
    "format": "",
    "options": []
  },
  {
    "name": "eurDiscountRate",
    "label": "EUR折扣率",
    "kind": "number",
    "required": false,
    "type": "number",
    "format": "",
    "options": []
  },
  {
    "name": "eurActualPrice",
    "label": "EUR实际价格",
    "kind": "number",
    "required": false,
    "type": "number",
    "format": "",
    "options": []
  },
  {
    "name": "processingFeeConfig",
    "label": "手续费配置JSON",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "enabled",
    "label": "是否启用：0-禁用，1-启用",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int32",
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
  },
  {
    "name": "promotionTag",
    "label": "促销标签",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "promotionStartTime",
    "label": "促销开始时间",
    "kind": "datetime",
    "required": false,
    "type": "string",
    "format": "date-time",
    "options": []
  },
  {
    "name": "promotionEndTime",
    "label": "促销结束时间",
    "kind": "datetime",
    "required": false,
    "type": "string",
    "format": "date-time",
    "options": []
  },
  {
    "name": "isRecommended",
    "label": "是否推荐：0-否，1-是",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int32",
    "options": []
  }
];

export const tokenPackageTableFields: FieldMeta[] = [
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
    "name": "cnyActualPrice",
    "label": "cny Actual Price",
    "kind": "number",
    "required": false,
    "type": "number",
    "format": "",
    "options": []
  },
  {
    "name": "cnyDiscountRate",
    "label": "cny Discount Rate",
    "kind": "number",
    "required": false,
    "type": "number",
    "format": "",
    "options": []
  },
  {
    "name": "cnyOriginalPrice",
    "label": "cny Original Price",
    "kind": "number",
    "required": false,
    "type": "number",
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

export const tokenPackageDetailFields: FieldMeta[] = [
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
    "name": "tokensAmount",
    "label": "tokens Amount",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int64",
    "options": []
  },
  {
    "name": "packageName",
    "label": "package Name",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "description",
    "label": "description",
    "kind": "textarea",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "usdOriginalPrice",
    "label": "usd Original Price",
    "kind": "number",
    "required": false,
    "type": "number",
    "format": "",
    "options": []
  },
  {
    "name": "usdDiscountRate",
    "label": "usd Discount Rate",
    "kind": "number",
    "required": false,
    "type": "number",
    "format": "",
    "options": []
  },
  {
    "name": "usdActualPrice",
    "label": "usd Actual Price",
    "kind": "number",
    "required": false,
    "type": "number",
    "format": "",
    "options": []
  },
  {
    "name": "cnyOriginalPrice",
    "label": "cny Original Price",
    "kind": "number",
    "required": false,
    "type": "number",
    "format": "",
    "options": []
  },
  {
    "name": "cnyDiscountRate",
    "label": "cny Discount Rate",
    "kind": "number",
    "required": false,
    "type": "number",
    "format": "",
    "options": []
  },
  {
    "name": "cnyActualPrice",
    "label": "cny Actual Price",
    "kind": "number",
    "required": false,
    "type": "number",
    "format": "",
    "options": []
  },
  {
    "name": "eurOriginalPrice",
    "label": "eur Original Price",
    "kind": "number",
    "required": false,
    "type": "number",
    "format": "",
    "options": []
  },
  {
    "name": "eurDiscountRate",
    "label": "eur Discount Rate",
    "kind": "number",
    "required": false,
    "type": "number",
    "format": "",
    "options": []
  },
  {
    "name": "eurActualPrice",
    "label": "eur Actual Price",
    "kind": "number",
    "required": false,
    "type": "number",
    "format": "",
    "options": []
  }
];
