import React, { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { Loading } from "../components/common";
import { MainLayout } from "../components/layout";
import { ServiceContent, UserContent, WithdrawContent } from "../components/myPage";
import { getData, patchFormData } from "../core/api";
import { isLoginState } from "../core/atom";
import LocalStorage from "../core/localStorage";
import { UserInfo } from "../types/myPage";
// import useCheckLoginState from "../util/hooks/useCheckLoginState";

export default function MyPage() {
  // const { isLogin, isLoginLoading } = useCheckLoginState();
  const isLogin = useRecoilValue(isLoginState);
  const isLoginLoading = false;
  // 여기까지 임시 코드
  const setIsLogin = useSetRecoilState(isLoginState);

  const [userInfo, setUserInfo] = useState<UserInfo>({
    email: "",
    img: "",
    nickname: "",
    reviewCount: 0,
  });
  const [isInfoLoading, setIsInfoLoading] = useState<boolean>(true);

  const userToken = LocalStorage.getItem("booktez-token");

  useEffect(() => {
    setIsLogin(isLogin);
  }, [isLogin]);

  useEffect(() => {
    getInfo("/user/myInfo", userToken);
  }, []);

  const getInfo = async (key: string, token: string) => {
    try {
      const { data } = await getData(key, token);

      if (data.success) {
        setUserInfo(data.data);
      } else {
        setIsLogin(false);
      }
    } catch (err) {
      setIsLogin(false);
    } finally {
      setIsInfoLoading(false);
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isLogin === false) return;
    if (e.target.files === null) return;

    const imgFile = e.target.files[0];
    const formData = new FormData();

    formData.append("img", imgFile);

    const { data } = await patchFormData(userToken, "/user/img", formData);

    if (data.success) {
      getInfo("/user/myInfo", userToken);
    }
  };

  return (
    <MainLayout pageName="마이페이지">
      {isLoginLoading && isInfoLoading ? (
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
