
import { ResourceTablePage } from '@/components/resource/ResourceTablePage';
import { resourceMetaMap } from '@/generated/resources';
import { shortcutReplyPageApi } from '@/api/shortcut-reply-page';
import { useShortcutReplyPageStore } from '@/stores/shortcut-reply-pageStore';



const meta = resourceMetaMap["shortcut-reply-page"];

export default function ShortcutReplyPageListPage() {
  return (
    <ResourceTablePage
      api={shortcutReplyPageApi}
      meta={meta}
      useStore={useShortcutReplyPageStore}


    />
  );
}
