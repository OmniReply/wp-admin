
import { ResourceTablePage } from '@/components/resource/ResourceTablePage';
import { resourceMetaMap } from '@/generated/resources';
import { broadcastMessageApi } from '@/api/broadcast-message';
import { useBroadcastMessageStore } from '@/stores/broadcast-messageStore';



const meta = resourceMetaMap["broadcast-message"];

export default function BroadcastMessageListPage() {
  return (
    <ResourceTablePage
      api={broadcastMessageApi}
      meta={meta}
      useStore={useBroadcastMessageStore}


    />
  );
}
