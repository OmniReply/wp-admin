
import { client } from './client';
import type { ApiResponse } from '@/types/common';
import type { AdminLoginRequest, AdminLoginResponse, AdminUserInfoResponse } from '@/types/openapi';

export const authApi = {
  login: (data: AdminLoginRequest) =>
    client.post<ApiResponse<AdminLoginResponse>>('/auth/login', data),
  info: () =>
    client.get<ApiResponse<AdminUserInfoResponse>>('/auth/info'),
  logout: () =>
    client.post<ApiResponse<void>>('/auth/logout'),
};
