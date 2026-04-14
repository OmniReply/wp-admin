
import { resourceMetaMap } from '@/generated/resources';
import { ResourceFormDialog } from '@/components/resource/ResourceFormDialog';
import { systemConfigApi } from '@/api/system-config';
import type { SystemConfigSaveDto } from '@/types/system-config';

const meta = resourceMetaMap["system-config"];

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
    await systemConfigApi.save(payload as unknown as SystemConfigSaveDto);
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
