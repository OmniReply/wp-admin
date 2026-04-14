
import { ResourceTablePage } from '@/components/resource/ResourceTablePage';
import { resourceMetaMap } from '@/generated/resources';
import { userApi } from '@/api/user';
import { useUserStore } from '@/stores/userStore';



const meta = resourceMetaMap["user"];

export default function UserListPage() {
  return (
    <ResourceTablePage
      api={userApi}
      meta={meta}
      useStore={useUserStore}


    />
  );
}
