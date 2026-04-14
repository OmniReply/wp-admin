
import { ResourceTablePage } from '@/components/resource/ResourceTablePage';
import { resourceMetaMap } from '@/generated/resources';
import { loginFailApi } from '@/api/login-fail';
import { useLoginFailStore } from '@/stores/login-failStore';



const meta = resourceMetaMap["login-fail"];

export default function LoginFailListPage() {
  return (
    <ResourceTablePage
      api={loginFailApi}
      meta={meta}
      useStore={useLoginFailStore}


    />
  );
}
