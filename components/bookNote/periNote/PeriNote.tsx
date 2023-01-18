/*
마지막 편집자: 22-06-18 joohaem
변경사항 및 참고:
  - toggleMenu 살펴보기 (더보기 메뉴 DOM 접근?) / StMoreIcon (.icn_more) - StMenuWrapper (.isPriQ)
  - deepCopyTree --> immer.js 로 변경

고민점:
  - 로그인 loading -> initial periNoteData 표시 -> fetching loading 단계로 로딩이 이루어지는데, 통합이 필요할 것 같습니다,!
    => 기획에서 별 얘기 없으면 해결된 것
  
    - useFetchBookNote 같은 함수들의 pre/peri 의 분리가 필요함 (타입지정 등을 명확히 함으로써 이후의 유지/보수가 원활해질 것)
    - saveStatelessPeriNoteData() 함수 호출의 정의를 명확히 해야 함 (useForm과 useFetchBookNote 데이터의 일치 시점)
*/

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import { StepUpAndDrawerIdx } from "../../../pages/book-note/[reviewId]";
import { UseForm } from "../../../types/bookNote";
import { deepCopyTree, getTargetNodeByPath } from "../../../util/bookNoteTree";
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

  const { periNoteData, setPeriNoteData } = usePeriNote(reviewId);

  const { register, setFocus } = useForm<UseForm>();

  const [isPreventedPeriNote, setIsPreventedPeriNote] = useState({ addQuestion: true, isCompleted: true });

  const handleAddChild = (pathStack: number[], currentIndex?: number) => {
    // currentIndex가 있으면 "answer", 없으면 "question" 추가
    const isAddAnswer = currentIndex !== undefined;
    const newRoot = deepCopyTree(periNoteData.answerThree);
    const targetNode = getTargetNodeByPath(newRoot, pathStack);

    if (isAddAnswer) {
      targetNode.children.splice(currentIndex + 1, 0, {
        id: uuidv4(),
        type: "answer",
        content: "",
        children: [],
      });
    } else {
      targetNode.children.push({
        id: uuidv4(),
        type: "question",
        content: "",
        children: [
          {
            id: uuidv4(),
            type: "answer",
            content: "",
            children: [],
          },
        ],
      });
    }

    setPeriNoteData((current) => ({ ...current, answerThree: newRoot }));
  };

  const handleSetContent = (value: string, pathStack: number[]) => {
    const newRoot = deepCopyTree(periNoteData.answerThree);
    const current = getTargetNodeByPath(newRoot, pathStack);

    current.content = value;

    setPeriNoteData((current) => ({ ...current, answerThree: newRoot }));
  };

  const handleDeleteChild = (pathStack: number[]) => {
    const newRoot = deepCopyTree(periNoteData.answerThree);
    // 삭제할 때는 자신의 부모를 찾아서 children을 제거
    const parent = getTargetNodeByPath(newRoot, pathStack.slice(0, -1));

    // parent.children.splice(pathStack[pathStack.length - 1], 1);
    parent.children[pathStack[pathStack.length - 1]] = {
      ...parent.children[pathStack[pathStack.length - 1]],
      type: "deleted",
    };

    setPeriNoteData((current) => ({ ...current, answerThree: newRoot }));
  };

  // 규민아 이거 ref로 바꿀 수 있을까?
  function toggleMenu(e: React.MouseEvent<HTMLFormElement, MouseEvent>) {
    // as를 없애고 싶다
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
            onAddTopAnswer={handleAddChild}
            onDeleteChild={handleDeleteChild}
            onSetContent={handleSetContent}
          />
          {topQuestionNode.children.map((topAnswerNode, topAnswerIdx) => (
            <TopAnswerContainer
              key={topAnswerNode.id}
              index={topAnswerIdx}
              pathStack={[topQuestionIdx, topAnswerIdx]}
              node={topAnswerNode}
              onAddChild={handleAddChild}
              onDeleteChild={handleDeleteChild}
              onSetContent={handleSetContent}>
              {topAnswerNode.children.map((childQANode, childQAIdx) => (
                <ChildQANode
                  key={childQANode.id}
                  pathStack={[topQuestionIdx, topAnswerIdx, childQAIdx]}
                  index={childQAIdx}
                  node={childQANode}
                  onAddChild={handleAddChild}
                  onSetContent={handleSetContent}
                  onDeleteChild={handleDeleteChild}
                  formController={{ register, setFocus }}
                />
              ))}
            </TopAnswerContainer>
          ))}
        </React.Fragment>
      ))}

      <StAddChildButton type="button" disabled={isPreventedPeriNote.addQuestion} onClick={() => handleAddChild([])}>
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
