
import { ResourceTablePage } from '@/components/resource/ResourceTablePage';
import { resourceMetaMap } from '@/generated/resources';
import { tokenPackageApi } from '@/api/token-package';
import { useTokenPackageStore } from '@/stores/token-packageStore';
import CreateModal from './CreateModal';
import EditModal from './EditModal';

const meta = resourceMetaMap["token-package"];

export default function TokenPackageListPage() {
  return (
    <ResourceTablePage
      api={tokenPackageApi}
      meta={meta}
      useStore={useTokenPackageStore}
      CreateModal={CreateModal}
      EditModal={EditModal}
    />
  );
}
