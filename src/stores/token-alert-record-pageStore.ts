
import { createResourceStore } from './createResourceStore';
import { tokenAlertRecordPageApi } from '@/api/token-alert-record-page';
import type { TokenAlertRecordPageItem, TokenAlertRecordPageListParams } from '@/types/token-alert-record-page';

export const useTokenAlertRecordPageStore = createResourceStore<TokenAlertRecordPageItem, TokenAlertRecordPageListParams>(
  tokenAlertRecordPageApi,
  {
    pageNum: 1,
    pageSize: 20,
  } as TokenAlertRecordPageListParams
);
