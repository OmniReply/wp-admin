import { client, buildPath } from './client';
import type { ApiResponse, ListResponse, PageResponse } from '@/types/common';
import type { TokenRechargeOrder } from '@/types/openapi';
import type { TokenRechargeOrderItem, TokenRechargeOrderListParams } from '@/types/token-recharge-order';

export const tokenRechargeOrderApi = {
  processOrderSuccess: (orderNo: string | number) =>
    client.post<ApiResponse<unknown>>(buildPath("/token/recharge-order/no/{orderNo}/process-success", { orderNo })),
  detail: (id: string | number) =>
    client.get<ApiResponse<TokenRechargeOrder>>(buildPath("/token/recharge-order/{id}", { id })),
  list: (params?: TokenRechargeOrderListParams) =>
    client.get<PageResponse<TokenRechargeOrder>>("/token/recharge-order/page", { params }),
  getByOrderNo: (orderNo: string | number) =>
    client.get<ApiResponse<TokenRechargeOrder>>(buildPath("/token/recharge-order/no/{orderNo}", { orderNo })),
};
