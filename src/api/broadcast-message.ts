import { client, buildPath } from './client';
import type { ApiResponse, ListResponse, PageResponse } from '@/types/common';
import type { AdminBroadcastMessageRecipientResponse, AdminBroadcastMessageResponse, AdminBroadcastMessageTemplateResponse } from '@/types/openapi';
import type { BroadcastMessageItem, BroadcastMessageListParams } from '@/types/broadcast-message';

export const broadcastMessageApi = {
  getRecipients: (broadcastId: string | number, params: { pageNum?: number; pageSize?: number; status?: string; keyword?: string; startTime?: string; endTime?: string }) =>
    client.get<PageResponse<AdminBroadcastMessageRecipientResponse>>(buildPath("/broadcast-message/{broadcastId}/recipients", { broadcastId }), { params }),
  getTemplatePageList: (params: { pageNum?: number; pageSize?: number; teamId?: number; userId?: number; status?: number; keyword?: string; startTime?: string; endTime?: string }) =>
    client.get<PageResponse<AdminBroadcastMessageTemplateResponse>>("/broadcast-message/template/page", { params }),
  list: (params?: BroadcastMessageListParams) =>
    client.get<PageResponse<AdminBroadcastMessageResponse>>("/broadcast-message/page", { params }),
};
