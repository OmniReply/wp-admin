
import { ResourceDetailPage } from '@/components/resource/ResourceDetailPage';
import { resourceMetaMap } from '@/generated/resources';
import { teamApi } from '@/api/team';

const meta = resourceMetaMap["team"];

export default function TeamDetailPage() {
  return <ResourceDetailPage api={teamApi} meta={meta} />;
}
