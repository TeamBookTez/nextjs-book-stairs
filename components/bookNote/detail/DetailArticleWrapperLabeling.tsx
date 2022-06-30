import styled from "@emotion/styled";

import { IcDetail } from "../../../public/assets/icons";
import StepUpBtn from "../StepUpBtn";

interface DetailArticleWrapperLabelingProps {
  title: string;
  handlePeriCarousel: () => void;
  children: React.ReactNode;
}

export default function DetailArticleWrapperLabeling(props: DetailArticleWrapperLabelingProps) {
  const { title, handlePeriCarousel, children } = props;

  return (
    <section>
      <StTitleWrapper>
        {/* 이미지 div */}
        <IcDetail />
        <StTitle>{title}</StTitle>
        <StepUpBtn onClickStepUpBtn={handlePeriCarousel} />
      </StTitleWrapper>
      {children}
    </section>
  );
}

const StTitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StTitle = styled.h2`
  margin-left: 0.5rem;

  ${({ theme }) => theme.fonts.header4}
  color: ${({ theme }) => theme.colors.gray100};
`;
