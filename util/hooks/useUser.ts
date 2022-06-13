import { AxiosResponse } from "axios";
import useSWR from "swr";

import { baseInstance, Response } from "../../core/axios";

interface IsLogin {
  isLogin: boolean;
}

export default function useUser() {
  const { data, isValidating } = useSWR<AxiosResponse<Response<IsLogin>>>("/auth/check", baseInstance.get);

  if (data === undefined) return { isLogin: false, isLoginLoading: isValidating };

  return { isLogin: data?.data.data.isLogin, isLoginLoading: isValidating };
}
