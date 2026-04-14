import { client, buildPath } from './client';
import type { ApiResponse, ListResponse, PageResponse } from '@/types/common';
import type { AdminReminderNotificationResponse } from '@/types/openapi';
import type { ReminderNotificationPageItem, ReminderNotificationPageListParams } from '@/types/reminder-notification-page';

export const reminderNotificationPageApi = {
  list: (params?: ReminderNotificationPageListParams) =>
    client.get<PageResponse<AdminReminderNotificationResponse>>("/reminder-notification/page", { params }),
};
