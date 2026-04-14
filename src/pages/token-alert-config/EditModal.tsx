
import { resourceMetaMap } from '@/generated/resources';
import { ResourceFormDialog } from '@/components/resource/ResourceFormDialog';
import { tokenAlertConfigApi } from '@/api/token-alert-config';
import type { TokenAlertConfigSaveDto } from '@/types/token-alert-config';

const meta = resourceMetaMap["token-alert-config"];

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
    await tokenAlertConfigApi.save(payload as unknown as TokenAlertConfigSaveDto);
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
