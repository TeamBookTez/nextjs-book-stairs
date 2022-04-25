import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

import { Loading } from "../components/common";
import { MainLayout } from "../components/layout";
import { RecentBooks } from "../components/main";
import Banner from "../components/main/Banner";
import useCheckLoginState from "../util/hooks/useCheckLoginState";
import { isLoginState } from "../util/lib/atom";

export default function main() {
  const { isLogin, isLoginLoading } = useCheckLoginState();
  const setIsLogin = useSetRecoilState(isLoginState);

  useEffect(() => {
    if (isLogin) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [isLogin]);

  return (
    <>
      {isLoginLoading ? (
        <Loading />
      ) : (
        <>
          <MainLayout pageName="메인">
            <Banner />
            <RecentBooks />
          </MainLayout>
        </>
      )}
    </>
  );
}
