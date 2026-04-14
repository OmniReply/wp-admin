
import { resourceMetaMap } from '@/generated/resources';
import { ResourceFormDialog } from '@/components/resource/ResourceFormDialog';
import { tokenAlertConfigApi } from '@/api/token-alert-config';
import type { TokenAlertConfigSaveDto } from '@/types/token-alert-config';

const meta = resourceMetaMap["token-alert-config"];

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
    await tokenAlertConfigApi.save(payload as unknown as TokenAlertConfigSaveDto);
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
