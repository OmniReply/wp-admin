import { client, buildPath } from './client';
import type { ApiResponse, ListResponse, PageResponse } from '@/types/common';
import type { LoginFail } from '@/types/openapi';
import type { LoginFailItem, LoginFailListParams } from '@/types/login-fail';

export const loginFailApi = {
  unlockById: (id: string | number) =>
    client.put<ApiResponse<unknown>>(buildPath("/login-fail/{id}/unlock", { id })),
  unlockByEmail: (params: { email: string }) =>
    client.put<ApiResponse<unknown>>("/login-fail/unlock", undefined, { params }),
  list: (params?: LoginFailListParams) =>
    client.get<PageResponse<LoginFail>>("/login-fail/page", { params }),
};
