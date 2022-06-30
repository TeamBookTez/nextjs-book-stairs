import styled from "@emotion/styled";
import Image from "next/image";

import { ImgEmptyBook } from "../../../public/assets/images";
export default function BookEmpty() {
  return (
    <StWrapper>
      <StH3>찾으시는 책이 없어요!</StH3>
      <Image src={ImgEmptyBook.src} alt="그래픽 이미지입니다" width={284} height={166} />
    </StWrapper>
  );
}

const StWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: calc(100vh - 23.8rem);

  margin: 0 4rem 0 4rem;
`;

const StH3 = styled.h3`
  ${({ theme }) => theme.fonts.header4}

  color: ${({ theme }) => theme.colors.gray300};

  margin-bottom: 3.2rem;
`;
