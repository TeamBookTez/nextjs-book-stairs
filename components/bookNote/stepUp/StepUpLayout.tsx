import styled from "@emotion/styled";
import { useState } from "react";

import { IcCancelBlack } from "../../../public/assets/icons";
import { StepUpContent } from "../../../types/bookNote";
import CarouselDots from "./CarouselDots";
import StepUpContentWrapper from "./StepUpContentWrapper";

interface StepUpProps {
  stepUpContent: StepUpContent[];
  onClickModalCancel: () => void;
}

export default function StepUpLayout(props: StepUpProps) {
  const { stepUpContent, onClickModalCancel } = props;
  const [contentIndex, setContentIndex] = useState<number>(0);
  const maxIndex = stepUpContent.length - 1;

  const nextSlide = () => {
    if (contentIndex < maxIndex) {
      setContentIndex((curr) => curr + 1);
    } else {
      setContentIndex(0);
    }
  };

  const prevSlide = () => {
    if (contentIndex > 0) {
      setContentIndex((curr) => curr - 1);
    } else {
      setContentIndex(maxIndex);
    }
  };

  const handleSetContentIndex = (idx: number) => {
    setContentIndex(idx);
  };

  return (
    <StModalBox>
      <StModalIcCancel onClick={onClickModalCancel} />
      <StepUpContentWrapper content={stepUpContent[contentIndex]} />

      {stepUpContent.length > 1 && (
        <>
          <StPrevBtn onClick={prevSlide}>이전</StPrevBtn>
          <StNextBtn onClick={nextSlide}>다음</StNextBtn>
          <CarouselDots maxIndex={maxIndex} contentIndex={contentIndex} onSetContentIndex={handleSetContentIndex} />
        </>
      )}
    </StModalBox>
  );
}

const StModalBox = styled.article`
  position: relative;

  display: flex;

  width: 85rem;
  height: 48.2rem;

  padding: 4.2rem 4.5rem;

  border-radius: 2.1rem;

  background-color: ${({ theme }) => theme.colors.white};
`;

const StModalIcCancel = styled(IcCancelBlack)`
  position: absolute;
  top: 3.2rem;
  right: 4.2rem;

  cursor: pointer;
`;

const StPrevBtn = styled.button`
  position: absolute;
  bottom: 3rem;
  right: 13.6rem;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 8rem;
  height: 4.6rem;

  border-radius: 0.8rem;

  background-color: ${({ theme }) => theme.colors.gray300};

  ${({ theme }) => theme.fonts.button2};
  color: ${({ theme }) => theme.colors.white};
`;

const StNextBtn = styled(StPrevBtn)`
  right: 4rem;
  background-color: ${({ theme }) => theme.colors.orange100};
`;
