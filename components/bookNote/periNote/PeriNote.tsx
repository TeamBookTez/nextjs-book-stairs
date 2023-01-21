/*
마지막 편집자: 22-06-18 joohaem
변경사항 및 참고:
  - toggleMenu 살펴보기 (더보기 메뉴 DOM 접근?) / StMoreIcon (.icn_more) - StMenuWrapper (.isPriQ)
  - deepCopyTree --> immer.js 로 변경

고민점:
  - 로그인 loading -> initial periNoteData 표시 -> fetching loading 단계로 로딩이 이루어지는데, 통합이 필요할 것 같습니다,!
    => 기획에서 별 얘기 없으면 해결된 것
*/

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";

import { StepUpAndDrawerIdx } from "../../../pages/book-note/[reviewId]";
import usePeriNote from "../../../util/hooks/bookNote/usePeriNote";
import { DefaultButton } from "../../common/styled/Button";
import { ChildQANode, HeaderLabel, PeriNotePostSection, TopAnswerContainer, TopQuestionContainer } from ".";

interface PeriNoteProps {
  reviewId: string;
  handleOpenStepUpModal: (i: StepUpAndDrawerIdx) => void;
  handleOpenDrawer: (i: StepUpAndDrawerIdx) => void;
}

export default function PeriNote(props: PeriNoteProps) {
  const { reviewId, handleOpenStepUpModal, handleOpenDrawer } = props;

  const [isPreventedPeriNote, setIsPreventedPeriNote] = useState({ addQuestion: true, isCompleted: true });
  const {
    periNoteData,
    handleAddChildAnswer,
    handleAddSiblingAnswer,
    handleAddChildQuestion,
    handleAddSiblingQuestion,
    handleSetContent,
    handleDeleteChild,
  } = usePeriNote(reviewId);

  // TODO :: Ref 이용
  function toggleMenu(e: React.MouseEvent<HTMLFormElement, MouseEvent>) {
    // TODO :: as 삭제
    const targetElement = e.target as HTMLElement;

    if (!targetElement.closest(".icn_more")) {
      const element = document.querySelector(".open") as HTMLElement;

      if (element) {
        element.style.display = "none";
        element.classList.remove("open");
      }

      return;
    }

    const miniMenu = targetElement.closest(".icn_more")?.nextElementSibling;

    if (miniMenu === null || miniMenu === undefined || !(miniMenu instanceof HTMLElement)) return;

    if (miniMenu.style.display === "none") {
      miniMenu.style.display = "block";
      miniMenu.classList.add("open");
    } else {
      miniMenu.style.display = "none";
      miniMenu.classList.remove("open");
    }
  }

  useEffect(() => {
    // 모든 질문 리스트가 지워졌을 경우에는 질문 리스트 추가만 가능하게 하고, 작성완료는 불가하게 함
    if (!periNoteData.answerThree.children.length) {
      setIsPreventedPeriNote({ addQuestion: false, isCompleted: true });
    } else {
      // 질문이 모두 채워져 있으면 addQuestion의 isPrevented를 false
      if (periNoteData.answerThree.children.every((nodeList) => nodeList.content !== "")) {
        // 질문이 모두 채워진 상태에서 답변이 채워지면 모두 false
        if (
          periNoteData.answerThree.children.every((nodeList) => nodeList.children.every((node) => node.content !== ""))
        ) {
          setIsPreventedPeriNote({ addQuestion: false, isCompleted: false });
        } else {
          // 답변만 비워있으면 isCompleted만 true
          setIsPreventedPeriNote({ addQuestion: false, isCompleted: true });
        }
      } else {
        // 질문이 비워져있으면 둘 다 true;
        setIsPreventedPeriNote({ addQuestion: true, isCompleted: true });
      }
    }
  }, [periNoteData.answerThree]);

  // --------------------------------------------------------------------------

  return (
    <StNoteForm onClick={toggleMenu}>
      <HeaderLabel handleOpenStepUpModal={handleOpenStepUpModal} handleOpenDrawer={handleOpenDrawer} />

      {periNoteData.answerThree.children.map((topQuestionNode, topQuestionIdx) => (
        <React.Fragment key={topQuestionNode.id}>
          <TopQuestionContainer
            pathStack={[topQuestionIdx]}
            node={topQuestionNode}
            onAddTopAnswer={handleAddSiblingAnswer}
            onDeleteChild={handleDeleteChild}
            onSetContent={handleSetContent}
          />
          {topQuestionNode.children.map((topAnswerNode, topAnswerIdx) => (
            <TopAnswerContainer
              key={topAnswerNode.id}
              index={topAnswerIdx}
              pathStack={[topQuestionIdx, topAnswerIdx]}
              node={topAnswerNode}
              onAddSiblingAnswer={handleAddSiblingAnswer}
              onAddChildQuestion={handleAddChildQuestion}
              onDeleteChild={handleDeleteChild}
              onSetContent={handleSetContent}>
              {topAnswerNode.children.map((childQANode, childQAIdx) => (
                <ChildQANode
                  key={childQANode.id}
                  pathStack={[topQuestionIdx, topAnswerIdx, childQAIdx]}
                  index={childQAIdx}
                  node={childQANode}
                  onAddChildQuestion={handleAddChildQuestion}
                  onAddSiblingQuestion={handleAddSiblingQuestion}
                  onAddChildAnswer={handleAddChildAnswer}
                  onAddSiblingAnswer={handleAddSiblingAnswer}
                  onSetContent={handleSetContent}
                  onDeleteChild={handleDeleteChild}
                />
              ))}
            </TopAnswerContainer>
          ))}
        </React.Fragment>
      ))}

      <StAddChildButton
        type="button"
        disabled={isPreventedPeriNote.addQuestion}
        onClick={() => handleAddChildQuestion([])}>
        질문 리스트 추가
      </StAddChildButton>

      <PeriNotePostSection reviewId={reviewId} isPreventedPeriNoteComplete={isPreventedPeriNote.isCompleted} />
    </StNoteForm>
  );
}

const StNoteForm = styled.form`
  display: flex;
  flex-direction: column;

  width: 100%;

  max-height: fit-content;
`;

const StAddChildButton = styled(DefaultButton)<{ disabled: boolean }>`
  margin-top: 1rem;
  padding: 2.35rem 0;
  background-color: ${({ theme }) => theme.colors.white};
  border: 0.1rem solid ${({ theme }) => theme.colors.white400};
  border-radius: 1.6rem;

  width: 100%;
  color: ${({ theme, disabled }) => (disabled ? theme.colors.white500 : theme.colors.gray100)};
  ${({ theme }) => theme.fonts.button}

  ${({ disabled }) =>
    disabled &&
    css`
      &:hover {
        cursor: default;
      }
    `}
`;
