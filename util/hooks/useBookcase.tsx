import { useContext } from "react";
import useSWR from "swr";

import { baseInstance } from "../../core/api/axios";
import { Response } from "../../types";
import { BookcaseInfo } from "../../types/bookcase";
import { BookcaseNavigationContext } from "../context/BookcaseProvider";

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
