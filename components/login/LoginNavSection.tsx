import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import Image from "next/image";
import { useRouter } from "next/router";

import { ImgLogin } from "../../public/assets/images";
import theme from "../../styles/theme";
import { NavHeader } from "../common";
import { DefaultButton } from "../common/styled/Button";

interface SignupNavProps {
  isAniTime: boolean;
  onAniChange: () => void;
}

export default function SignupNav(props: SignupNavProps) {
  const { isAniTime, onAniChange } = props;

  const router = useRouter();

  const handleGoSignupBtn = () => {
    onAniChange();
    setTimeout(() => router.push("/signup"), 1000);
  };

  return (
    <StSection isAniTime={isAniTime}>
      <NavHeader logoColor={theme.colors.white} />
      <StArticle>
        <StH2>
          나만의 서재를
          <br />
          만들어볼까요?
        </StH2>
        <StH3>
          지금 북스테어즈에 회원가입하고
          <br />
          서재에 북노트를 쌓아보세요!
        </StH3>
        <StImage src={ImgLogin} alt="북테즈 이미지" width={259} height={185} />
        <StSignupBtn type="button" onClick={handleGoSignupBtn} className="btn_signup">
          회원가입
        </StSignupBtn>
      </StArticle>
    </StSection>
  );
}

const opentoleft = keyframes`
    0% {
      opacity: 1;
      transform: translateX(0);
    }
    100% {
      opacity: 0;
      transform: translateX(-20em);
    }
`;

const StSection = styled.section<{ isAniTime: boolean }>`
  ${({ isAniTime }) =>
    isAniTime &&
    css`
      animation: ${opentoleft} 1s ease-in-out;
    `};

  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;

  min-width: 48rem;

  background-color: ${({ theme }) => theme.colors.gray200};
  border-radius: 0 2rem 2rem 0;
`;

const StArticle = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StImage = styled(Image)`
  margin-bottom: 5.3rem;
`;

const StH2 = styled.h2`
  margin-bottom: 1.6rem;

  ${({ theme }) => theme.fonts.header0}
  text-align: center;
  color: ${({ theme }) => theme.colors.white200};
`;

const StH3 = styled.h3`
  margin-bottom: 5.2rem;

  text-align: center;

  ${({ theme }) => theme.fonts.body2}
  color: ${({ theme }) => theme.colors.white300};
`;

const StSignupBtn = styled(DefaultButton)`
  width: 32.5rem;
  height: 5.6rem;

  border-radius: 1rem;

  ${({ theme }) => theme.fonts.button}
`;
