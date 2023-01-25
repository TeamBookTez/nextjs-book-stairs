import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { useRecoilValue } from "recoil";
import useSWR from "swr";

import { baseInstance } from "../../core/api/axios";
import { navigatingBookInfoState } from "../../core/atom/index";
import { Response } from "../../types";
import { BookcaseInfo, BookcasePathKey, bookcasePathKey } from "../../types/bookcase";

type BookcaseNavigationContextType = {
  navIndex: { key: BookcasePathKey; value: number };
  changeNavIndex?: (idx: BookcasePathKey) => void;
};

export const BookcaseNavigationContext = createContext<BookcaseNavigationContextType>({
  navIndex: { key: bookcasePathKey.all, value: 0 },
});

export const BookcaseNavigationProvider = ({ children }: { children: ReactNode }) => {
  const navigatingBookInfo = useRecoilValue(navigatingBookInfoState);
  const { fromSt } = navigatingBookInfo;
  const [navIndex, setNavIndex] = useState<BookcasePathKey>(fromSt);

  const changeNavIndex = (idx: BookcasePathKey) => {
    setNavIndex(idx);
  };

  const navUnderbarIndex = useMemo(() => {
    switch (navIndex) {
      case bookcasePathKey.pre:
        return 1;

      case bookcasePathKey.peri:
        return 2;

      case bookcasePathKey.post:
        return 3;

      default:
        return 0;
    }
  }, [navIndex]);

  const contextDefaultValue: BookcaseNavigationContextType = {
    navIndex: {
      key: navIndex,
      value: navUnderbarIndex,
    },
    changeNavIndex,
  };

  return (
    <BookcaseNavigationContext.Provider value={contextDefaultValue}>{children}</BookcaseNavigationContext.Provider>
  );
};

const useBookcase = () => {
  const { navIndex, changeNavIndex } = useContext(BookcaseNavigationContext);

  const urlKey = navIndex.key === "/main" ? "/book" : navIndex.key;
  const { data, error } = useSWR<Response<{ books: BookcaseInfo[] }>>(urlKey, baseInstance.get);

  return {
    navIndex,
    changeNavIndex,
    bookcaseInfo: data?.data?.books,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useBookcase;
