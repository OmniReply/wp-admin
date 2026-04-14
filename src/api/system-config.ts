import { client, buildPath } from './client';
import type { ApiResponse, ListResponse, PageResponse } from '@/types/common';
import type { SystemConfig } from '@/types/openapi';
import type { SystemConfigItem, SystemConfigListParams, SystemConfigSaveDto } from '@/types/system-config';

export const systemConfigApi = {
  save: (data: SystemConfigSaveDto) =>
    client.post<ApiResponse<SystemConfig>>("/system/config/save", data),
  detail: (id: string | number) =>
    client.get<ApiResponse<SystemConfig>>(buildPath("/system/config/{id}", { id })),
  remove: (id: string | number) =>
    client.delete<ApiResponse<unknown>>(buildPath("/system/config/{id}", { id })),
  list: (params?: SystemConfigListParams) =>
    client.get<ListResponse<SystemConfig>>("/system/config/list", { params }),
  getByGroup: (group: string | number) =>
    client.get<ListResponse<SystemConfig>>(buildPath("/system/config/group/{group}", { group })),
};
