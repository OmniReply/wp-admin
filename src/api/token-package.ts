import { client, buildPath } from './client';
import type { ApiResponse, ListResponse, PageResponse } from '@/types/common';
import type { TokenPricePackage } from '@/types/openapi';
import type { TokenPackageItem, TokenPackageListParams, TokenPackageSaveDto } from '@/types/token-package';

export const tokenPackageApi = {
  toggleEnabled1: (id: string | number, params: { enabled: number }) =>
    client.put<ApiResponse<unknown>>(buildPath("/token/package/{id}/toggle", { id }), undefined, { params }),
  save: (data: TokenPackageSaveDto) =>
    client.post<ApiResponse<TokenPricePackage>>("/token/package/save", data),
  detail: (id: string | number) =>
    client.get<ApiResponse<TokenPricePackage>>(buildPath("/token/package/{id}", { id })),
  remove: (id: string | number) =>
    client.delete<ApiResponse<unknown>>(buildPath("/token/package/{id}", { id })),
  list: (params?: TokenPackageListParams) =>
    client.get<ListResponse<TokenPricePackage>>("/token/package/list", { params }),
};
