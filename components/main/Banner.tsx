import styled from "@emotion/styled";
import Link from "next/link";

import { ImgMainBanner } from "../../public/assets/images";
import { ImageWrapper } from "../common/styled/Img";

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
        <Link href="/book-note/example">
          <StExampleLink>적용 사례</StExampleLink>
        </Link>
      </div>
      <StImageWrapper>
        <StImage thumbnail={ImgMainBanner.src} />
      </StImageWrapper>
    </StWrapper>
  );
}

const StWrapper = styled.section`
  position: relative;

  display: flex;
  justify-content: space-between;

  margin: 0 4rem;
  border-radius: 2rem;
  padding: 4.4rem 65.7rem 4rem 7.2rem;

  background-color: ${({ theme }) => theme.colors.white200};
`;

const StTitle = styled.h3`
  margin-bottom: 1.6rem;

  ${({ theme }) => theme.fonts.header1}
`;

const StContent = styled.p`
  margin-bottom: 3.3rem;
  width: 41.5rem;

  ${({ theme }) => theme.fonts.body2}
`;

const StExampleLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 13.7rem;
  height: 4.6rem;

  border: 0.2rem solid ${({ theme }) => theme.colors.gray300};
  border-radius: 1rem;

  background-color: ${({ theme }) => theme.colors.gray100};

  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.button}
`;

const StImageWrapper = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  object-fit: cover;
`;

const StImage = styled(ImageWrapper)`
  width: 48.5rem;
  height: 25.4rem;
`;
