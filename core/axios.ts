import axios from "axios";

import LocalStorage from "./localStorage";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const KAKAO_API_KEY = process.env.NEXT_PUBLIC_KAKAO_API_KEY;

const baseInstance = axios.create({
  baseURL: `${BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

baseInstance.interceptors.request.use((config) => {
  const headers = {
    ...config.headers,
    Authorization: LocalStorage.getItem("booktez-token"),
  };

  return { ...config, headers };
});

baseInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    }
  },
);

const kakaoInstance = axios.create({
  baseURL: "https://dapi.kakao.com",
  headers: {
    Authorization: `KakaoAK ${KAKAO_API_KEY}`,
  },
});

export { baseInstance, kakaoInstance };
