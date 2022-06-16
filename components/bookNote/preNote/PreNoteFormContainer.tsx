import styled from "@emotion/styled";
import React from "react";

import LocalStorage from "../../../core/localStorage";
import ExampleDrawerBtn from "../ExampleDrawerBtn";
import StepUpBtn from "../StepUpBtn";

interface PreNoteFormContainerProps {
  isLogin: boolean;
  idx: 1 | 2 | 3;
  onClickStepUpBtn: () => void;
  onClickOpenDrawer: () => void;
  children: React.ReactNode;
}

function getQuestionByIdx(idx: 1 | 2 | 3, nickname?: string) {
  switch (idx) {
    case 1:
      return `${nickname ? `${nickname} ` : "익명의 독서가"}님은 이 책에 어떤 기대를 하고 계신가요?`;
    case 2:
      return "이 책의 핵심 메시지는 무엇일까요? 그 중 어느 부분들이 기대를 만족시킬 수 있을까요?";
    case 3:
      return "가장 관심가는 주제부터 질문 리스트를 만들어보세요!";
  }
}

export default function PreNoteFormContainer(props: PreNoteFormContainerProps) {
  const { isLogin, idx, onClickStepUpBtn, onClickOpenDrawer, children } = props;

  const question = isLogin ? getQuestionByIdx(idx, LocalStorage.getItem("booktez-nickname")) : getQuestionByIdx(idx);

  return (
    <StFormContainer>
      <StHeader>
        <StHeaderLeft>
          {question}
          <StepUpBtn onClickStepUpBtn={onClickStepUpBtn} />
        </StHeaderLeft>
        <ExampleDrawerBtn idx={1} onOpenDrawer={onClickOpenDrawer} />
      </StHeader>
      <StArticleWrapper>{children}</StArticleWrapper>
    </StFormContainer>
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
