
import { createResourceStore } from './createResourceStore';
import { tokenPackageApi } from '@/api/token-package';
import type { TokenPackageItem, TokenPackageListParams } from '@/types/token-package';

export const useTokenPackageStore = createResourceStore<TokenPackageItem, TokenPackageListParams>(
  tokenPackageApi,
  {
    pageNum: 1,
    pageSize: 20,
  } as TokenPackageListParams
);
