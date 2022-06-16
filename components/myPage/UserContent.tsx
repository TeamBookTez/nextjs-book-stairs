import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useSWRConfig } from "swr";

import LocalStorage from "../../core/localStorage";
import { UserInfo } from "../../types/myPage";
import { DefaultButton } from "../common/styled/Button";
import { TopBanner } from ".";

interface UserContentProps {
  userInfo: UserInfo | undefined;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function UserContent(props: UserContentProps) {
  const { userInfo, onImageChange } = props;
  const isLogin = userInfo !== undefined;

  const router = useRouter();
  const { mutate } = useSWRConfig();

  const handleLogout = () => {
    LocalStorage.clearUserSession();

    mutate("/auth/check");

    router.push("/main");
  };

  const logoutBtn = (
    <StLogoutBtn onClick={handleLogout} id="btn_logout">
      로그아웃
    </StLogoutBtn>
  );

  const loginBtn = (
    <Link href="/login" passHref>
      <StLoginButton type="button">로그인</StLoginButton>
    </Link>
  );

  return (
    <StWrapper>
      <TopBanner userInfo={userInfo} onImageChange={onImageChange} />
      {isLogin ? logoutBtn : loginBtn}
    </StWrapper>
  );
}

const StWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  width: 100%;
  height: 29.4rem;

  margin-bottom: 10rem;
  padding: 0 4rem;
`;

const StLoginButton = styled(DefaultButton)`
  width: 13.5rem;
  height: 4.6rem;

  border-radius: 0.8rem;

  ${({ theme }) => theme.fonts.button};
`;

const StLogoutBtn = styled(StLoginButton)`
  background-color: ${({ theme }) => theme.colors.gray300};
`;
