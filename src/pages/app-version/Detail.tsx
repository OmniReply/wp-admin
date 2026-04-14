
import { ResourceDetailPage } from '@/components/resource/ResourceDetailPage';
import { resourceMetaMap } from '@/generated/resources';
import { appVersionApi } from '@/api/app-version';

const meta = resourceMetaMap["app-version"];

export default function AppVersionDetailPage() {
  return <ResourceDetailPage api={appVersionApi} meta={meta} />;
}
