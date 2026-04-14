
import { createResourceStore } from './createResourceStore';
import { membershipOrderApi } from '@/api/membership-order';
import type { MembershipOrderItem, MembershipOrderListParams } from '@/types/membership-order';

export const useMembershipOrderStore = createResourceStore<MembershipOrderItem, MembershipOrderListParams>(
  membershipOrderApi,
  {
    pageNum: 1,
    pageSize: 20,
  } as MembershipOrderListParams
);
