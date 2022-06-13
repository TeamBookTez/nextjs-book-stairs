import axios from "axios";

import LocalStorage from "./localStorage";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const KAKAO_API_KEY = process.env.NEXT_PUBLIC_KAKAO_API_KEY;

const getAccessToken = LocalStorage.getItem("booktez-token");

export interface Response<T> {
  data: T;
  message: string;
  status: number;
  success: boolean;
}

export const baseInstance = axios.create({
  baseURL: `${BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
    Authorization: getAccessToken,
  },
});

export const kakaoInstance = axios.create({
  baseURL: "https://dapi.kakao.com",
  headers: {
    Authorization: `KakaoAK ${KAKAO_API_KEY}`,
  },
});

export const KAKAO = axios.create({
  baseURL: "https://dapi.kakao.com",
  headers: {
    Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_API_KEY}`,
  },
});

export const client = (token?: string | null) => {
  let headers;

  if (token) {
    headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
  } else {
    headers = {
      "Content-Type": "application/json",
    };
  }

  return axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    headers,
  });
};
