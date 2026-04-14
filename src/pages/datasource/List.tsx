
import { ResourceTablePage } from '@/components/resource/ResourceTablePage';
import { resourceMetaMap } from '@/generated/resources';
import { datasourceApi } from '@/api/datasource';
import { useDatasourceStore } from '@/stores/datasourceStore';
import CreateModal from './CreateModal';
import EditModal from './EditModal';

const meta = resourceMetaMap["datasource"];

export default function DatasourceListPage() {
  return (
    <ResourceTablePage
      api={datasourceApi}
      meta={meta}
      useStore={useDatasourceStore}
      CreateModal={CreateModal}
      EditModal={EditModal}
    />
  );
}
