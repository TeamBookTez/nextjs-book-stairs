import { Loading } from "../components/common";
import { MainLayout } from "../components/layout";
import { RecentBooks } from "../components/main";
import Banner from "../components/main/Banner";
import useUser from "../util/hooks/useUser";

export default function Main() {
  const { isLoginLoading } = useUser();

  return (
    <MainLayout pageName="메인">
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
