
import { resourceMetaMap } from '@/generated/resources';
import { ResourceFormDialog } from '@/components/resource/ResourceFormDialog';
import { appVersionApi } from '@/api/app-version';
import type { AppVersionSaveDto } from '@/types/app-version';

const meta = resourceMetaMap["app-version"];

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
    await appVersionApi.save(payload as unknown as AppVersionSaveDto);
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
