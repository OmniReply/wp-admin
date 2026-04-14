
import { ResourceTablePage } from '@/components/resource/ResourceTablePage';
import { resourceMetaMap } from '@/generated/resources';
import { tokenRechargeOrderApi } from '@/api/token-recharge-order';
import { useTokenRechargeOrderStore } from '@/stores/token-recharge-orderStore';



const meta = resourceMetaMap["token-recharge-order"];

export default function TokenRechargeOrderListPage() {
  return (
    <ResourceTablePage
      api={tokenRechargeOrderApi}
      meta={meta}
      useStore={useTokenRechargeOrderStore}


    />
  );
}
