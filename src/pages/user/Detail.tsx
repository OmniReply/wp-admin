
import { ResourceDetailPage } from '@/components/resource/ResourceDetailPage';
import { resourceMetaMap } from '@/generated/resources';
import { userApi } from '@/api/user';

const meta = resourceMetaMap["user"];

export default function UserDetailPage() {
  return <ResourceDetailPage api={userApi} meta={meta} />;
}
