import styled from "@emotion/styled";
import Image from "next/image";

import { StepUpContent } from "../../../types/bookNote";
import { imageLoader } from "../../../util/imageLoader";

interface StepUpContentWrapperProps {
  content: StepUpContent;
}

export default function StepUpContentWrapper(props: StepUpContentWrapperProps) {
  const { content } = props;

  return (
    <>
      <StLeftWrapper>
        <StImgWrapper>
          <Image src={content.imgUrl} alt={content.imgAlt} layout="fill" loader={imageLoader} />
        </StImgWrapper>
        <StLifeQuotes>{content.lifeQuote}</StLifeQuotes>
        {content.public && <StPublic>- {content.public} -</StPublic>}
      </StLeftWrapper>
      <StRightWrapper>
        <StHeader>{content.header}</StHeader>
        {content && <StDesc>{content.desc}</StDesc>}
      </StRightWrapper>
    </>
  );
}

const StLeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 36.9rem;

  margin-right: 2.8rem;
`;

const StImgWrapper = styled.div`
  position: relative;

  margin-bottom: 2rem;

  width: 31.6rem;
  height: 33.2rem;
`;

const StLifeQuotes = styled.p`
  ${({ theme }) => theme.fonts.caption};
  color: ${({ theme }) => theme.colors.gray200};
`;

const StPublic = styled.p`
  ${({ theme }) => theme.fonts.caption};
  color: ${({ theme }) => theme.colors.gray200};
`;

const StRightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StHeader = styled.h3`
  margin-bottom: 2.4rem;

  ${({ theme }) => theme.fonts.header3};
  color: ${({ theme }) => theme.colors.gray100};
`;

const StDesc = styled.p`
  white-space: pre-wrap;
  ${({ theme }) => theme.fonts.body4};
  color: ${({ theme }) => theme.colors.gray100};
`;
