
import { createResourceStore } from './createResourceStore';
import { loginLogPageApi } from '@/api/login-log-page';
import type { LoginLogPageItem, LoginLogPageListParams } from '@/types/login-log-page';

export const useLoginLogPageStore = createResourceStore<LoginLogPageItem, LoginLogPageListParams>(
  loginLogPageApi,
  {
    pageNum: 1,
    pageSize: 20,
  } as LoginLogPageListParams
);
