/*
마지막 편집자: 22-06-16 soryeongk
변경사항 및 참고:
  - 지난 번 SWR 정리한 것을 보면서 isValidating이나 error를 받는 것이 코드 짤때는 편하지만 불필요한 렌더링을 야기한다는 것을 떠올렸습니다!
    그래서 isValidating을 받기 보다는 공식문서에서 자주 사용하는대로 data, error만으로 로딩을 판변하려 합니다 :) 안그럼 3~4번은 기본 렌더링되어서,,
    데이터 변경이 없으면 리소스 낭비가 그리 크지 않은데, 그래도 신경쓰여서! 뜰람뜰
    (참고: https://www.notion.so/SWR-9bf677a0acc74b4a8f8d0964b2213975#1b0d8ba3e4a149c587c3347cfa68f755)
    
고민점:
  - revalidate option으로 focusing할 때마다 업데이트하는 것은 막을까 싶습니다. 마이페이지의 내용이 자주 업데이트되는 것은 아니라서..! 요청이 계속 오가는 것이 마음에 걸립니다.
*/
import useSWR from "swr";

import { baseInstance } from "../../core/axios";
import { Response } from "../../types";

interface MyInfo {
  email: string;
  img: string;
  nickname: string;
  reviewCount: number;
}

export default function useUserInfo() {
  const { data, error } = useSWR<Response<MyInfo>>("/user/myInfo", baseInstance.get, {
    errorRetryCount: 3,
  });

  return {
    userInfo: data?.data,
    isLoading: !error && !data,
    isError: error,
  };
}
