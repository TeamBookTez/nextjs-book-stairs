import styled from "@emotion/styled";

import { ImgEmptyBook } from "../../../public/assets/images";
import { ImageWrapper } from "../../common/styled/Img";
export default function BookEmpty() {
  return (
    <StWrapper>
      <StH3>찾으시는 책이 없어요!</StH3>
      <StImage thumbnail={ImgEmptyBook.src} />
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

const StImage = styled(ImageWrapper)`
  width: 28.4rem;
  height: 16.6rem;
`;
