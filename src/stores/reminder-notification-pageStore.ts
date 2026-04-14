
import { createResourceStore } from './createResourceStore';
import { reminderNotificationPageApi } from '@/api/reminder-notification-page';
import type { ReminderNotificationPageItem, ReminderNotificationPageListParams } from '@/types/reminder-notification-page';

export const useReminderNotificationPageStore = createResourceStore<ReminderNotificationPageItem, ReminderNotificationPageListParams>(
  reminderNotificationPageApi,
  {
    pageNum: 1,
    pageSize: 20,
  } as ReminderNotificationPageListParams
);
