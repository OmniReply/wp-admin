
import { ResourceTablePage } from '@/components/resource/ResourceTablePage';
import { resourceMetaMap } from '@/generated/resources';
import { reminderNotificationPageApi } from '@/api/reminder-notification-page';
import { useReminderNotificationPageStore } from '@/stores/reminder-notification-pageStore';



const meta = resourceMetaMap["reminder-notification-page"];

export default function ReminderNotificationPageListPage() {
  return (
    <ResourceTablePage
      api={reminderNotificationPageApi}
      meta={meta}
      useStore={useReminderNotificationPageStore}


    />
  );
}
