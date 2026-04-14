
import { createResourceStore } from './createResourceStore';
import { membershipPlanApi } from '@/api/membership-plan';
import type { MembershipPlanItem, MembershipPlanListParams } from '@/types/membership-plan';

export const useMembershipPlanStore = createResourceStore<MembershipPlanItem, MembershipPlanListParams>(
  membershipPlanApi,
  {
    pageNum: 1,
    pageSize: 20,
  } as MembershipPlanListParams
);
