
import { ResourceTablePage } from '@/components/resource/ResourceTablePage';
import { resourceMetaMap } from '@/generated/resources';
import { loginLogPageApi } from '@/api/login-log-page';
import { useLoginLogPageStore } from '@/stores/login-log-pageStore';



const meta = resourceMetaMap["login-log-page"];

export default function LoginLogPageListPage() {
  return (
    <ResourceTablePage
      api={loginLogPageApi}
      meta={meta}
      useStore={useLoginLogPageStore}


    />
  );
}
