
import { createResourceStore } from './createResourceStore';
import { shortcutReplyPageApi } from '@/api/shortcut-reply-page';
import type { ShortcutReplyPageItem, ShortcutReplyPageListParams } from '@/types/shortcut-reply-page';

export const useShortcutReplyPageStore = createResourceStore<ShortcutReplyPageItem, ShortcutReplyPageListParams>(
  shortcutReplyPageApi,
  {
    pageNum: 1,
    pageSize: 20,
  } as ShortcutReplyPageListParams
);
