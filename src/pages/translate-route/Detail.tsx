
import { ResourceDetailPage } from '@/components/resource/ResourceDetailPage';
import { resourceMetaMap } from '@/generated/resources';
import { translateRouteApi } from '@/api/translate-route';

const meta = resourceMetaMap["translate-route"];

export default function TranslateRouteDetailPage() {
  return <ResourceDetailPage api={translateRouteApi} meta={meta} />;
}
