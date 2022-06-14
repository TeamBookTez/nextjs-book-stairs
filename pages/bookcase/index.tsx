import { useState } from "react";
import { useRecoilValue } from "recoil";

import Cards from "../../components/bookcase/Cards";
import Navigation from "../../components/bookcase/Navigation";
import { Loading } from "../../components/common";
import { MainLayout } from "../../components/layout";
import { MainHeader } from "../../components/main";
import { navigatingBookInfoState } from "../../core/atom";
import { BookcasePathKey } from "../../types/bookcase";
import useUser from "../../util/hooks/useUser";

export default function Bookcase() {
  const navigatingBookInfo = useRecoilValue(navigatingBookInfoState);
  const { fromSt } = navigatingBookInfo;

  const { isLogin, isLoginLoading } = useUser();
  const [navIndex, setNavIndex] = useState<BookcasePathKey>(fromSt);

  const handleChangeNavIndex = (idx: BookcasePathKey) => {
    setNavIndex(idx);
  };

  const mainHeader = <MainHeader isLogin={isLogin} pageName="서재" />;

  return (
    <MainLayout header={mainHeader}>
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
