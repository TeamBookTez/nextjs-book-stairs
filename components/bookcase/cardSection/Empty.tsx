import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";

import { ImgEmptyBook } from "../../../public/assets/images";
import { BookcasePathKey } from "../../../types/bookcase";
import { DefaultButton } from "../../common/styled/Button";

interface EmptyProps {
  navIndex: BookcasePathKey;
}

export default function Empty(props: EmptyProps) {
  const { navIndex } = props;

  const isNavIndexDefaultOrPre = navIndex === "/book" || navIndex === "/book/pre";

  return (
    <StArticle>
      <StImgWrapper>
        <Image src={ImgEmptyBook} alt="빈 폴더 이미지" />
      </StImgWrapper>
      <StH3>{isNavIndexDefaultOrPre ? "아직 읽은 책이 없어요." : "이 단계의 책이 없어요."}</StH3>

      <StParagraph>
        북스테어즈만의 독서법을 통해
        <br /> 지식을 얻고 독서의 매력을 느껴보세요
      </StParagraph>
      {isNavIndexDefaultOrPre && (
        <Link href="/bookcase/add-book" passHref>
          <StAddBookBtn>+ 책 추가</StAddBookBtn>
        </Link>
      )}
    </StArticle>
  );
}

const StArticle = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 32.7rem;
`;

const StImgWrapper = styled.div`
  width: 28.4rem
  height: 16.6rem;

  margin-bottom: 1.1rem;
`;

const StH3 = styled.h3`
  ${({ theme }) => theme.fonts.header3}

  margin-bottom: 1rem;
`;

const StParagraph = styled.p`
  text-align: center;

  margin-bottom: 2.4rem;
  ${({ theme }) => theme.fonts.body6}
`;

const StAddBookBtn = styled(DefaultButton)`
  width: 13.7rem;
  height: 4.6rem;

  display: flex;
  justify-content: center;
  align-items: center;

  ${({ theme }) => theme.fonts.button}
  border-radius: 1rem;
`;
