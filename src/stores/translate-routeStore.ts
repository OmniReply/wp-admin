
import { createResourceStore } from './createResourceStore';
import { translateRouteApi } from '@/api/translate-route';
import type { TranslateRouteItem, TranslateRouteListParams } from '@/types/translate-route';

export const useTranslateRouteStore = createResourceStore<TranslateRouteItem, TranslateRouteListParams>(
  translateRouteApi,
  {
    pageNum: 1,
    pageSize: 20,
  } as TranslateRouteListParams
);
