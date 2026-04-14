
import { createResourceStore } from './createResourceStore';
import { loginFailApi } from '@/api/login-fail';
import type { LoginFailItem, LoginFailListParams } from '@/types/login-fail';

export const useLoginFailStore = createResourceStore<LoginFailItem, LoginFailListParams>(
  loginFailApi,
  {
    pageNum: 1,
    pageSize: 20,
  } as LoginFailListParams
);
