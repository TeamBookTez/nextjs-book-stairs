import styled from "@emotion/styled";
import React from "react";

import theme from "../../../styles/theme";
import { PeriNoteTreeNode } from "../../../types/bookNote";
import { LabelQuestion } from "../../common";
import { StQuestion } from "../../common/styled/PopUp";
import { StIcToggle } from "../styled/DetailBookNote.styled";
import ExamplePeriQuestion from "./ExamplePeriQuestion";

interface ExamplePreNoteProps {
  answerThree: PeriNoteTreeNode;
}

export default function ExamplePeriNote(props: ExamplePreNoteProps) {
  const { answerThree } = props;

  const handleToggle = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    const questionElement = e.currentTarget.closest("h3")?.nextElementSibling;

    if (questionElement === null || questionElement === undefined) return;
    if (!(questionElement instanceof HTMLElement)) return;

    const whatValue = questionElement.style.display;

    if (whatValue === "none") questionElement.style.display = "block";
    else questionElement.style.display = "none";
  };

  return (
    <StExampleWrapper>
      {answerThree.children &&
        answerThree.children.map((question, index) => (
          <React.Fragment key={index}>
            <StFirstQuestion>
              <LabelQuestion bgColor={theme.colors.orange000} />
              {question.content ? question.content : "질문"}
              <StIcToggle onClick={handleToggle} />
            </StFirstQuestion>
            <div>
              {question.children.map((node, idx) => (
                <ExamplePeriQuestion key={idx} node={node} path={[idx]} onToggle={handleToggle} />
              ))}
            </div>
          </React.Fragment>
        ))}
    </StExampleWrapper>
  );
}

const StExampleWrapper = styled.article`
  width: 100%;

  margin-top: 1.2rem;
  padding: 3rem;

  border-radius: 1.6rem;
  background-color: ${({ theme }) => theme.colors.white};

  /* 선 추가는 여기서 &::before {} 로 */
  & article {
    padding-left: 5.6rem;
  }
`;

const StFirstQuestion = styled(StQuestion)`
  height: 3.1rem;

  display: flex;
  align-items: center;

  margin-top: 4.6rem;

  font-size: 1.8rem;
  font-weight: 500;

  &:first-of-type {
    margin-top: 0;
  }
`;
