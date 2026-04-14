
import { ResourceTablePage } from '@/components/resource/ResourceTablePage';
import { resourceMetaMap } from '@/generated/resources';
import { appVersionApi } from '@/api/app-version';
import { useAppVersionStore } from '@/stores/app-versionStore';
import CreateModal from './CreateModal';
import EditModal from './EditModal';

const meta = resourceMetaMap["app-version"];

export default function AppVersionListPage() {
  return (
    <ResourceTablePage
      api={appVersionApi}
      meta={meta}
      useStore={useAppVersionStore}
      CreateModal={CreateModal}
      EditModal={EditModal}
    />
  );
}
