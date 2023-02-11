import styled from "@emotion/styled";
import Image from "next/image";

import { ImgDeletePopUp } from "../public/assets/images";

const TestPage = () => {
  return (
    <StImgWrapper>
      <Image src={ImgDeletePopUp} alt="독서 전 단계 완료" layout="fill" />
    </StImgWrapper>
  );
};

export default TestPage;

const StImgWrapper = styled.div`
  position: relative;

  width: 12.6rem;
  height: 12.6rem;

  margin-bottom: 2.1rem;
`;
