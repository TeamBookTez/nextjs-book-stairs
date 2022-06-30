/*
마지막 편집자: 22-04-28 joohaem
변경사항 및 참고:
  - 후에 관리가 불편하다면, 파일을 폴더로 묶어 page 별로 나누는 것 고려해주십시오!
    
고민점:
  - patchBookNote return type 을 지정할까나 ~ 싶습니다
*/
import axios from "axios";
import useSWR from "swr";

import { KAKAOParams, Response, ResponseDto } from "../types";
import { BookcaseInfo } from "../types/bookcase";
import { PeriNoteData, PreNoteData } from "../types/bookNote";
import { IsValid, UseFormDataType } from "../types/signup";
import { baseInstance, kakaoInstance } from "./axios";
import LocalStorage from "./localStorage";

export const searchBook = (params: KAKAOParams) => {
  return kakaoInstance.get("/v3/search/book", { params });
};

export const getData = (key: string) => {
  return baseInstance.get(key);
};

export const patchUserWithdraw = (key: string) => {
  return baseInstance.patch(key);
};

export const patchBookNote = async (key: string, body: PreNoteData | PeriNoteData) => {
  const { data } = await baseInstance.patch(key, body);

  return data;
};

export const deleteData = (key: string) => {
  return baseInstance.delete(key);
};

export function useGetBookInfo(key: string) {
  const urlKey = key === "/main" ? "/book" : key;
  const { data, error } = useSWR<Response<{ books: BookcaseInfo[] }>>(urlKey, baseInstance.get);

  return {
    bookcaseInfo: data?.data?.books,
    isLoading: !error && !data,
    isError: error,
  };
}

export const signup = async (userData: UseFormDataType, password: string) => {
  try {
    const res = await baseInstance.post("/auth/signup", { ...userData, password });

    if (res.status === 201) {
      const res = await login({ email: userData.email, password });

      return { isLogin: res?.isLogin, errorMessage: "" };
    }
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const errorData = err.response?.data as ResponseDto;

      return { isLogin: false, errorMessage: errorData.message };
    }
  }
};

export const login = async (loginFormData: UseFormDataType) => {
  try {
    const { data } = await baseInstance.post("/auth/login", loginFormData);

    LocalStorage.setUserSession(data.token, data.nickname, data.email);

    return { isLogin: true, errorField: "", errorMessage: "" };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const errorData = err.response?.data as ResponseDto;
      const errorField = errorData.status === 404 ? "email" : "password";

      return { isLogin: false, errorField, errorMessage: errorData.message };
    }
  }
};

export const checkIsValid = async (index: string, key: string) => {
  const urlPath = `/auth/${index}?${index}=${key}`;

  const { data, message }: Response<IsValid> = await baseInstance.get(urlPath);

  return { isValid: data.isValid, message };
};
