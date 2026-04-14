import { client, buildPath } from './client';
import type { ApiResponse, ListResponse, PageResponse } from '@/types/common';
import type { MembershipOrder } from '@/types/openapi';
import type { MembershipOrderItem, MembershipOrderListParams } from '@/types/membership-order';

export const membershipOrderApi = {
  processOrderSuccess1: (orderNo: string | number) =>
    client.post<ApiResponse<unknown>>(buildPath("/membership/order/no/{orderNo}/process-success", { orderNo })),
  detail: (id: string | number) =>
    client.get<ApiResponse<MembershipOrder>>(buildPath("/membership/order/{id}", { id })),
  list: (params?: MembershipOrderListParams) =>
    client.get<PageResponse<MembershipOrder>>("/membership/order/page", { params }),
  getByOrderNo1: (orderNo: string | number) =>
    client.get<ApiResponse<MembershipOrder>>(buildPath("/membership/order/no/{orderNo}", { orderNo })),
};
