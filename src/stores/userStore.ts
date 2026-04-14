
import { createResourceStore } from './createResourceStore';
import { userApi } from '@/api/user';
import type { UserItem, UserListParams } from '@/types/user';

export const useUserStore = createResourceStore<UserItem, UserListParams>(
  userApi,
  {
    pageNum: 1,
    pageSize: 20,
  } as UserListParams
);
