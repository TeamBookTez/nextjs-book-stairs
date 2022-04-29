/*
마지막 편집자: 22-04-29 q-bit-junior
변경사항 및 참고:
  - background-image를 넣는 과정에서 이전처럼 url(${이미지컴포넌트}) 방식이 되지 않아
  구글링을 통해서 props로 넘겨주는 방법을 택했습니다. 그러다 보니
  props를 지정해줘야 했는데 ImgHTMLAttributes<string> 으로 지정해줬는데
  오류가 안뜨긴 합니다만 맞는지 확인이 필요할 것 같아요~!
    
고민점:
  - 
*/
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { ImgHTMLAttributes } from "react";
import { useMediaQuery } from "react-responsive";

import { ImgLandingMobileBanner, ImgLandingTabletBanner } from "../../../public/assets/images";
import { DefaultButton } from "../common/styled/Button";

interface StWrapperProps {
  landingImg: ImgHTMLAttributes<string>;
  mobileLandingImg: ImgHTMLAttributes<string>;
}

export default function MobileLandingOne() {
  const router = useRouter();

  const isMobileWithButtonScreen = useMediaQuery({
    query: "(min-width: 1200px)",
  });

  return (
    <StWrapper landingImg={ImgLandingMobileBanner} mobileLandingImg={ImgLandingTabletBanner}>
      <StTitle>
        진짜 독서가들을 위한
        <br />
        독서법을 만들어 갑니다
      </StTitle>
      {isMobileWithButtonScreen ? (
        <StButton type="button" onClick={() => router.push("/main")}>
          북스테어즈 시작
        </StButton>
      ) : (
        <StComment>북스테어즈는 PC에서 이용해 주세요.</StComment>
      )}
    </StWrapper>
  );
}

const StWrapper = styled.section<StWrapperProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 44.3rem;

  margin-top: 6rem;

  background-image: url(${(props) => props.landingImg.src});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  @media (min-width: 641px) {
    background-image: url(${(props) => props.mobileLandingImg.src});
    height: 45.1rem;
  }
`;

const StTitle = styled.h1`
  margin-bottom: 1.4rem;

  text-align: center;

  ${({ theme }) => theme.fonts.h1};
  color: ${({ theme }) => theme.colors.white};
`;

const StComment = styled.p`
  ${({ theme }) => theme.fonts.h6};
  color: ${({ theme }) => theme.colors.white};
`;

const StButton = styled(DefaultButton)`
  width: 13.2rem;
  height: 4.7rem;

  margin-top: 2rem;

  border-radius: 1rem;

  ${({ theme }) => theme.fonts.button3}
`;
