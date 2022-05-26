import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useRecoilState } from "recoil";
import { useSWRConfig } from "swr";

import { isLoginState } from "../../core/atom";
import LocalStorage from "../../core/localStorage";
import { UserInfo } from "../../types/myPage";
import { DefaultButton } from "../common/styled/Button";
import { TopBanner } from ".";

interface UserContentProps {
  userInfo: UserInfo;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function UserContent(props: UserContentProps) {
  const router = useRouter();
  // const navigate = useNavigate();
  const { userInfo, onImageChange } = props;

  const [isLogin, setIsLogin] = useRecoilState(isLoginState);
  const { mutate } = useSWRConfig();

  const handleLogout = () => {
    LocalStorage.removeItem("booktez-token");
    LocalStorage.removeItem("booktez-nickname");
    LocalStorage.removeItem("booktez-email");
    mutate("/book");
    setIsLogin(false);
    router.push("/main");
  };

  const logInNOutBtn = isLogin ? (
    <StLogoutBtn onClick={handleLogout} id="btn_logout">
      로그아웃
    </StLogoutBtn>
  ) : (
    <Link href="/login" passHref>
      <StLoginButton type="button">로그인</StLoginButton>
    </Link>
  );

  return (
    <StWrapper>
      <TopBanner userInfo={userInfo} onImageChange={onImageChange} />
      {logInNOutBtn}
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
