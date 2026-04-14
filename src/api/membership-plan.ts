import { client, buildPath } from './client';
import type { ApiResponse, ListResponse, PageResponse } from '@/types/common';
import type { MembershipPlan } from '@/types/openapi';
import type { MembershipPlanItem, MembershipPlanListParams, MembershipPlanSaveDto } from '@/types/membership-plan';

export const membershipPlanApi = {
  toggleEnabled3: (id: string | number, params: { enabled: number }) =>
    client.put<ApiResponse<unknown>>(buildPath("/membership/plan/{id}/toggle", { id }), undefined, { params }),
  save: (data: MembershipPlanSaveDto) =>
    client.post<ApiResponse<MembershipPlan>>("/membership/plan/save", data),
  detail: (id: string | number) =>
    client.get<ApiResponse<MembershipPlan>>(buildPath("/membership/plan/{id}", { id })),
  remove: (id: string | number) =>
    client.delete<ApiResponse<unknown>>(buildPath("/membership/plan/{id}", { id })),
  list: (params?: MembershipPlanListParams) =>
    client.get<ListResponse<MembershipPlan>>("/membership/plan/list", { params }),
};
