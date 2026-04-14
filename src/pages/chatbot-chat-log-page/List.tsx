
import { ResourceTablePage } from '@/components/resource/ResourceTablePage';
import { resourceMetaMap } from '@/generated/resources';
import { chatbotChatLogPageApi } from '@/api/chatbot-chat-log-page';
import { useChatbotChatLogPageStore } from '@/stores/chatbot-chat-log-pageStore';



const meta = resourceMetaMap["chatbot-chat-log-page"];

export default function ChatbotChatLogPageListPage() {
  return (
    <ResourceTablePage
      api={chatbotChatLogPageApi}
      meta={meta}
      useStore={useChatbotChatLogPageStore}


    />
  );
}
