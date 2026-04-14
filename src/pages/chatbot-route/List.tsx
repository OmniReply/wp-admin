
import { ResourceTablePage } from '@/components/resource/ResourceTablePage';
import { resourceMetaMap } from '@/generated/resources';
import { chatbotRouteApi } from '@/api/chatbot-route';
import { useChatbotRouteStore } from '@/stores/chatbot-routeStore';
import CreateModal from './CreateModal';
import EditModal from './EditModal';

const meta = resourceMetaMap["chatbot-route"];

export default function ChatbotRouteListPage() {
  return (
    <ResourceTablePage
      api={chatbotRouteApi}
      meta={meta}
      useStore={useChatbotRouteStore}
      CreateModal={CreateModal}
      EditModal={EditModal}
    />
  );
}
