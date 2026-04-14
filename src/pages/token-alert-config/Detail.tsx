
import { ResourceDetailPage } from '@/components/resource/ResourceDetailPage';
import { resourceMetaMap } from '@/generated/resources';
import { tokenAlertConfigApi } from '@/api/token-alert-config';

const meta = resourceMetaMap["token-alert-config"];

export default function TokenAlertConfigDetailPage() {
  return <ResourceDetailPage api={tokenAlertConfigApi} meta={meta} />;
}
