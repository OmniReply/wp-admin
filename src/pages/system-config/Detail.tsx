
import { ResourceDetailPage } from '@/components/resource/ResourceDetailPage';
import { resourceMetaMap } from '@/generated/resources';
import { systemConfigApi } from '@/api/system-config';

const meta = resourceMetaMap["system-config"];

export default function SystemConfigDetailPage() {
  return <ResourceDetailPage api={systemConfigApi} meta={meta} />;
}
