import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

import { Loading } from "../components/common";
import { MainLayout } from "../components/layout";
import { RecentBooks } from "../components/main";
import Banner from "../components/main/Banner";
import { isLoginState } from "../core/atom";
import useCheckLoginState from "../util/hooks/useCheckLoginState";

export default function Main() {
  const { isLogin, isLoginLoading } = useCheckLoginState();
  const setIsLogin = useSetRecoilState(isLoginState);

  useEffect(() => {
    setIsLogin(isLogin);
  }, [isLogin]);

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
