import { useState } from "react";
import { useRecoilValue } from "recoil";

import { NoCards } from "../../components/bookcase";
import Cards from "../../components/bookcase/Cards";
import Navigation from "../../components/bookcase/Navigation";
import { Loading } from "../../components/common";
import { MainLayout } from "../../components/layout";
import { MainHeader } from "../../components/main";
import { useGetBookInfo } from "../../core/api/api";
import { navigatingBookInfoState } from "../../core/atom";
import { BookcasePathKey } from "../../types/bookcase";
import useUser from "../../util/hooks/useUser";

export default function Bookcase() {
  const navigatingBookInfo = useRecoilValue(navigatingBookInfoState);
  const { fromSt } = navigatingBookInfo;

  const { isLogin } = useUser();
  const [navIndex, setNavIndex] = useState<BookcasePathKey>(fromSt);
  const { bookcaseInfo, isLoading, isError } = useGetBookInfo(navIndex);

  const handleChangeNavIndex = (idx: BookcasePathKey) => {
    setNavIndex(idx);
  };

  const mainHeader = <MainHeader isLogin={isLogin} pageName="서재" />;

  return (
    <MainLayout header={mainHeader}>
      <Navigation navIndex={navIndex} onChangeNavIndex={handleChangeNavIndex} />
      {isLoading ? (
        <Loading />
      ) : !bookcaseInfo || isError || bookcaseInfo.length === 0 ? (
        <NoCards navIndex={navIndex} />
      ) : (
        <Cards navIndex={navIndex} bookcaseInfo={bookcaseInfo} />
      )}
    </MainLayout>
  );
}
