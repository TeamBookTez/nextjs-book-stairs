import styled from "@emotion/styled";
import Link from "next/link";

import { ImgLanding01 } from "../../public/assets/images";
import { DefaultButton } from "../common/styled/Button";
import { ImageWrapper } from "../common/styled/Img";

export default function LandingInfo() {
  return (
    <>
      <StWrapper>
        <StArticle>
          <StTitle>
            진짜 독서가들을 위한
            <br />
            독서법을 만들어 갑니다
          </StTitle>
          <Link href="/main" passHref>
            <StButton id="cta_top">북스테어즈 시작</StButton>
          </Link>
        </StArticle>
        <StImgLanding01 thumbnail={ImgLanding01.src} />
      </StWrapper>
    </>
  );
}

const StWrapper = styled.section`
  display: flex;
  justify-content: space-between;

  width: 100%;
`;

const StArticle = styled.article`
  margin-top: 15rem;
`;

const StTitle = styled.h1`
  ${({ theme }) => theme.fonts.header001}
`;

const StButton = styled(DefaultButton)`
  margin-top: 5.1rem;
  border-radius: 1.6rem;
  padding: 1.8rem 2.5rem;

  ${({ theme }) => theme.fonts.header3}
`;

const StImgLanding01 = styled(ImageWrapper)`
  width: 75.4rem;
  height: 76.1rem;
`;
