
import { ResourceTablePage } from '@/components/resource/ResourceTablePage';
import { resourceMetaMap } from '@/generated/resources';
import { membershipPlanApi } from '@/api/membership-plan';
import { useMembershipPlanStore } from '@/stores/membership-planStore';
import CreateModal from './CreateModal';
import EditModal from './EditModal';

const meta = resourceMetaMap["membership-plan"];

export default function MembershipPlanListPage() {
  return (
    <ResourceTablePage
      api={membershipPlanApi}
      meta={meta}
      useStore={useMembershipPlanStore}
      CreateModal={CreateModal}
      EditModal={EditModal}
    />
  );
}
