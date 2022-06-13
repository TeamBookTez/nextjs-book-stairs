/*
마지막 편집자: 22-06-13 soryeongk
변경사항 및 참고:
  - 
    
고민점:
  - revalidate option으로 focusing할 때마다 업데이트하는 것은 막을까 싶습니다. 마이페이지의 내용이 자주 업데이트되는 것은 아니라서..! 요청이 계속 오가는 것이 마음에 걸립니다.
*/
import useSWR from "swr";

import { baseInstance, Response } from "../../core/axios";
import { UserInfo } from "../../types/myPage";

const userInfoFetcher = async (key: string): Promise<Response<UserInfo>> => {
  const { data } = await baseInstance.get(key);

  return data;
};

export default function useUserInfo() {
  const { data, error } = useSWR("/user/myInfo", userInfoFetcher);

  return {
    userInfo: data?.data,
    isLoading: !error && !data?.data,
    isError: error,
  };
}