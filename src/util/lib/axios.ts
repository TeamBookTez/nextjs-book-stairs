import axios from "axios";

export const KAKAO = axios.create({
  baseURL: "https://dapi.kakao.com",
  headers: {
    Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_API_KEY}`,
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
    baseURL: `${process.env.REACT_APP_BASE_URL}`,
    headers,
  });
};
