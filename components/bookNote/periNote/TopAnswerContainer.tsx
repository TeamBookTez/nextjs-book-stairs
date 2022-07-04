/*
마지막 편집자: 22-06-20 joohaem
변경사항 및 참고:
  - path: [0, 0], [0, 1], [1, 0], ...
    
고민점:
  - 
*/

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { useEffect, useRef } from "react";
import reactTextareaAutosize from "react-textarea-autosize";

import { IcPeriAnswer } from "../../../public/assets/icons";
import { PeriNoteTreeNode } from "../../../types/bookNote";
import { StMenuBtn } from "../../common/styled/Button";
import { StMoreIcon } from "../../common/styled/Icon";
import { StMenuWrapper } from "../../common/styled/MenuWrapper";

interface TopAnswerContainerProps {
  index: number;
  path: number[];
  node: PeriNoteTreeNode;
  onAddChild: (path: number[], index?: number) => void;
  onDeleteChild: (path: number[]) => void;
  onSetContent: (value: string, path: number[]) => void;
  children: React.ReactNode;
}

export default function TopAnswerContainer(props: TopAnswerContainerProps) {
  const { index, path, node, onAddChild, onDeleteChild, onSetContent, children } = props;

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleChangeSetContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value !== "\n") {
      onSetContent(e.target.value, path);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      // add answer (+ index 추가 인자)
      onAddChild(path.slice(0, -1), index);
    }
  };

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, []);

  if (node.type !== "answer") return <></>;

  return (
    <StAnswerWrapper>
      <StFieldset hasborder={node.children.length > 0}>
        <legend>
          <StAnswerIcon />
        </legend>
        <StInput
          ref={textAreaRef}
          value={node.content}
          placeholder={"답변을 입력해주세요."}
          onChange={handleChangeSetContent}
          onKeyPress={handleKeyPress}
        />
        <StMore className="icn_more" />
        <StMenuWrapper menuposition="isTopOfQA">
          <StMenuBtn type="button" onClick={() => onAddChild(path)}>
            꼬리질문 추가
          </StMenuBtn>
          <StMenuBtn type="button" onClick={() => onDeleteChild(path)}>
            삭제
          </StMenuBtn>
        </StMenuWrapper>
      </StFieldset>
      {children}
    </StAnswerWrapper>
  );
}

const StAnswerWrapper = styled.article`
  position: relative;

  padding: 2.6rem 2.8rem;
  border: 0.1rem solid ${({ theme }) => theme.colors.white200};
  border-radius: 0.8rem;
  border-top: none;

  background-color: ${({ theme }) => theme.colors.white};
`;

const StFieldset = styled.fieldset<{ hasborder: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${({ hasborder, theme }) =>
    hasborder &&
    css`
      border-bottom: 0.2rem solid ${theme.colors.white200};
      padding-bottom: 2.8rem;
    `}

  width: 100%;
`;

const StAnswerIcon = styled(IcPeriAnswer)`
  position: absolute;
  top: 2.7rem;
  left: 3.8rem;
`;

const StInput = styled(reactTextareaAutosize)`
  flex: 1;
  margin-left: 5.6rem;
  ${({ theme }) => theme.fonts.header4}
  min-height: 2.6rem;

  &::placeholder {
    color: ${({ theme }) => theme.colors.white500};
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

const StMore = styled(StMoreIcon)`
  margin-right: 3.2rem;
`;
