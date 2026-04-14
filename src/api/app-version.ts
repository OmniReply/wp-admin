import { client, buildPath } from './client';
import type { ApiResponse, ListResponse, PageResponse } from '@/types/common';
import type { AppVersion } from '@/types/openapi';
import type { AppVersionItem, AppVersionListParams, AppVersionSaveDto } from '@/types/app-version';

export const appVersionApi = {
  publish: (id: string | number) =>
    client.put<ApiResponse<AppVersion>>(buildPath("/app-version/{id}/publish", { id })),
  offline: (id: string | number) =>
    client.put<ApiResponse<AppVersion>>(buildPath("/app-version/{id}/offline", { id })),
  save: (data: AppVersionSaveDto) =>
    client.post<ApiResponse<AppVersion>>("/app-version/save", data),
  detail: (id: string | number) =>
    client.get<ApiResponse<AppVersion>>(buildPath("/app-version/{id}", { id })),
  remove: (id: string | number) =>
    client.delete<ApiResponse<unknown>>(buildPath("/app-version/{id}", { id })),
  list: (params?: AppVersionListParams) =>
    client.get<PageResponse<AppVersion>>("/app-version/page", { params }),
};
