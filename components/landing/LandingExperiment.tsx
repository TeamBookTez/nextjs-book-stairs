import styled from "@emotion/styled";

import { ImgLandingBookNote } from "../../public/assets/images";
import { ImageWrapper } from "../common/styled/Img";
import { StLandingSectionH2, StLandingSectionWrapper } from "../common/styled/Landing";

export default function LandingExperiment() {
  return (
    <StSection>
      <div>
        <StLandingSectionH2>
          머릿속에도 깔끔하게 정리되는 <br />
          특별한 북노트를 작성해 보세요.
        </StLandingSectionH2>
        <StParagraph>
          뻔한 메모 방식 대신, 색다른 방법으로 정리해보세요.
          <br />
          탄탄한 지식 체계가 머릿속에도 쌓이게 될 거예요.
        </StParagraph>
      </div>
      <StImgLandingBookNote thumbnail={ImgLandingBookNote.src} />
    </StSection>
  );
}

const StSection = styled(StLandingSectionWrapper)`
  padding-top: 11.1rem;
  padding-bottom: 12.4rem;
`;

const StParagraph = styled.p`
  ${({ theme }) => theme.fonts.body00};
`;

const StImgLandingBookNote = styled(ImageWrapper)`
  width: 62.9rem;
  height: 51.3rem;
`;
