
import { resourceMetaMap } from '@/generated/resources';
import { ResourceFormDialog } from '@/components/resource/ResourceFormDialog';
import { chatbotRouteApi } from '@/api/chatbot-route';
import type { ChatbotRouteSaveDto } from '@/types/chatbot-route';

const meta = resourceMetaMap["chatbot-route"];

export default function EditModal({
  open,
  onOpenChange,
  data,
  onSuccess,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: Record<string, unknown> | null;
  onSuccess: () => Promise<void>;
}) {
  const handleSubmit = async (payload: Record<string, unknown>) => {
    await chatbotRouteApi.save(payload as unknown as ChatbotRouteSaveDto);
    await onSuccess();
  };

  return (
    <ResourceFormDialog
      initialValues={data}
      meta={meta}
      mode="edit"
      onOpenChange={onOpenChange}
      onSubmit={handleSubmit}
      open={open}
    />
  );
}
