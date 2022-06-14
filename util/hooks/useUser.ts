/*
마지막 편집자: 22-06-14 soryeongk
변경사항 및 참고:
  - useUser는 로그인 여부를 판별하는 훅인데, 브라우저가 다시 포커싱될 때마다 revalidate를 하면 로딩뷰가 뜨기 때문에 어색하기만함
    그래서 options를 추가하여 막았는데, 일부 뷰에서 필요해진다면 옵션을 인자로 받아야할듯합니당
    
고민점:
  - 
*/
import { AxiosResponse } from "axios";
import useSWR from "swr";

import { baseInstance, Response } from "../../core/axios";

interface IsLogin {
  isLogin: boolean;
}

export default function useUser() {
  const options = { revalidateOnFocus: false };
  const { data, isValidating } = useSWR<AxiosResponse<Response<IsLogin>>>("/auth/check", baseInstance.get, options);

  if (data === undefined) return { isLogin: false, isLoginLoading: isValidating };

  return { isLogin: data?.data.data.isLogin, isLoginLoading: isValidating };
}
