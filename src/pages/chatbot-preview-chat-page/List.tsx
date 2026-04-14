
import { ResourceTablePage } from '@/components/resource/ResourceTablePage';
import { resourceMetaMap } from '@/generated/resources';
import { chatbotPreviewChatPageApi } from '@/api/chatbot-preview-chat-page';
import { useChatbotPreviewChatPageStore } from '@/stores/chatbot-preview-chat-pageStore';



const meta = resourceMetaMap["chatbot-preview-chat-page"];

export default function ChatbotPreviewChatPageListPage() {
  return (
    <ResourceTablePage
      api={chatbotPreviewChatPageApi}
      meta={meta}
      useStore={useChatbotPreviewChatPageStore}


    />
  );
}
