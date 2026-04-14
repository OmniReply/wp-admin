import { client, buildPath } from './client';
import type { ApiResponse, ListResponse, PageResponse } from '@/types/common';
import type { TokenAlertConfig } from '@/types/openapi';
import type { TokenAlertConfigItem, TokenAlertConfigListParams, TokenAlertConfigSaveDto } from '@/types/token-alert-config';

export const tokenAlertConfigApi = {
  toggleEnabled2: (id: string | number, params: { isEnabled: number }) =>
    client.put<ApiResponse<unknown>>(buildPath("/token/alert/config/{id}/toggle", { id }), undefined, { params }),
  save: (data: TokenAlertConfigSaveDto) =>
    client.post<ApiResponse<TokenAlertConfig>>("/token/alert/config/save", data),
  detail: (id: string | number) =>
    client.get<ApiResponse<TokenAlertConfig>>(buildPath("/token/alert/config/{id}", { id })),
  remove: (id: string | number) =>
    client.delete<ApiResponse<unknown>>(buildPath("/token/alert/config/{id}", { id })),
  list: (params?: TokenAlertConfigListParams) =>
    client.get<PageResponse<TokenAlertConfig>>("/token/alert/config/page", { params }),
  listAll1: () =>
    client.get<ListResponse<TokenAlertConfig>>("/token/alert/config/list"),
};
