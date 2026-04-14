
import { resourceMetaMap } from '@/generated/resources';
import { ResourceFormDialog } from '@/components/resource/ResourceFormDialog';
import { adminUserApi } from '@/api/admin-user';
import type { AdminUserSaveDto } from '@/types/admin-user';

const meta = resourceMetaMap["admin-user"];

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
    await adminUserApi.save(payload as unknown as AdminUserSaveDto);
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
