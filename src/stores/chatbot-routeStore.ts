
import { createResourceStore } from './createResourceStore';
import { chatbotRouteApi } from '@/api/chatbot-route';
import type { ChatbotRouteItem, ChatbotRouteListParams } from '@/types/chatbot-route';

export const useChatbotRouteStore = createResourceStore<ChatbotRouteItem, ChatbotRouteListParams>(
  chatbotRouteApi,
  {
    pageNum: 1,
    pageSize: 20,
  } as ChatbotRouteListParams
);
