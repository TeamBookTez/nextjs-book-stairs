/*
마지막 편집자: 22-04-28 joohaem
변경사항 및 참고:
  - 후에 관리가 불편하다면, 파일을 폴더로 묶어 page 별로 나누는 것 고려해주십시오!
    
고민점:
  - 
*/
import { UseFormSetError } from "react-hook-form";
import useSWR from "swr";

import { KAKAOParams } from "../types";
import { BookcaseInfo } from "../types/bookcase";
import { UserData } from "../types/login";
import { baseInstance, kakaoInstance } from "./axios";
import LocalStorage from "./localStorage";

export const searchBook = (params: KAKAOParams) => {
  return kakaoInstance.get("/v3/search/book", { params });
};

export const getData = (key: string) => {
  return baseInstance.get(key);
};

export const patchUserWithdraw = (token: string, key: string) => {
  return baseInstance.patch(key);
};

export const deleteData = (key: string) => {
  return baseInstance.delete(key);
};

const bookcaseFetcher = async (key: string): Promise<BookcaseInfo[]> => {
  const {
    data: {
      data: { books },
    },
  } = await getData(key);

  return books;
};

export function useGetBookInfo(key: string) {
  const { data, error } = useSWR(key, bookcaseFetcher);

  return {
    bookcaseInfo: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export const login = async (loginFormData: UserData, setError: UseFormSetError<UserData>) => {
  try {
    const {
      data: { data },
    } = await baseInstance.post("/auth/login", loginFormData);

    LocalStorage.setItem("booktez-token", data.token);
    LocalStorage.setItem("booktez-nickname", data.nickname);
    LocalStorage.setItem("booktez-email", data.email);
  } catch (err) {
    // if (axios.isAxiosError(err)) {
    //   const errorData = err.response?.data;
    //   const errorField = errorData.status === 404 ? "email" : "password";
    //   setError(errorField, {
    //     type: "server",
    //     message: errorData.message,
    //   });
    // }
  }

  return null;
};
