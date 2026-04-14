import { client, buildPath } from './client';
import type { ApiResponse, ListResponse, PageResponse } from '@/types/common';
import type { AiChatbotRoute } from '@/types/openapi';
import type { ChatbotRouteItem, ChatbotRouteListParams, ChatbotRouteSaveDto } from '@/types/chatbot-route';

export const chatbotRouteApi = {
  toggleEnabled4: (id: string | number, params: { isEnabled: number }) =>
    client.put<ApiResponse<unknown>>(buildPath("/chatbot/route/{id}/toggle", { id }), undefined, { params }),
  setAsDefault1: (id: string | number) =>
    client.put<ApiResponse<unknown>>(buildPath("/chatbot/route/{id}/default", { id })),
  save: (data: ChatbotRouteSaveDto) =>
    client.post<ApiResponse<AiChatbotRoute>>("/chatbot/route/save", data),
  detail: (id: string | number) =>
    client.get<ApiResponse<AiChatbotRoute>>(buildPath("/chatbot/route/{id}", { id })),
  remove: (id: string | number) =>
    client.delete<ApiResponse<unknown>>(buildPath("/chatbot/route/{id}", { id })),
  list: (params?: ChatbotRouteListParams) =>
    client.get<ListResponse<AiChatbotRoute>>("/chatbot/route/list", { params }),
  listEnabled1: () =>
    client.get<ListResponse<AiChatbotRoute>>("/chatbot/route/list/enabled"),
};
