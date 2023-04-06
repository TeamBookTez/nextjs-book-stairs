import styled from "@emotion/styled";

import { GifLoading } from "../../public/assets/images";
import { ImageWrapper } from "./styled/Img";

export default function Loading() {
  return (
    <StLoadingWrapper>
      <StImage thumbnail={GifLoading.src} />
    </StLoadingWrapper>
  );
}

const StLoadingWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 2rem;
  background-color: white;
`;

const StImage = styled(ImageWrapper)`
  width: 20rem;
  height: 20rem;
`;
