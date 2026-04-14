
import { ResourceDetailPage } from '@/components/resource/ResourceDetailPage';
import { resourceMetaMap } from '@/generated/resources';
import { tokenPackageApi } from '@/api/token-package';

const meta = resourceMetaMap["token-package"];

export default function TokenPackageDetailPage() {
  return <ResourceDetailPage api={tokenPackageApi} meta={meta} />;
}
