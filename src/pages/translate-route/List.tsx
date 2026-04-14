
import { ResourceTablePage } from '@/components/resource/ResourceTablePage';
import { resourceMetaMap } from '@/generated/resources';
import { translateRouteApi } from '@/api/translate-route';
import { useTranslateRouteStore } from '@/stores/translate-routeStore';
import CreateModal from './CreateModal';
import EditModal from './EditModal';

const meta = resourceMetaMap["translate-route"];

export default function TranslateRouteListPage() {
  return (
    <ResourceTablePage
      api={translateRouteApi}
      meta={meta}
      useStore={useTranslateRouteStore}
      CreateModal={CreateModal}
      EditModal={EditModal}
    />
  );
}
