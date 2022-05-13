import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { Loading } from "../components/common";
import { MainLayout } from "../components/layout";
import { RecentBooks } from "../components/main";
import Banner from "../components/main/Banner";
import { isLoginState } from "../core/atom";
// import useCheckLoginState from "../util/hooks/useCheckLoginState";

export default function Main() {
  // const { isLogin, isLoginLoading } = useCheckLoginState();
  const isLogin = useRecoilValue(isLoginState);
  const isLoginLoading = false;
  // 여기까지 임시 코드
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
