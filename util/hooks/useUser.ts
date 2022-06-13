import { AxiosResponse } from "axios";
import useSWR from "swr";
import { baseInstance, Response } from "../../core/axios";

interface IsLogin {
  isLogin: boolean;
}

export default function useUser() {
  const { data } = useSWR<AxiosResponse<Response<IsLogin>>>("/auth/check", baseInstance.get);
  
  if (data === undefined) return false;
  
  return data?.data.data.isLogin;
};