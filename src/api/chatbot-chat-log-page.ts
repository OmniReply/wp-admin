import { client, buildPath } from './client';
import type { ApiResponse, ListResponse, PageResponse } from '@/types/common';
import type { AiChatbotChatLog } from '@/types/openapi';
import type { ChatbotChatLogPageItem, ChatbotChatLogPageListParams } from '@/types/chatbot-chat-log-page';

export const chatbotChatLogPageApi = {
  list: (params?: ChatbotChatLogPageListParams) =>
    client.get<PageResponse<AiChatbotChatLog>>("/chatbot/chat-log/page", { params }),
};
