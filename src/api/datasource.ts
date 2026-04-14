import { client, buildPath } from './client';
import type { ApiResponse, ListResponse, PageResponse } from '@/types/common';
import type { AdminUserDatasourceResponse } from '@/types/openapi';
import type { DatasourceItem, DatasourceListParams, DatasourceSaveDto } from '@/types/datasource';

export const datasourceApi = {
  save: (data: DatasourceSaveDto) =>
    client.post<ApiResponse<unknown>>("/datasource/re-vectorize", data),
  list: (params?: DatasourceListParams) =>
    client.get<PageResponse<AdminUserDatasourceResponse>>("/datasource/page", { params }),
};
