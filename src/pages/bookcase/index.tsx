import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import Cards from "../../components/bookcase/Cards";
import Navigation from "../../components/bookcase/Navigation";
import { Loading } from "../../components/common";
import { MainLayout } from "../../components/layout";
import { isLoginState, navigatingBookInfoState } from "../../core/atom";
import { BookcasePathKey } from "../../types/bookcase";
// import useCheckLoginState from "../../util/hooks/useCheckLoginState";

export default function Bookcase() {
  const navigatingBookInfo = useRecoilValue(navigatingBookInfoState);
  const { fromSt } = navigatingBookInfo;

  const [navIndex, setNavIndex] = useState<BookcasePathKey>(fromSt);
  // const { isLogin, isLoginLoading } = useCheckLoginState();
  const isLogin = useRecoilValue(isLoginState);
  const isLoginLoading = false;
  // 여기까지 임시 코드
  const setIsLogin = useSetRecoilState(isLoginState);

  const handleChangeNavIndex = (idx: BookcasePathKey) => {
    setNavIndex(idx);
  };

  useEffect(() => {
    setIsLogin(isLogin);
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
