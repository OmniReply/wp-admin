
import { createResourceStore } from './createResourceStore';
import { broadcastMessageApi } from '@/api/broadcast-message';
import type { BroadcastMessageItem, BroadcastMessageListParams } from '@/types/broadcast-message';

export const useBroadcastMessageStore = createResourceStore<BroadcastMessageItem, BroadcastMessageListParams>(
  broadcastMessageApi,
  {
    pageNum: 1,
    pageSize: 20,
  } as BroadcastMessageListParams
);
