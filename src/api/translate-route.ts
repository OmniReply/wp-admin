import { client, buildPath } from './client';
import type { ApiResponse, ListResponse, PageResponse } from '@/types/common';
import type { TranslateRoute } from '@/types/openapi';
import type { TranslateRouteItem, TranslateRouteListParams, TranslateRouteSaveDto } from '@/types/translate-route';

export const translateRouteApi = {
  toggleEnabled: (id: string | number, params: { isEnabled: number }) =>
    client.put<ApiResponse<unknown>>(buildPath("/translate/route/{id}/toggle", { id }), undefined, { params }),
  setAsDefault: (id: string | number) =>
    client.put<ApiResponse<unknown>>(buildPath("/translate/route/{id}/default", { id })),
  save: (data: TranslateRouteSaveDto) =>
    client.post<ApiResponse<TranslateRoute>>("/translate/route/save", data),
  detail: (id: string | number) =>
    client.get<ApiResponse<TranslateRoute>>(buildPath("/translate/route/{id}", { id })),
  remove: (id: string | number) =>
    client.delete<ApiResponse<unknown>>(buildPath("/translate/route/{id}", { id })),
  list: (params?: TranslateRouteListParams) =>
    client.get<ListResponse<TranslateRoute>>("/translate/route/list", { params }),
  listEnabled: () =>
    client.get<ListResponse<TranslateRoute>>("/translate/route/list/enabled"),
  listBasicRoutes: () =>
    client.get<ListResponse<TranslateRoute>>("/translate/route/list/basic"),
  listAiRoutes: () =>
    client.get<ListResponse<TranslateRoute>>("/translate/route/list/ai"),
};
