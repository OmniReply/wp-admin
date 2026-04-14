
import { ResourceTablePage } from '@/components/resource/ResourceTablePage';
import { resourceMetaMap } from '@/generated/resources';
import { autoReplyRulePageApi } from '@/api/auto-reply-rule-page';
import { useAutoReplyRulePageStore } from '@/stores/auto-reply-rule-pageStore';



const meta = resourceMetaMap["auto-reply-rule-page"];

export default function AutoReplyRulePageListPage() {
  return (
    <ResourceTablePage
      api={autoReplyRulePageApi}
      meta={meta}
      useStore={useAutoReplyRulePageStore}


    />
  );
}
