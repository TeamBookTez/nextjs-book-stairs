import styled from "@emotion/styled";
import React from "react";

import ExampleDrawerBtn from "../ExampleDrawerBtn";
import StepUpBtn from "../StepUpBtn";

interface PreNoteFormContainerProps {
  children: React.ReactNode;
}

export default function PreNoteFormContainer(props: PreNoteFormContainerProps) {
  const { children } = props;

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
      <StArticleWrapper>{children}</StArticleWrapper>
    </StFormContainer>
    // 원래 여기 Step Up Modal On & Off
  );
}
const StFormContainer = styled.section`
  width: 100%;

  padding: 2.1rem 3rem 2.6rem 3rem;

  border: 0.1rem solid transparent;
  border-radius: 1.6rem;

  background-color: ${({ theme }) => theme.colors.white};

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.orange100};
  }
`;

const StHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding-bottom: 2rem;

  border-bottom: 0.1rem solid ${({ theme }) => theme.colors.white400};
`;

const StHeaderLeft = styled.h3`
  display: flex;
  align-items: center;

  ${({ theme }) => theme.fonts.header4}
`;

const StArticleWrapper = styled.article`
  padding: 2.6rem 1.4rem;
`;
