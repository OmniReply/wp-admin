
import { ResourceDetailPage } from '@/components/resource/ResourceDetailPage';
import { resourceMetaMap } from '@/generated/resources';
import { membershipPlanApi } from '@/api/membership-plan';

const meta = resourceMetaMap["membership-plan"];

export default function MembershipPlanDetailPage() {
  return <ResourceDetailPage api={membershipPlanApi} meta={meta} />;
}
