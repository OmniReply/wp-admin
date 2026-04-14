
import { resourceMetaMap } from '@/generated/resources';
import { ResourceFormDialog } from '@/components/resource/ResourceFormDialog';
import { translateRouteApi } from '@/api/translate-route';
import type { TranslateRouteSaveDto } from '@/types/translate-route';

const meta = resourceMetaMap["translate-route"];

export default function CreateModal({
  open,
  onOpenChange,
  onSuccess,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => Promise<void>;
}) {
  const handleSubmit = async (payload: Record<string, unknown>) => {
    await translateRouteApi.save(payload as unknown as TranslateRouteSaveDto);
    await onSuccess();
  };

  return (
    <ResourceFormDialog
      meta={meta}
      mode="create"
      onOpenChange={onOpenChange}
      onSubmit={handleSubmit}
      open={open}
    />
  );
}
