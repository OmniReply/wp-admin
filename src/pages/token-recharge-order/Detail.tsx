
import { ResourceDetailPage } from '@/components/resource/ResourceDetailPage';
import { resourceMetaMap } from '@/generated/resources';
import { tokenRechargeOrderApi } from '@/api/token-recharge-order';

const meta = resourceMetaMap["token-recharge-order"];

export default function TokenRechargeOrderDetailPage() {
  return <ResourceDetailPage api={tokenRechargeOrderApi} meta={meta} />;
}
