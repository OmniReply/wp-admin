
import { ResourceTablePage } from '@/components/resource/ResourceTablePage';
import { resourceMetaMap } from '@/generated/resources';
import { tokenAlertRecordPageApi } from '@/api/token-alert-record-page';
import { useTokenAlertRecordPageStore } from '@/stores/token-alert-record-pageStore';



const meta = resourceMetaMap["token-alert-record-page"];

export default function TokenAlertRecordPageListPage() {
  return (
    <ResourceTablePage
      api={tokenAlertRecordPageApi}
      meta={meta}
      useStore={useTokenAlertRecordPageStore}


    />
  );
}
