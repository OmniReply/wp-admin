
import { createResourceStore } from './createResourceStore';
import { appVersionApi } from '@/api/app-version';
import type { AppVersionItem, AppVersionListParams } from '@/types/app-version';

export const useAppVersionStore = createResourceStore<AppVersionItem, AppVersionListParams>(
  appVersionApi,
  {
    pageNum: 1,
    pageSize: 20,
  } as AppVersionListParams
);
