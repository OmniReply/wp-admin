
import { createResourceStore } from './createResourceStore';
import { systemConfigApi } from '@/api/system-config';
import type { SystemConfigItem, SystemConfigListParams } from '@/types/system-config';

export const useSystemConfigStore = createResourceStore<SystemConfigItem, SystemConfigListParams>(
  systemConfigApi,
  {
    pageNum: 1,
    pageSize: 20,
  } as SystemConfigListParams
);
