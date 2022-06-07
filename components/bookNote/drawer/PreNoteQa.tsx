import { css } from "@emotion/react";
import styled from "@emotion/styled";

import { QaPair } from "./DrawerWrapper";

interface DrawerPreProps {
  qaPair: QaPair;
  drawerIdx: number;
}

export default function DrawerPre(props: DrawerPreProps) {
  const { qaPair, drawerIdx } = props;

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
