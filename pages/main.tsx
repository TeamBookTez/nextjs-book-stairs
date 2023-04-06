import { Loading } from "../components/common";
import { MainLayout } from "../components/layout";
import { MainHeader, RecentBooks } from "../components/main";
import Banner from "../components/main/Banner";
import useUser from "../util/hooks/useUser";

export default function Main() {
  const { isLogin, isLoginLoading } = useUser();
  const mainHeader = <MainHeader isLogin={isLogin} pageName="메인" />;

  return (
    <MainLayout header={mainHeader}>
      {isLoginLoading ? (
        <Loading />
      ) : (
        <>
          <Banner />
          <RecentBooks />
        </>
      )}
    </MainLayout>
  );
}
