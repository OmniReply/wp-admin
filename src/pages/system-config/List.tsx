
import { ResourceTablePage } from '@/components/resource/ResourceTablePage';
import { resourceMetaMap } from '@/generated/resources';
import { systemConfigApi } from '@/api/system-config';
import { useSystemConfigStore } from '@/stores/system-configStore';
import CreateModal from './CreateModal';
import EditModal from './EditModal';

const meta = resourceMetaMap["system-config"];

export default function SystemConfigListPage() {
  return (
    <ResourceTablePage
      api={systemConfigApi}
      meta={meta}
      useStore={useSystemConfigStore}
      CreateModal={CreateModal}
      EditModal={EditModal}
    />
  );
}
