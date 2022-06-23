import styled from "@emotion/styled";

import { StepUpNDrawerIdx } from "../../../pages/book-note/[reviewId]";
import ExampleDrawerBtn from "../ExampleDrawerBtn";
import StepUpBtn from "../StepUpBtn";

interface HeaderLabelProps {
  handleOpenStepUpModal: (i: StepUpNDrawerIdx) => void;
  handleOpenDrawer: (i: StepUpNDrawerIdx) => void;
}

export default function HeaderLabel(props: HeaderLabelProps) {
  const { handleOpenStepUpModal, handleOpenDrawer } = props;

  return (
    <StLabelWrapper>
      <StLabelContainer>
        <StLabel>질문 리스트를 구조화하며 책을 읽어보세요.</StLabel>
        <StepUpBtn onClickStepUpBtn={() => handleOpenStepUpModal(4)} />
      </StLabelContainer>
      <ExampleDrawerBtn idx={4} onOpenDrawer={() => handleOpenDrawer(4)} />
    </StLabelWrapper>
  );
}

const StLabelWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 4.6rem 0 1.6rem 2rem;
`;

const StLabelContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StLabel = styled.h2`
  margin-left: 2rem;
  ${({ theme }) => theme.fonts.header3}
  color: ${({ theme }) => theme.colors.gray100};
`;
