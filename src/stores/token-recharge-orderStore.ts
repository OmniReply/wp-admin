
import { createResourceStore } from './createResourceStore';
import { tokenRechargeOrderApi } from '@/api/token-recharge-order';
import type { TokenRechargeOrderItem, TokenRechargeOrderListParams } from '@/types/token-recharge-order';

export const useTokenRechargeOrderStore = createResourceStore<TokenRechargeOrderItem, TokenRechargeOrderListParams>(
  tokenRechargeOrderApi,
  {
    pageNum: 1,
    pageSize: 20,
  } as TokenRechargeOrderListParams
);
