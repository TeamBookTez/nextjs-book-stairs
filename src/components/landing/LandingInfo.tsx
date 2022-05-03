import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";

import { ImgLanding01 } from "../../../public/assets/images";
import { DefaultButton } from "../common/styled/Button";

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
          <Link href="/main">
            <StButton id="cta_top">북스테어즈 시작</StButton>
          </Link>
        </StArticle>
        <StImgLanding01 src={ImgLanding01} alt="여긴 어떤 이미지가 들어갈까요?" />
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

const StImgLanding01 = styled(Image)`
  width: 75.4rem;
  height: 76.1rem;
`;
