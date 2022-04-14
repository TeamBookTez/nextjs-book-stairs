import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { ImgEmptyBook } from "../../../public/assets/images";
import { DefaultButton } from "../../styles/common/DefaultButton";

export default function Empty() {
  const { asPath } = useRouter();

  return (
    <StArticle>
      <StImg src={ImgEmptyBook} alt="빈 폴더 이미지" />
      <StH3>{asPath === "/bookcase" || asPath === "/main" ? "아직 읽은 책이 없어요." : "이 단계의 책이 없어요."}</StH3>

      <StParagraph>
        북스테어즈만의 독서법을 통해
        <br /> 지식을 얻고 독서의 매력을 느껴보세요
      </StParagraph>
      {asPath === "/bookcase" || asPath === "/main" ? (
        <StAddBookBtn>
          <Link href="/bookcase/add-book">
            <StLink>+ 책 추가</StLink>
          </Link>
        </StAddBookBtn>
      ) : null}
    </StArticle>
  );
}

const StArticle = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 32.7rem;
`;

const StImg = styled(Image)`
  width: 28.4rem
  height: 16.6rem;

  margin-bottom: 1.1rem;
`;

const StH3 = styled.h3`
  font-family: Pretendard;
  font-weight: 800;
  font-size: 2.2rem;
  line-height: 1.3;
  letter-spacing: -0.1rem;

  margin-bottom: 1rem;
`;

const StParagraph = styled.p`
  text-align: center;

  margin-bottom: 2.4rem;
  font-family: Pretendard;
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 1.3;
  letter-spacing: -0.1rem;
`;

const StAddBookBtn = styled(DefaultButton)`
  width: 13.7rem;
  height: 4.6rem;

  font-family: Pretendard;
  font-weight: 700;
  font-size: 1.8rem;
  line-height: 1.3;
  letter-spacing: -0.1rem;
  border-radius: 1rem;
`;

const StLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
`;
