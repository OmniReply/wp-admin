
import { createResourceStore } from './createResourceStore';
import { tokenAlertConfigApi } from '@/api/token-alert-config';
import type { TokenAlertConfigItem, TokenAlertConfigListParams } from '@/types/token-alert-config';

export const useTokenAlertConfigStore = createResourceStore<TokenAlertConfigItem, TokenAlertConfigListParams>(
  tokenAlertConfigApi,
  {
    pageNum: 1,
    pageSize: 20,
  } as TokenAlertConfigListParams
);
