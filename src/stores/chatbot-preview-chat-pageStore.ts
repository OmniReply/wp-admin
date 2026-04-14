
import { createResourceStore } from './createResourceStore';
import { chatbotPreviewChatPageApi } from '@/api/chatbot-preview-chat-page';
import type { ChatbotPreviewChatPageItem, ChatbotPreviewChatPageListParams } from '@/types/chatbot-preview-chat-page';

export const useChatbotPreviewChatPageStore = createResourceStore<ChatbotPreviewChatPageItem, ChatbotPreviewChatPageListParams>(
  chatbotPreviewChatPageApi,
  {
    pageNum: 1,
    pageSize: 20,
  } as ChatbotPreviewChatPageListParams
);
