
import { ResourceTablePage } from '@/components/resource/ResourceTablePage';
import { resourceMetaMap } from '@/generated/resources';
import { membershipOrderApi } from '@/api/membership-order';
import { useMembershipOrderStore } from '@/stores/membership-orderStore';



const meta = resourceMetaMap["membership-order"];

export default function MembershipOrderListPage() {
  return (
    <ResourceTablePage
      api={membershipOrderApi}
      meta={meta}
      useStore={useMembershipOrderStore}


    />
  );
}
