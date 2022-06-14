import axios from "axios";

import LocalStorage from "./localStorage";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const KAKAO_API_KEY = process.env.NEXT_PUBLIC_KAKAO_API_KEY;

const getAccessToken = LocalStorage.getItem("booktez-token");

export const baseInstance = axios.create({
  baseURL: `${BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

baseInstance.interceptors.request.use((config) => ({
  ...config.headers,
  Authorization: getAccessToken,
}));

export const kakaoInstance = axios.create({
  baseURL: "https://dapi.kakao.com",
  headers: {
    Authorization: `KakaoAK ${KAKAO_API_KEY}`,
  },
});
