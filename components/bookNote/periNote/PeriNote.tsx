/*
마지막 편집자: 22-06-18 joohaem
변경사항 및 참고:
  - TopQuestionContainer 안에 TopAnswerContainer 안에 ChildQANode

  - toggleMenu 살펴보기 (더보기 메뉴 DOM 접근?) / StMoreIcon (.icn_more) - StMenuWrapper (.isPriQ)
  - deepCopyTree --> immer.js 로 변경

고민점:
  - 로그인 loading -> initial data 표시 -> fetching loading 단계로 로딩이 이루어지는데, 통합이 필요할 것 같습니다,!
    => 기획에서 별 얘기 없으면 해결된 것
*/
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { patchBookNote } from "../../../core/api";
import { StepUpAndDrawerIdx } from "../../../pages/book-note/[reviewId]";
import { IPeriNoteData, SavingProgress, UseForm } from "../../../types/bookNote";
import { deepCopyTree, getTargetNodeByPath, initialPeriNoteData } from "../../../util/bookNoteTree";
import useFetchBookNote from "../../../util/hooks/useFetchBookNote";
import { Loading } from "../../common";
import { DefaultButton } from "../../common/styled/Button";
import { ChildQANode, HeaderLabel, PeriNotePostSection, TopAnswerContainer, TopQuestionContainer } from ".";

interface PeriNoteProps {
  reviewId: string;
  handleOpenStepUpModal: (i: StepUpAndDrawerIdx) => void;
  handleOpenDrawer: (i: StepUpAndDrawerIdx) => void;
  savingProgress: SavingProgress;
  handleSavingProgress: (obj: SavingProgress) => void;
}

export default function PeriNote(props: PeriNoteProps) {
  const { reviewId, handleOpenStepUpModal, handleOpenDrawer, savingProgress, handleSavingProgress } = props;

  const {
    data: periNoteData,
    setData: setPeriNoteData,
    isLoading,
  } = useFetchBookNote<IPeriNoteData>(`/review/${reviewId}/peri`, initialPeriNoteData);

  const { getValues, register, setFocus } = useForm<UseForm>();

  const textAreaRef = useRef<HTMLTextAreaElement[]>([]);

  const [isPreventedPeriNote, setIsPreventedPeriNote] = useState({ addQuestion: true, isCompleted: true });

  const handleAddChild = (pathStack: number[], curChildIdx?: number) => {
    // currentIndex가 있으면 "answer", 없으면 "question" 추가
    const isAddAnswer = curChildIdx !== undefined;
    const newRoot = isAddAnswer ? saveStatelessPeriNoteData() : deepCopyTree(periNoteData.answerThree);
    const target = getTargetNodeByPath(newRoot, pathStack);

    if (isAddAnswer) {
      target.children.splice(curChildIdx + 1, 0, {
        type: "answer",
        content: "",
        children: [],
      });
    } else {
      target.children.push({
        type: "question",
        content: "",
        children: [
          {
            type: "answer",
            content: "",
            children: [],
          },
        ],
      });
    }

    setPeriNoteData({ ...periNoteData, answerThree: newRoot });
  };

  const handleDeleteChild = (pathStack: number[]) => {
    const newRoot = deepCopyTree(periNoteData.answerThree);
    // 삭제할 때는 자신의 부모를 찾아서 children을 제거
    const parent = getTargetNodeByPath(newRoot, pathStack.slice(0, -1));

    parent.children.splice(pathStack[pathStack.length - 1], 1);
    setPeriNoteData({ ...periNoteData, answerThree: newRoot });
  };

  const handleSetContent = (value: string, pathStack: number[]) => {
    const newRoot = deepCopyTree(periNoteData.answerThree);
    const target = getTargetNodeByPath(newRoot, pathStack);

    target.content = value;

    setPeriNoteData({ ...periNoteData, answerThree: newRoot });
  };

  // add answer 혹은 save(submit) 시에 useForm으로 관리했던 객체 업데이트
  const saveStatelessPeriNoteData = () => {
    const obj = getValues();

    const keys = Object.keys(obj);
    const newRoot = deepCopyTree(periNoteData.answerThree);

    keys.map((key) => {
      const value = obj[key];
      const pathKey = key.split(",").map((k) => parseInt(k));

      const target = getTargetNodeByPath(newRoot, pathKey);

      target.content = value;
    });

    // periNoteData state에도 저장
    setPeriNoteData((target) => ({ ...target, answerThree: newRoot }));

    return newRoot;
  };

  // 규민아 이거 ref로 바꿀 수 있을까?
  const toggleMenu = (e: React.MouseEvent<HTMLFormElement, MouseEvent>) => {
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
  };

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

  // 네비게이션 바 클릭 시 or 저장하기 버튼 클릭 시 isPending: true
  // 처음 periNoteData 를 fetch 하기 전 initialData 가 곧바로 저장되는 현상을 막아줌
  useEffect(() => {
    if (periNoteData !== initialPeriNoteData && savingProgress.isPending === true) {
      const _savingProgress = { isPending: false, isError: false };

      try {
        patchBookNote(`/review/${reviewId}/peri`, { ...periNoteData, answerThree: saveStatelessPeriNoteData() });
      } catch {
        _savingProgress.isError = true;
      } finally {
        handleSavingProgress(_savingProgress);
      }
    }
  }, [savingProgress.isPending]);

  useEffect(() => {
    if (textAreaRef.current) {
      console.log(textAreaRef);
      // 여기서 조건처리로 큰질문 & 답변에 대한 처리를 해줄 예정입니다.
      // focus를 어떻게 쓰면 좋을지 생각중입니다.
    }
  });

  // --------------------------------------------------------------------------

  if (isLoading) return <Loading />;

  return (
    <StNoteForm onClick={toggleMenu}>
      <HeaderLabel handleOpenStepUpModal={handleOpenStepUpModal} handleOpenDrawer={handleOpenDrawer} />

      {periNoteData.answerThree.children.map((topQuestionNode, topQuestionIdx) => (
        <React.Fragment key={`questionList-${topQuestionIdx}`}>
          <TopQuestionContainer
            inheritRef={textAreaRef}
            pathStack={[topQuestionIdx]}
            topQuestionNode={topQuestionNode}
            onAddTopAnswer={handleAddChild}
            onDeleteChild={handleDeleteChild}
            onSetContent={handleSetContent}
          />
          {topQuestionNode.children.map((topAnswerNode, topAnswerIdx) => (
            <TopAnswerContainer
              key={`topAnswerContainer-${topAnswerIdx}`}
              inheritRef={textAreaRef}
              index={topAnswerIdx}
              pathStack={[topQuestionIdx, topAnswerIdx]}
              topAnswerNode={topAnswerNode}
              onAddChild={handleAddChild}
              onDeleteChild={handleDeleteChild}
              onSetContent={handleSetContent}>
              {topAnswerNode.children.map((childQANode, childQAIdx) => (
                <ChildQANode
                  key={`childQANode-${childQAIdx}`}
                  pathStack={[topQuestionIdx, topAnswerIdx, childQAIdx]}
                  index={childQAIdx}
                  childQANode={childQANode}
                  onAddChild={handleAddChild}
                  onDeleteChild={handleDeleteChild}
                  onSetContent={handleSetContent}
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

      <PeriNotePostSection
        reviewId={reviewId}
        saveStatelessPeriNoteData={saveStatelessPeriNoteData}
        isPreventedPeriNoteComplete={isPreventedPeriNote.isCompleted}
      />
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
