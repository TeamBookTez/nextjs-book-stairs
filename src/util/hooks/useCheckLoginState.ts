import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import { getData } from "../api";
import { isLoginState } from "../lib/atom";

export default function useCheckLoginState() {
  const [isLoginLoading, setIsLoginLoading] = useState<boolean>(true);
  const [isLogin, setIsLogin] = useRecoilState<boolean>(isLoginState);

  let userToken = "";

  if (typeof window !== "undefined") {
    userToken = localStorage.getItem("booktez-token") as string;
  }
  const API_PATH = "/auth/check";

  useEffect(() => {
    checkLoginState();
  }, []);

  const checkLoginState = async () => {
    try {
      const { data } = await getData(API_PATH, userToken);
      const status = data.status;

      if (status === 200) {
        data.data.isLogin === true ? setIsLogin(true) : setIsLogin(false);
      }
    } catch (err) {
      setIsLogin(false);
    } finally {
      setIsLoginLoading(false);
    }
  };

  return { isLogin, isLoginLoading };
}
