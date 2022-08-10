/*
마지막 편집자: 22-06-20 joohaem
변경사항 및 참고:
  - pathStack: [0], [1], [2], ...
    
고민점:
  - 
*/

import styled from "@emotion/styled";
import { useEffect, useRef } from "react";
import reactTextareaAutosize from "react-textarea-autosize";

import { IcPeriQuestion } from "../../../public/assets/icons";
import { PeriNoteTreeNode } from "../../../types/bookNote";
import { StAddAnswerButton, StMenuBtn } from "../../common/styled/Button";
import { StMoreIcon } from "../../common/styled/Icon";
import { StMenuWrapper } from "../../common/styled/MenuWrapper";

interface TopQuestionContainerProps {
  pathStack: number[];
  node: PeriNoteTreeNode;
  onAddTopAnswer: (pathStack: number[], currentIndex: number) => void;
  onDeleteChild: (pathStack: number[]) => void;
  onSetContent: (value: string, pathStack: number[]) => void;
}

export default function TopQuestionContainer(props: TopQuestionContainerProps) {
  const { pathStack, node, onAddTopAnswer, onDeleteChild, onSetContent } = props;

  // 큰 답변 추가시 사용되는 index는 현재 큰질문의 index가 아닌 답변의 개수
  const currentIndex = node.children.length - 1;

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value !== "\n") {
      onSetContent(e.target.value, pathStack);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      onAddTopAnswer(pathStack, currentIndex);
    }
  };

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, []);

  if (node.type !== "question") return <></>;

  return (
    <StArticle>
      <StFieldset>
        <legend>
          <StQuestionIcon />
        </legend>
        <StInput
          ref={textAreaRef}
          value={node.content}
          placeholder="질문을 입력해주세요."
          onChange={handleContent}
          onKeyPress={handleKeyPress}
        />
        <StAddAnswerButton type="button" onClick={() => onAddTopAnswer(pathStack, currentIndex)}>
          답변
        </StAddAnswerButton>
        <StMoreIcon className="icn_more" />
        <StMenuWrapper menuposition="isTopOfQA">
          <StMenuBtn type="button" onClick={() => onDeleteChild(pathStack)}>
            삭제
          </StMenuBtn>
        </StMenuWrapper>
      </StFieldset>
    </StArticle>
  );
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

const StFieldset = styled.fieldset`
  display: flex;
  align-items: center;
  justify-content: space-between;

  border-radius: 0.8rem;
  border: 0.1rem solid ${({ theme }) => theme.colors.white200};
  border-bottom: 0.1rem dashed ${({ theme }) => theme.colors.white400};

  padding: 2.6rem 4.4rem 2.6rem 8.4rem;
  background-color: ${({ theme }) => theme.colors.white};

  width: 100%;
`;

const StQuestionIcon = styled(IcPeriQuestion)`
  position: absolute;
  top: -1.2rem;
  left: 0.8rem;
`;

const StInput = styled(reactTextareaAutosize)`
  flex: 1;
  margin: 0;
  min-height: 2.6rem;
  ${({ theme }) => theme.fonts.header4};

  &::placeholder {
    color: ${({ theme }) => theme.colors.white500};
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;
