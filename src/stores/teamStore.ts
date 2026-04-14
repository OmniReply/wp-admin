
import { createResourceStore } from './createResourceStore';
import { teamApi } from '@/api/team';
import type { TeamItem, TeamListParams } from '@/types/team';

export const useTeamStore = createResourceStore<TeamItem, TeamListParams>(
  teamApi,
  {
    pageNum: 1,
    pageSize: 20,
  } as TeamListParams
);
