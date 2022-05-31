import styled from "@emotion/styled";

import ExampleDrawerBtn from "../ExampleDrawerBtn";
import StepUpBtn from "../StepUpBtn";

export default function PreNoteFormContainer() {
  const question = "QQQQQQQQQQQQQQ";
  const drawre열자 = (idx: number) => {
    console.log("열려라 얍");
  };

  return (
    <StFormContainer>
      <StHeader>
        <StHeaderLeft>
          {question}
          <StepUpBtn
            onToggleModal={() => {
              console.log("스텝업 나와라 얍");
            }}
          />
        </StHeaderLeft>
        <ExampleDrawerBtn idx={1} onOpenDrawer={drawre열자} />
      </StHeader>
      <StTextareaWrapper>
        <StTextarea placeholder="답변을 입력해주세요." />
      </StTextareaWrapper>
    </StFormContainer>
    // 원래 여기 Step Up Modal On & Off
  );
}
const StFormContainer = styled.article`
  border: 0.1rem solid transparent;
  border-radius: 1.6rem;
  padding: 2.1rem 3rem 2.6rem 3rem;
  background-color: ${({ theme }) => theme.colors.white};
  width: 100%;

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.orange100};
  }
`;

const StHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  border-bottom: 0.1rem solid ${({ theme }) => theme.colors.white400};
  padding-bottom: 2rem;
`;

const StHeaderLeft = styled.h3`
  display: flex;
  align-items: center;
  ${({ theme }) => theme.fonts.header4}
`;

const StTextareaWrapper = styled.div`
  padding: 2.6rem 1.4rem;
`;

const StTextarea = styled.textarea`
  border: none;
  width: 100%;
  height: 15.4rem;
  color: ${({ theme }) => theme.colors.gray100};
  ${({ theme }) => theme.fonts.body4}
  resize: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.white500};
    ${({ theme }) => theme.fonts.body4}
  }
`;
