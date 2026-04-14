
import { ResourceDetailPage } from '@/components/resource/ResourceDetailPage';
import { resourceMetaMap } from '@/generated/resources';
import { chatbotRouteApi } from '@/api/chatbot-route';

const meta = resourceMetaMap["chatbot-route"];

export default function ChatbotRouteDetailPage() {
  return <ResourceDetailPage api={chatbotRouteApi} meta={meta} />;
}
