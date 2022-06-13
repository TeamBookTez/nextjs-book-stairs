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
import { PeriNoteData, PreNoteData } from "../types/bookNote";
import { UserData } from "../types/login";
import { baseInstance, client, KAKAO } from "./axios";
import LocalStorage from "./localStorage";
export const searchBook = (params: KAKAOParams) => {
  return KAKAO.get("/v3/search/book", { params });
};

// headers에 들어갈 내용의 예시
// "Content-Type": "application/json",
// "Content-Type": "multipart/form-data"
// "Authorization": "토큰"

export const getData = (key: string, token?: string) => {
  return client(token).get(key);
};

export const patchUserWithdraw = (token: string, key: string) => {
  return client(token).patch(key);
};

export const saveBookNote = async (token: string, key: string, body: PreNoteData | PeriNoteData) => {
  const { data } = await client(token).patch(key, body);

  return data.data;
};

export const patchFormData = (token: string, key: string, patchBody: FormData) => {
  return client(token).patch(key, patchBody);
};

export const deleteData = (key: string, token: string | null) => {
  return client(token).delete(key);
};

const bookcaseFetcher = async (key: string): Promise<BookcaseInfo[]> => {
  const userToken = LocalStorage.getItem("booktez-token");

  if (!userToken) return [];

  const {
    data: {
      data: { books },
    },
  } = await getData(key, userToken);

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
