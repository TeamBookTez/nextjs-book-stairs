import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";

import { ImgMainBanner } from "../../../public/assets/images";

export default function Banner() {
  return (
    <StWrapper>
      <div>
        <StTitle>독서법 사용 가이드북</StTitle>
        <StContent>
          진짜 독서가들은 어떻게 북스테어즈를 사용하고 있을까요?
          <br />
          북스테어즈를 똑똑하게 사용하는 방법을 보여드릴게요.
        </StContent>
        <Link href="/example">
          <StExampleLink>적용 사례</StExampleLink>
        </Link>
      </div>
      <StImage src={ImgMainBanner} alt="일러스트" />
    </StWrapper>
  );
}

const StWrapper = styled.section`
  display: flex;
  justify-content: space-between;

  margin: 0 4rem;
  border-radius: 2rem;
  padding-left: 7.2rem;
  background-color: #f7f7f7;
`;

const StTitle = styled.h3`
  margin-top: 4.4rem;
  margin-bottom: 1.6rem;

  font-family: Pretendard;
  font-weight: 800;
  font-size: 2.4rem;
  line-height: 1.3;
  letter-spacing: -0.1rem;
`;

const StContent = styled.p`
  margin-bottom: 3.3rem;
  width: 41.5rem;

  font-family: Pretendard;
  font-weight: 500;
  font-size: 1.8rem;
  line-height: 1.3;
  letter-spacing: -0.1rem;
`;

const StExampleLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 13.7rem;
  height: 4.6rem;

  border: 0.2rem solid #555555;
  border-radius: 1rem;

  background-color: #242424;

  color: #ffffff;
  font-family: Pretendard;
  font-weight: 700;
  font-size: 1.8rem;
  line-height: 1.3;
  letter-spacing: -0.1rem;
`;

const StImage = styled(Image)`
  position: absolute;
  bottom: 0;
  right: 0;
  object-fit: cover;
`;
