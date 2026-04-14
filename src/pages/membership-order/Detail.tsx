
import { ResourceDetailPage } from '@/components/resource/ResourceDetailPage';
import { resourceMetaMap } from '@/generated/resources';
import { membershipOrderApi } from '@/api/membership-order';

const meta = resourceMetaMap["membership-order"];

export default function MembershipOrderDetailPage() {
  return <ResourceDetailPage api={membershipOrderApi} meta={meta} />;
}
