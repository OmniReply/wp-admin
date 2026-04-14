import { client, buildPath } from './client';
import type { ApiResponse, ListResponse, PageResponse } from '@/types/common';
import type { AdminTeamResponse, AdminTeamUserResponse, AdminTokensRecordResponse } from '@/types/openapi';
import type { TeamItem, TeamListParams } from '@/types/team';

export const teamApi = {
  updateStatus1: (id: string | number, params: { status: number }) =>
    client.put<ApiResponse<unknown>>(buildPath("/team/{id}/status", { id }), undefined, { params }),
  detail: (id: string | number) =>
    client.get<ApiResponse<AdminTeamResponse>>(buildPath("/team/{id}", { id })),
  getTeamUsers: (id: string | number, params: { pageNum?: number; pageSize?: number; keyword?: string }) =>
    client.get<PageResponse<AdminTeamUserResponse>>(buildPath("/team/{id}/users", { id }), { params }),
  getTokensRecords: (id: string | number, params: { pageNum?: number; pageSize?: number; userId?: number; type?: string; scene?: string; model?: string; startTime?: string; endTime?: string }) =>
    client.get<PageResponse<AdminTokensRecordResponse>>(buildPath("/team/{id}/tokens/records", { id }), { params }),
  list: (params?: TeamListParams) =>
    client.get<PageResponse<AdminTeamResponse>>("/team/page", { params }),
};
