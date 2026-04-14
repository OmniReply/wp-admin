
import { ResourceTablePage } from '@/components/resource/ResourceTablePage';
import { resourceMetaMap } from '@/generated/resources';
import { adminUserApi } from '@/api/admin-user';
import { useAdminUserStore } from '@/stores/admin-userStore';
import CreateModal from './CreateModal';
import EditModal from './EditModal';

const meta = resourceMetaMap["admin-user"];

export default function AdminUserListPage() {
  return (
    <ResourceTablePage
      api={adminUserApi}
      meta={meta}
      useStore={useAdminUserStore}
      CreateModal={CreateModal}
      EditModal={EditModal}
    />
  );
}
