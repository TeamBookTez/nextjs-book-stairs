import styled from "@emotion/styled";

import { ImgLanding02 } from "../../public/assets/images";
import { ImageWrapper } from "../common/styled/Img";
import { StLandingSectionH2, StLandingSectionWrapper } from "../common/styled/Landing";

export default function LandingThree() {
  return (
    <StLandingSectionWrapper>
      <StImage thumbnail={ImgLanding02.src} />
      <div>
        <StLandingSectionH2>차별화 된 독서 방법을 제안합니다.</StLandingSectionH2>
        <StParagraph>
          독서가들이 최적의 독서 활동을 해나갈 수 있도록 돕습니다.
          <br />그 시작으로, 뇌 과학 기반의 차별화 된 독서법을 만나 보세요.
        </StParagraph>
      </div>
    </StLandingSectionWrapper>
  );
}

const StImage = styled(ImageWrapper)`
  width: 55.6rem;
  height: 90rem;
`;

const StParagraph = styled.p`
  ${({ theme }) => theme.fonts.body00}
`;
