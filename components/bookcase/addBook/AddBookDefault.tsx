import styled from "@emotion/styled";

import { ImgAddBooksSearch } from "../../../public/assets/images";
import { ImageWrapper } from "../../common/styled/Img";

export default function AddBookDefault() {
  return (
    <StWrapper>
      <StImgAddBookSearch thumbnail={ImgAddBooksSearch.src} />
      <StH3>
        어떤 책을 읽으시나요? <br></br>
        북스테어즈와 독서를 해봐요!
      </StH3>
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

const StImgAddBookSearch = styled(ImageWrapper)`
  margin-bottom: 6.6rem;

  width: 24.8rem;
  height: 24.6rem;
`;

const StH3 = styled.h3`
  margin-bottom: 3.2rem;

  text-align: center;

  ${({ theme }) => theme.fonts.header4}
  color: ${({ theme }) => theme.colors.gray300};
`;
