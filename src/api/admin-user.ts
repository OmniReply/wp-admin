import { client, buildPath } from './client';
import type { ApiResponse, ListResponse, PageResponse } from '@/types/common';
import type { AdminUserInfoResponse } from '@/types/openapi';
import type { AdminUserItem, AdminUserListParams, AdminUserSaveDto } from '@/types/admin-user';

export const adminUserApi = {
  update: (data: Record<string, unknown>) =>
    client.put<ApiResponse<AdminUserInfoResponse>>("/admin-user", data),
  save: (data: AdminUserSaveDto) =>
    client.post<ApiResponse<AdminUserInfoResponse>>("/admin-user", data),
  changePassword: (data: Record<string, unknown>) =>
    client.put<ApiResponse<unknown>>("/admin-user/change-password", data),
  detail: (id: string | number) =>
    client.get<ApiResponse<AdminUserInfoResponse>>(buildPath("/admin-user/{id}", { id })),
  remove: (id: string | number) =>
    client.delete<ApiResponse<unknown>>(buildPath("/admin-user/{id}", { id })),
  list: (params?: AdminUserListParams) =>
    client.get<PageResponse<AdminUserInfoResponse>>("/admin-user/page", { params }),
};
