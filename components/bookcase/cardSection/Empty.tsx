import styled from "@emotion/styled";
import Link from "next/link";
import { useContext } from "react";

import { ImgEmptyBook } from "../../../public/assets/images";
import { BookcaseNavigationContext } from "../../../util/bookcaseContext";
import { DefaultButton } from "../../common/styled/Button";
import { ImageWrapper } from "../../common/styled/Img";

export default function Empty() {
  const { navIndex } = useContext(BookcaseNavigationContext);

  const isNavIndexDefaultOrPre = navIndex.key === "/book";

  return (
    <StArticle>
      <StImage thumbnail={ImgEmptyBook.src} />
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

const StImage = styled(ImageWrapper)`
  margin-bottom: 1.1rem;

  width: 28.4rem;
  height: 16.6rem;
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
