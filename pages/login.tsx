/*
마지막 편집자: 22-06-30 soryeongk
변경사항 및 참고:
  - 이미 로그인한 유저에게 로그아웃이나 하셈~ 하고 10초 뒤에 리디렉션,,뭐 이런거 어때.. 나중에 ㅎ
    
고민점:
  - 
*/
import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { useState } from "react";

import { Loading } from "../components/common";
import { LoginForm, LoginNavSection } from "../components/login";
import useUser from "../util/hooks/useUser";

export default function Login() {
  const [isAniTime, setIsAniTime] = useState<boolean>(false);

  const { isLogin, isLoginLoading } = useUser();

  const handleAni = () => {
    setIsAniTime(true);
  };

  if (isLogin) {
    return <div>이미 로그인 하셨습니다~</div>;
  } else if (isLoginLoading) {
    return <Loading />;
  } else
    return (
      <StPageWrapper>
        <LoginNavSection isAniTime={isAniTime} onAniChange={handleAni} />
        <StMainWrapper isAniTime={isAniTime}>
          <StArticle>
            <StH2>이미 서재가 있으신가요?</StH2>
            <StH3>
              북스테어즈에 로그인하고
              <br />
              서재에서 독서를 이어가세요.
            </StH3>
            <LoginForm />
            <StContact href="mailto:bookstairs.official@gmail.com">이메일/비밀번호를 잊어버리셨다면?</StContact>
          </StArticle>
        </StMainWrapper>
      </StPageWrapper>
    );
}

const StPageWrapper = styled.div`
  height: 100vh;
  display: flex;
`;

const opentoright = keyframes`
  0% {
    opacity: 1;
    transform: translateX(0);
  }
  100% {
    opacity: 0;
    transform: translateX(20em);
  }

`;

const StMainWrapper = styled.main<{ isAniTime: boolean }>`
  flex: 1;

  display: flex;
  justify-content: center;
  align-items: center;

  ${({ isAniTime }) =>
    isAniTime &&
    css`
      animation: ${opentoright} 1s ease-in-out;
    `};
`;

const StArticle = styled.article`
  width: 46.4rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StH2 = styled.h2`
  margin-bottom: 1.8rem;

  text-align: center;

  ${({ theme }) => theme.fonts.header0}
  color: ${({ theme }) => theme.colors.gray100};
`;

const StH3 = styled.h3`
  margin-bottom: 5.2rem;

  text-align: center;

  ${({ theme }) => theme.fonts.body2}
  color: ${({ theme }) => theme.colors.gray300};
`;

const StContact = styled.a`
  margin-top: 1.7rem;

  text-align: center;

  ${({ theme }) => theme.fonts.body6}
  color: ${({ theme }) => theme.colors.gray100};

  &:hover {
    cursor: pointer;
    text-decoration-line: underline;
  }
`;
