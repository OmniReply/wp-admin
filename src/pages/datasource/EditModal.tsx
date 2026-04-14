
import { resourceMetaMap } from '@/generated/resources';
import { ResourceFormDialog } from '@/components/resource/ResourceFormDialog';
import { datasourceApi } from '@/api/datasource';
import type { DatasourceSaveDto } from '@/types/datasource';

const meta = resourceMetaMap["datasource"];

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
    await datasourceApi.save(payload as unknown as DatasourceSaveDto);
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
