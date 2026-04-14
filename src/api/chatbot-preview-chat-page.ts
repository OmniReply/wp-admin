import { client, buildPath } from './client';
import type { ApiResponse, ListResponse, PageResponse } from '@/types/common';
import type { AdminChatbotPreviewChatResponse } from '@/types/openapi';
import type { ChatbotPreviewChatPageItem, ChatbotPreviewChatPageListParams } from '@/types/chatbot-preview-chat-page';

export const chatbotPreviewChatPageApi = {
  list: (params?: ChatbotPreviewChatPageListParams) =>
    client.get<PageResponse<AdminChatbotPreviewChatResponse>>("/chatbot/preview-chat/page", { params }),
};
