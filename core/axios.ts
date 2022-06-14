import axios from "axios";

import LocalStorage from "./localStorage";

export interface AxiosResponse {
  message: string;
  status: number;
  success: boolean;
}
export interface Response<T> extends AxiosResponse {
  data: T;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const KAKAO_API_KEY = process.env.NEXT_PUBLIC_KAKAO_API_KEY;

const getAccessToken = LocalStorage.getItem("booktez-token");

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
