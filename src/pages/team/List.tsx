
import { ResourceTablePage } from '@/components/resource/ResourceTablePage';
import { resourceMetaMap } from '@/generated/resources';
import { teamApi } from '@/api/team';
import { useTeamStore } from '@/stores/teamStore';



const meta = resourceMetaMap["team"];

export default function TeamListPage() {
  return (
    <ResourceTablePage
      api={teamApi}
      meta={meta}
      useStore={useTeamStore}


    />
  );
}
