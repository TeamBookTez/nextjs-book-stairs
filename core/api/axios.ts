import axios from "axios";

import LocalStorage from "../localStorage";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const KAKAO_API_KEY = process.env.NEXT_PUBLIC_KAKAO_API_KEY;

const baseInstance = axios.create({
  baseURL: `${BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

// client side base instance (default)
// 로컬스토리지 접근이 가능하고 token이 필요한 api 호출에서 사용
baseInstance.interceptors.request.use((config) => {
  const headers = {
    ...config.headers,
    Authorization: LocalStorage.getItem("booktez-token"),
  };

  return { ...config, headers };
});

baseInstance.interceptors.response.use((response) => {
  return response.data;
});

const kakaoInstance = axios.create({
  baseURL: "https://dapi.kakao.com",
  headers: {
    Authorization: `KakaoAK ${KAKAO_API_KEY}`,
  },
});

// server side base instance: SSR, SSG 등에서 사용됨
// 서버사이드의 경우 브라우저에 접근할 수 없으므로 localStorage 안됨 - 토큰 불필요한 api만 사용 가능
const serverSideBaseInstance = axios.create({
  baseURL: `${BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

export { baseInstance, kakaoInstance, serverSideBaseInstance };
