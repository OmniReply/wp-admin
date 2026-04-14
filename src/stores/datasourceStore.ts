
import { createResourceStore } from './createResourceStore';
import { datasourceApi } from '@/api/datasource';
import type { DatasourceItem, DatasourceListParams } from '@/types/datasource';

export const useDatasourceStore = createResourceStore<DatasourceItem, DatasourceListParams>(
  datasourceApi,
  {
    pageNum: 1,
    pageSize: 20,
  } as DatasourceListParams
);
