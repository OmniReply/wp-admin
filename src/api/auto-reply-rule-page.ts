import { client, buildPath } from './client';
import type { ApiResponse, ListResponse, PageResponse } from '@/types/common';
import type { AdminAutoReplyRuleResponse } from '@/types/openapi';
import type { AutoReplyRulePageItem, AutoReplyRulePageListParams } from '@/types/auto-reply-rule-page';

export const autoReplyRulePageApi = {
  list: (params?: AutoReplyRulePageListParams) =>
    client.get<PageResponse<AdminAutoReplyRuleResponse>>("/auto-reply-rule/page", { params }),
};
