/*
마지막 편집자: 22-06-21 joohaem
변경사항 및 참고:
  - pathStack: [0, 0, 0, ...], [0, 0, 1, ...] 
      
고민점:
  - 
*/

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { useEffect } from "react";
import reactTextareaAutosize from "react-textarea-autosize";

import { labelColorList } from "../../../core/bookNote/childNodeLabelColor";
import { FormController, PeriNoteTreeNode } from "../../../types/bookNote";
import useUpdatePeriNote from "../../../util/hooks/useUpdatePeriNote";
import { StAddAnswerButton, StMenuBtn } from "../../common/styled/Button";
import { StMoreIcon } from "../../common/styled/Icon";
import { StMenuWrapper } from "../../common/styled/MenuWrapper";

interface ChildQANodeProps {
  pathStack: number[];
  index: number;
  node: PeriNoteTreeNode;
  onAddChild: (pathStack: number[], index?: number) => void;
  // urgentQuery 제거시, setContent 불필요
  onSetContent: (value: string, pathStack: number[]) => void;
  onDeleteChild: (pathStack: number[]) => void;
  formController: FormController;
}
export default function ChildQANode(props: ChildQANodeProps) {
  const { pathStack, index, node, onAddChild, onSetContent, onDeleteChild, formController } = props;

  const { urgentQuery, setUrgentQuery } = useUpdatePeriNote(node.content, pathStack, onSetContent);
  const isDeleted = node.type === "deleted";
  const isQuestion = node.type === "question";
  const is4Depth = pathStack.length <= 10;
  const canAddChild = pathStack.length <= 8;
  const formPathKey = `${pathStack.join(",")}`;
  const labelColor = labelColorList[(pathStack.length - 1) % 10];

  const addChildByEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      // 꼬리질문과 답변은 자신의 아래에 추가하는 것이 아닌 자신의 부모의 children에 추가해야함
      if (isQuestion) onAddChild(pathStack.slice(0, -1));
      else onAddChild(pathStack.slice(0, -1), index);
    }
  };

  const handleContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value !== "\n") {
      setUrgentQuery(e.target.value);
    }
  };

  // 마지막 생성된 컴포넌트에 focusing
  useEffect(() => {
    if (isDeleted) return;

    is4Depth && formController.setFocus(formPathKey);
  }, []);

  if (isDeleted) return <></>;

  // 후에 레이아웃 문제에 대비하여 4뎁스 제한
  if (!is4Depth) return null;

  return (
    <>
      <StFieldset>
        <legend>{isQuestion ? "질문" : "답변"}</legend>
        {isQuestion ? (
          <StQuestionLabel bgcolor={labelColor}>질문</StQuestionLabel>
        ) : (
          <StAnswerLabel labelcolor={labelColor} />
        )}
        <StInputWrapper isquestion={isQuestion}>
          <StInput
            {...formController.register(formPathKey)}
            defaultValue={node.content}
            placeholder={`${isQuestion ? "질문" : "답변"}을 입력해주세요.`}
            value={urgentQuery}
            onChange={handleContent}
            onKeyPress={addChildByEnter}
          />
          {isQuestion && (
            <StAddAnswerButton type="button" onClick={() => onAddChild(pathStack, index + 1)}>
              답변
            </StAddAnswerButton>
          )}
          <StMore className="icn_more" />
          <StMenuWrapper>
            {!isQuestion && canAddChild && (
              <StMenuBtn type="button" onClick={() => onAddChild(pathStack)}>
                꼬리질문 추가
              </StMenuBtn>
            )}
            <StMenuBtn type="button" onClick={() => onDeleteChild(pathStack)}>
              삭제
            </StMenuBtn>
          </StMenuWrapper>
        </StInputWrapper>
      </StFieldset>
      <StFieldWrapper isquestion={isQuestion}>
        {node.children &&
          node.children.map((node, i) => (
            <ChildQANode
              key={node.id}
              pathStack={[...pathStack, i]}
              index={i}
              node={node}
              onAddChild={onAddChild}
              onDeleteChild={onDeleteChild}
              onSetContent={onSetContent}
              formController={formController}
            />
          ))}
      </StFieldWrapper>
    </>
  );
}

const StFieldset = styled.fieldset`
  position: relative;
  display: flex;
  align-items: center;

  margin-top: 2.4rem;

  & > legend {
    display: none;
  }
`;

const StQuestionLabel = styled.label<{ bgcolor: string }>`
  margin-right: 1.6rem;
  padding: 0.4rem 1.8rem;

  width: fit-content;

  border-radius: 0.8rem;
  background-color: ${({ bgcolor }) => bgcolor};

  ${({ theme }) => theme.fonts.caption}
  color: ${({ color, theme }) => (color ? color : theme.colors.white)};
`;

const StAnswerLabel = styled.div<{ labelcolor: string }>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 7.6rem;

  width: 0.3rem;

  background-color: ${({ labelcolor }) => labelcolor};
`;

const StInputWrapper = styled.div<{ isquestion: boolean }>`
  display: flex;
  align-items: center;
  flex: 1;
  margin-right: 1.6rem;

  ${({ isquestion }) =>
    isquestion
      ? css`
          border-radius: 0.8rem;
        `
      : css`
          margin-left: 7.6rem;
          border-radius: 0 0.8rem 0.8rem 0;
        `}

  border: 0.2rem solid ${({ theme }) => theme.colors.white400};
  padding-left: 2.4rem;
  padding-right: 1.6rem;
  min-height: 5.4rem;
`;

const StInput = styled(reactTextareaAutosize)`
  flex: 1;
  min-height: 2.9rem;

  ${({ theme }) => theme.fonts.body4}
  color: ${({ theme }) => theme.colors.gray200};

  &::placeholder {
    color: ${({ theme }) => theme.colors.white500};
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

const StMore = styled(StMoreIcon)`
  margin-right: 0;
`;

const StFieldWrapper = styled.article<{ isquestion: boolean }>`
  display: flex;
  flex-direction: column;

  ${({ isquestion }) =>
    !isquestion &&
    css`
      margin-left: 7.6rem;
    `}
`;
