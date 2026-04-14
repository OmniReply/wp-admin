
import { ResourceDetailPage } from '@/components/resource/ResourceDetailPage';
import { resourceMetaMap } from '@/generated/resources';
import { adminUserApi } from '@/api/admin-user';

const meta = resourceMetaMap["admin-user"];

export default function AdminUserDetailPage() {
  return <ResourceDetailPage api={adminUserApi} meta={meta} />;
}
