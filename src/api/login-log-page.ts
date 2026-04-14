import { client, buildPath } from './client';
import type { ApiResponse, ListResponse, PageResponse } from '@/types/common';
import type { LoginLog } from '@/types/openapi';
import type { LoginLogPageItem, LoginLogPageListParams } from '@/types/login-log-page';

export const loginLogPageApi = {
  list: (params?: LoginLogPageListParams) =>
    client.get<PageResponse<LoginLog>>("/login-log/page", { params }),
};
