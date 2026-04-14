import type { AdminAutoReplyRuleResponse } from './openapi';
import type { FieldMeta } from './common';

export type AutoReplyRulePageItem = AdminAutoReplyRuleResponse;
export interface AutoReplyRulePageListParams {
  pageNum?: number;
  pageSize?: number;
  teamId?: number;
  userId?: number;
  ruleScope?: string;
  ruleType?: string;
  defaultEnabled?: number;
  keyword?: string;
  startTime?: string;
  endTime?: string;
}

export const autoReplyRulePageFormFields: FieldMeta[] = [];

export const autoReplyRulePageTableFields: FieldMeta[] = [
  {
    "name": "teamId",
    "label": "团队ID，个人版时为null",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int64",
    "options": []
  },
  {
    "name": "teamName",
    "label": "团队名称，个人版时为'个人版'",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "teamRuleCount",
    "label": "该团队/用户下的规则总数",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int64",
    "options": []
  }
];

export const autoReplyRulePageDetailFields: FieldMeta[] = [
  {
    "name": "teamId",
    "label": "团队ID，个人版时为null",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int64",
    "options": []
  },
  {
    "name": "teamName",
    "label": "团队名称，个人版时为'个人版'",
    "kind": "text",
    "required": false,
    "type": "string",
    "format": "",
    "options": []
  },
  {
    "name": "teamRuleCount",
    "label": "该团队/用户下的规则总数",
    "kind": "number",
    "required": false,
    "type": "integer",
    "format": "int64",
    "options": []
  }
];
