import styled from "@emotion/styled";

import { FormController, PeriNoteTreeNode } from "../../../types/bookNote";

interface TopQuestionContainerProps {
  path: number[];
  node: PeriNoteTreeNode;
  onAddChild: (path: number[], currentIndex: number, isQuestion: boolean) => void;
  onSetContent: (value: string, path: number[]) => void;
  onDeleteChild: (path: number[]) => void;
  formController: FormController;
}

export default function TopQuestionContainer() {
  // const { path, node, onAddChild, onSetContent, onDeleteChild, formController } = props;

  return <StArticle>TopQuestionContainer</StArticle>;
}

const StArticle = styled.article`
  position: relative;

  margin-top: 3rem;

  &:focus-within {
    & > fieldset {
      border-bottom: 0.1rem solid ${({ theme }) => theme.colors.white400};
      border-color: ${({ theme }) => theme.colors.orange100};
    }
  }
`;
