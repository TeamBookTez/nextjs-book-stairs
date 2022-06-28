import styled from "@emotion/styled";

import { labelColorList } from "../../../core/bookNote/childNodeLabelColor";
import { PeriNoteTreeNode } from "../../../types/bookNote";
import { LabelQuestion } from "../../common";
import { StQuestion } from "../../common/styled/PopUp";
import { StIcToggle } from "../styled/DetailBookNote.styled";

interface ExamplePeriQuestionProps {
  node: PeriNoteTreeNode;
  path: number[];
  onToggle: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
}

export default function ExamplePeriQuestion(props: ExamplePeriQuestionProps) {
  const { node, path, onToggle } = props;
  const isAnswer = node.type === "answer";
  const labelColor = labelColorList[(path.length + 1) % 10];

  return (
    <>
      {isAnswer ? (
        <>
          <StAnswer>{node.content ? node.content : "답변"}</StAnswer>
          <article>
            {node.children.map((n, i) => (
              <ExamplePeriQuestion key={i} node={n} path={[...path, i]} onToggle={onToggle} />
            ))}
          </article>
        </>
      ) : (
        <>
          <StChildQuestion>
            <LabelQuestion bgColor={labelColor} />
            {node.content ? node.content : "질문"}
            <StIcToggle onClick={onToggle} />
          </StChildQuestion>
          <div>
            {node.children.map((n, i) => (
              <ExamplePeriQuestion key={i} node={n} path={[...path, i]} onToggle={onToggle} />
            ))}
          </div>
        </>
      )}
    </>
  );
}

const StAnswer = styled.h4`
  list-style: none;

  position: relative;

  margin-top: 1.7rem;
  padding-left: 5.7rem;

  ${({ theme }) => theme.fonts.body3}
  color: ${({ theme }) => theme.colors.gray400};
  white-space: pre-wrap;

  &::before {
    content: "";
    position: absolute;
    left: 3.4rem;
    top: 0.82rem;

    width: 0.7rem;
    height: 0.7rem;

    border-radius: 1rem;
    background-color: ${({ theme }) => theme.colors.gray400};
  }
`;

const StChildQuestion = styled(StQuestion)`
  height: 3.1rem;

  display: flex;
  align-items: center;

  margin-top: 2.3rem !important;

  font-size: 1.8rem;
  font-weight: 500;

  &:first-child {
    margin-top: 0;
  }
`;
