
import { createResourceStore } from './createResourceStore';
import { autoReplyRulePageApi } from '@/api/auto-reply-rule-page';
import type { AutoReplyRulePageItem, AutoReplyRulePageListParams } from '@/types/auto-reply-rule-page';

export const useAutoReplyRulePageStore = createResourceStore<AutoReplyRulePageItem, AutoReplyRulePageListParams>(
  autoReplyRulePageApi,
  {
    pageNum: 1,
    pageSize: 20,
  } as AutoReplyRulePageListParams
);
