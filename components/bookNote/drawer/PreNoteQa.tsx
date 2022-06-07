import { css } from "@emotion/react";
import styled from "@emotion/styled";

export interface QaPair {
  question: string;
  answer: string[];
}

interface DrawerPreProps {
  drawerIdx: number;
}

export default function DrawerPre(props: DrawerPreProps) {
  const { drawerIdx } = props;

  const qaPair: QaPair = { question: "", answer: [""] };

  switch (drawerIdx) {
    case 1:
      qaPair.question = "1. 이 책에 어떤 기대를 하고 계신가요?";
      qaPair.answer = [
        "상황에 따라 변하는 '동기'를 한 곳에 잡아 두고 싶고,\n앞으로 진행될 모든 업무에 대해 내가 이 일을 왜 하는지 명확하게 할 수 있는 힌트를 얻을 수 있다고 기대하고 있다.",
      ];
      break;
    case 2:
      qaPair.question = "2. 이 책의 핵심 메시지는 무엇일까요?";
      qaPair.answer = [
        "이 책의 핵심은 열정적이고 행복한 삶의 근원이 되는 '왜' 찾는 법을 개인, 조직에 맞게 탐색, 발견, 유지, 공유 방법들에 소개한다.\n나는 개인 수준에서 '왜'를 찾고, 유지할 수 있는 방법이 궁금하다.",
      ];
      break;
    default:
      qaPair.question = "3. 궁금한 내용부터 우선순위 질문 리스트를 만들어보세요";
      qaPair.answer = [
        "왜 why가 중요하다고 주장하는 것일까?",
        "나 자신의 why를 발견하는 방법은 무엇일까?",
        "Why를 항상 살아있게 유지하려면 어떻게 해야할까?",
      ];
  }

  return (
    <>
      <StQuestionWrapper>{qaPair.question}</StQuestionWrapper>
      <StAnswerWrapper isQ3={drawerIdx === 3}>
        {qaPair.answer.map((answer, i) => {
          if (drawerIdx === 3) {
            return <StList key={`ex-answer-${i}`}>{answer}</StList>;
          } else {
            return answer;
          }
        })}
      </StAnswerWrapper>
    </>
  );
}

const StQuestionWrapper = styled.h2`
  text-align: left;

  ${({ theme }) => theme.fonts.body1}

  margin-bottom: 1.7rem;
`;

const StAnswerWrapper = styled.p<{ isQ3: boolean }>`
  text-align: left;

  ${({ theme }) => theme.fonts.body4};

  border-top: 0.1rem solid ${({ theme }) => theme.colors.white400};
  padding-top: 1.7rem;

  ${({ isQ3 }) =>
    isQ3 &&
    css`
      list-style-type: square;
    `}
`;

const StList = styled.li`
  margin-left: 0.7rem;
  text-align: start;
`;
