import { client, buildPath } from './client';
import type { ApiResponse, ListResponse, PageResponse } from '@/types/common';
import type { AdminUserResponse } from '@/types/openapi';
import type { UserItem, UserListParams } from '@/types/user';

export const userApi = {
  updateStatus: (id: string | number, params: { status: number }) =>
    client.put<ApiResponse<unknown>>(buildPath("/user/{id}/status", { id }), undefined, { params }),
  resetPassword: (id: string | number, params: { newPassword: string }) =>
    client.put<ApiResponse<unknown>>(buildPath("/user/{id}/reset-password", { id }), undefined, { params }),
  detail: (id: string | number) =>
    client.get<ApiResponse<AdminUserResponse>>(buildPath("/user/{id}", { id })),
  list: (params?: UserListParams) =>
    client.get<PageResponse<AdminUserResponse>>("/user/page", { params }),
};
