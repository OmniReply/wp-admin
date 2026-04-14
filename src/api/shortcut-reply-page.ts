import { client, buildPath } from './client';
import type { ApiResponse, ListResponse, PageResponse } from '@/types/common';
import type { AdminShortcutReplyResponse } from '@/types/openapi';
import type { ShortcutReplyPageItem, ShortcutReplyPageListParams } from '@/types/shortcut-reply-page';

export const shortcutReplyPageApi = {
  list: (params?: ShortcutReplyPageListParams) =>
    client.get<PageResponse<AdminShortcutReplyResponse>>("/shortcut-reply/page", { params }),
};
