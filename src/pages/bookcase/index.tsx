import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import Cards from "../../components/bookcase/Cards";
import Navigation from "../../components/bookcase/Navigation";
import { Loading } from "../../components/common";
import { MainLayout } from "../../components/layout";
import { isLoginState, navigatingBookInfoState } from "../../core/atom";
import useCheckLoginState from "../../util/hooks/useCheckLoginState";

export default function Bookcase() {
  const navigatingBookInfo = useRecoilValue(navigatingBookInfoState);
  const { fromSt } = navigatingBookInfo;

  const [navIndex, setNavIndex] = useState<number>(fromSt);
  const { isLogin, isLoginLoading } = useCheckLoginState();
  const setIsLogin = useSetRecoilState(isLoginState);

  const handleChangeNavIndex = (idx: number) => {
    setNavIndex(idx);
  };

  useEffect(() => {
    if (isLogin) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [isLogin]);

  return (
    <MainLayout pageName="서재">
      {isLoginLoading ? (
        <Loading />
      ) : (
        <>
          <Navigation navIndex={navIndex} onChangeNavIndex={handleChangeNavIndex} />
          <Cards navIndex={navIndex} />
        </>
      )}
    </MainLayout>
  );
}
