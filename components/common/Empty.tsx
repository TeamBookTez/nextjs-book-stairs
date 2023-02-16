import styled from "@emotion/styled";
import Link from "next/link";

import { ImgEmptyBook } from "../../public/assets/images";
import { DefaultButton } from "./styled/Button";
import { ImageWrapper } from "./styled/Img";

interface EmptyProps {
  text: string;
  buttonVisible: boolean;
}

export default function Empty({ text, buttonVisible }: EmptyProps) {
  return (
    <StArticle>
      <StImg thumbnail={ImgEmptyBook.src} />
      <StH3>{text}</StH3>

      <StParagraph>
        북스테어즈만의 독서법을 통해
        <br /> 지식을 얻고 독서의 매력을 느껴보세요
      </StParagraph>
      {buttonVisible && (
        <StAddBookBtn>
          <Link href="/bookcase/add-book">
            <StLink>+ 책 추가</StLink>
          </Link>
        </StAddBookBtn>
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

const StImg = styled(ImageWrapper)`
  width: 28.4rem;
  height: 16.6rem;

  margin-bottom: 1.1rem;
`;

const StH3 = styled.h3`
  margin-bottom: 1rem;

  ${({ theme }) => theme.fonts.header3}
`;

const StParagraph = styled.p`
  text-align: center;

  margin-bottom: 2.4rem;

  ${({ theme }) => theme.fonts.body6}
`;

const StAddBookBtn = styled(DefaultButton)`
  width: 13.7rem;
  height: 4.6rem;

  border-radius: 1rem;

  ${({ theme }) => theme.fonts.button}
`;

const StLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
`;
