/*
마지막 편집자: 22-06-20 soryeongk
변경사항 및 참고:
  - 현재 페이지 이동마다 제대로 체킹이 되지 ㅣ않습니다.. 캐싱과 revalidate 부분의 문제인 것 같은데, 조금 더 볼게유
  - 현재는 새로고침하면 적용되는 상태!
    
고민점:
  - revalidate에 대해서는 조금 더 고민해보는 것으로!
    --> 잠깐 꺼놓고 하겠습ㄴ디ㅏ ㅎㅎ
*/
import useSWR from "swr";

import { baseInstance } from "../../core/api/axios";
import { Response } from "../../types";

interface IsLogin {
  isLogin: boolean;
}

export default function useUser() {
  const { data, error } = useSWR<Response<IsLogin>>("/auth/check", baseInstance.get, {
    revalidateOnFocus: false,
  });

  if (data === undefined) return { isLogin: false, isLoginLoading: !error && !data };

  return { isLogin: data.data.isLogin, isLoginLoading: !error && !data };
}
