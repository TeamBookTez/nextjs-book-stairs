import React from "react";
import { useSWRConfig } from "swr";

import { Loading } from "../components/common";
import { MainLayout } from "../components/layout";
import { MainHeader } from "../components/main";
import { ServiceContent, UserContent, WithdrawContent } from "../components/myPage";
import { baseInstance } from "../core/axios";
import useUserInfo from "../util/hooks/useUserInfo";

export default function MyPage() {
  const { userInfo, isLoading, isError } = useUserInfo();
  const isLogin = !isError && userInfo !== undefined;

  const { mutate } = useSWRConfig();

  const patchProfileImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isLogin === false) return;
    if (e.target.files === null) return;

    const imgFile = e.target.files[0];
    const formData = new FormData();

    formData.append("img", imgFile);

    await baseInstance.patch("/user/img", formData);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await patchProfileImage(e);
    mutate("/user/myInfo");
  };

  const mainHeader = <MainHeader isLogin={isLogin} pageName="마이페이지" />;

  return (
    <MainLayout header={mainHeader}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <UserContent isLogin={isLogin} userInfo={userInfo} onImageChange={handleImageChange} />
          <ServiceContent isLogin={isLogin} userInfo={userInfo}>
            {isLogin && <WithdrawContent />}
          </ServiceContent>
        </>
      )}
    </MainLayout>
  );
}
