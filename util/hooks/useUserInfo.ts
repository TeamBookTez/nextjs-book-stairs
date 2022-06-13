import useSWR from "swr";
import { baseInstance } from "../../core/axios";

const userInfoFetcher = async (key: string) => {
  const { data } = await baseInstance.get(key);

  return data;
};

export default function useUserInfo() {
  const { data, error } = useSWR("/user/myInfo", userInfoFetcher);

  return {
    userInfo: data,
    isLoading: !error && !data,
    isError: error,
  }
}