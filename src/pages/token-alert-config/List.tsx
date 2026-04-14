
import { ResourceTablePage } from '@/components/resource/ResourceTablePage';
import { resourceMetaMap } from '@/generated/resources';
import { tokenAlertConfigApi } from '@/api/token-alert-config';
import { useTokenAlertConfigStore } from '@/stores/token-alert-configStore';
import CreateModal from './CreateModal';
import EditModal from './EditModal';

const meta = resourceMetaMap["token-alert-config"];

export default function TokenAlertConfigListPage() {
  return (
    <ResourceTablePage
      api={tokenAlertConfigApi}
      meta={meta}
      useStore={useTokenAlertConfigStore}
      CreateModal={CreateModal}
      EditModal={EditModal}
    />
  );
}
