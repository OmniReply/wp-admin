
import { createResourceStore } from './createResourceStore';
import { chatbotChatLogPageApi } from '@/api/chatbot-chat-log-page';
import type { ChatbotChatLogPageItem, ChatbotChatLogPageListParams } from '@/types/chatbot-chat-log-page';

export const useChatbotChatLogPageStore = createResourceStore<ChatbotChatLogPageItem, ChatbotChatLogPageListParams>(
  chatbotChatLogPageApi,
  {
    pageNum: 1,
    pageSize: 20,
  } as ChatbotChatLogPageListParams
);
