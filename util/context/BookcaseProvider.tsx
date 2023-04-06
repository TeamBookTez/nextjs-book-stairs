import { createContext, ReactNode, useMemo, useState } from "react";
import { useRecoilValue } from "recoil";

import { navigatingBookInfoState } from "../../core/atom";
import { BookcasePathKey, bookcasePathKey } from "../../types/bookcase";

type BookcaseNavigationContextType = {
  navIndex: { key: BookcasePathKey; value: number };
  changeNavIndex?: (index: BookcasePathKey) => void;
};

export const BookcaseNavigationContext = createContext<BookcaseNavigationContextType>({
  navIndex: { key: bookcasePathKey.all, value: 0 },
});

export const BookcaseNavigationProvider = ({ children }: { children: ReactNode }) => {
  const navigatingBookInfo = useRecoilValue(navigatingBookInfoState);
  const { fromSt } = navigatingBookInfo;
  const [navIndex, setNavIndex] = useState<BookcasePathKey>(fromSt);

  const changeNavIndex = (index: BookcasePathKey) => {
    setNavIndex(index);
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
