import React, { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useSWRConfig } from "swr";

import { Loading } from "../components/common";
import { MainLayout } from "../components/layout";
import { ServiceContent, UserContent, WithdrawContent } from "../components/myPage";
import { getData, patchFormData } from "../core/api";
import { isLoginState } from "../core/atom";
import { baseInstance } from "../core/axios";
import LocalStorage from "../core/localStorage";
import { UserInfo } from "../types/myPage";
import useUser from "../util/hooks/useUser";
import useUserInfo from "../util/hooks/useUserInfo";
// import useCheckLoginState from "../util/hooks/useCheckLoginState";

export default function MyPage() {
  const isLogin = useUser();
  const { userInfo, isLoading } = useUserInfo();

  // const [userInfo, setUserInfo] = useState<UserInfo>({
  //   email: "",
  //   img: "",
  //   nickname: "",
  //   reviewCount: 0,
  // });

  const { mutate } = useSWRConfig();

  const patchProfileImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isLogin === false) return;
    if (e.target.files === null) return;

    const imgFile = e.target.files[0];
    const formData = new FormData();

    formData.append("img", imgFile);

    const { data } = await baseInstance.patch("/user/img", formData);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await patchProfileImage(e);
    mutate("/user/myInfo");
  };

  return (
    <MainLayout pageName="마이페이지">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <UserContent userInfo={userInfo} onImageChange={handleImageChange} />
          <ServiceContent userInfo={userInfo}>{isLogin && <WithdrawContent />}</ServiceContent>
        </>
      )}
    </MainLayout>
  );
}
