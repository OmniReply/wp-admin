
import { createResourceStore } from './createResourceStore';
import { adminUserApi } from '@/api/admin-user';
import type { AdminUserItem, AdminUserListParams } from '@/types/admin-user';

export const useAdminUserStore = createResourceStore<AdminUserItem, AdminUserListParams>(
  adminUserApi,
  {
    pageNum: 1,
    pageSize: 20,
  } as AdminUserListParams
);
