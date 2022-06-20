/*
마지막 편집자: 22-06-18 joohaem
변경사항 및 참고:
  - TopQuestionContainer 안에 TopAnswerContainer 안에 ChildQANode

  - toggleMenu 살펴보기 (더보기 메뉴 DOM 접근?) / StMoreIcon (.icn_more) - StMenuWrapper (.isPriQ)
  - deepCopyTree --> immer.js 로 변경
    
고민점:
  - 로그인 loading -> initial data 표시 -> fetching loading 단계로 로딩이 이루어지는데, 통합이 필요할 것 같습니다,!
*/

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { StepUpNDrawerIdx } from "../../../pages/book-note/[reviewId]";
import { PeriNoteData, UseForm } from "../../../types/bookNote";
import { deepCopyTree, getNodeByPath } from "../../../util/bookNoteTree";
import useFetchBookNote from "../../../util/hooks/useFetchBookNote";
import { Loading } from "../../common";
import { DefaultButton } from "../../common/styled/Button";
import { HeaderLabel } from ".";
import ChildQANode from "./ChildQANode";
import TopAnswerContainer from "./TopAnswerContainer";
import TopQuestionContainer from "./TopQuestionContainer";

interface PeriNoteProps {
  reviewId: string;
  handleOpenStepUpModal: (i: StepUpNDrawerIdx) => void;
  handleOpenDrawer: (i: StepUpNDrawerIdx) => void;
}

const initialPeriNoteData: PeriNoteData = {
  answerThree: {
    type: "Root",
    content: "root",
    children: [
      {
        type: "question",
        content: "",
        children: [{ type: "answer", content: "", children: [] }],
      },
    ],
  },
  reviewSt: 3,
};

export default function PeriNote(props: PeriNoteProps) {
  const { reviewId, handleOpenStepUpModal, handleOpenDrawer } = props;

  const { data, setData, isLoading } = useFetchBookNote<PeriNoteData>(`/review/${reviewId}/peri`, initialPeriNoteData);

  const { getValues, register, setFocus } = useForm<UseForm>();

  const [isPreventedPeriNote, setIsPreventedPeriNote] = useState({ addQuestion: true, isCompleted: true });

  const handleAddChild = (path: number[], currentIndex?: number) => {
    // currentIndex가 있으면 "answer", 없으면 "question" 추가
    const newRoot = currentIndex ? saveStatelessPeriNoteData() : deepCopyTree(data.answerThree);
    const current = getNodeByPath(newRoot, path);

    if (currentIndex) {
      current.children.splice(currentIndex + 1, 0, {
        type: "answer",
        content: "",
        children: [],
      });
    } else {
      current.children.push({
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

    setData({ ...data, answerThree: newRoot });
  };

  // add answer 혹은 save(submit) 시에 useForm으로 관리했던 객체 업데이트
  const saveStatelessPeriNoteData = () => {
    const obj = getValues();

    const keys = Object.keys(obj);
    const newRoot = deepCopyTree(data.answerThree);

    keys.map((key) => {
      const value = obj[key];
      const pathKey = key.split(",").map((k) => parseInt(k));

      const current = getNodeByPath(newRoot, pathKey);

      current.content = value;
    });

    // data state에도 저장
    setData((current) => ({ ...current, answerThree: newRoot }));

    return newRoot;
  };

  const handleSetContent = (value: string, path: number[]) => {
    const newRoot = deepCopyTree(data.answerThree);
    const current = getNodeByPath(newRoot, path);

    current.content = value;

    setData({ ...data, answerThree: newRoot });
  };

  const handleDeleteChild = (path: number[]) => {
    const newRoot = deepCopyTree(data.answerThree);
    // 삭제할 때는 자신의 부모를 찾아서 children을 제거
    const parent = getNodeByPath(newRoot, path.slice(0, -1));

    parent.children.splice(path[path.length - 1], 1);
    setData({ ...data, answerThree: newRoot });
  };

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
    if (!data.answerThree.children.length) {
      setIsPreventedPeriNote({ addQuestion: false, isCompleted: true });
    } else {
      // 질문이 모두 채워져 있으면 addQuestion의 isPrevented를 false
      if (data.answerThree.children.every((nodeList) => nodeList.content !== "")) {
        // 질문이 모두 채워진 상태에서 답변이 채워지면 모두 false
        if (data.answerThree.children.every((nodeList) => nodeList.children.every((node) => node.content !== ""))) {
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
  }, [data.answerThree]);

  if (isLoading) return <Loading />;

  return (
    <StNoteForm onClick={toggleMenu}>
      <HeaderLabel handleOpenStepUpModal={handleOpenStepUpModal} handleOpenDrawer={handleOpenDrawer} />

      {/* 컴포넌트 분리 */}
      {data.answerThree.children.map((topQuestionNode, topQuestionIdx) => (
        <React.Fragment key={`questionList-${topQuestionIdx}`}>
          <TopQuestionContainer
            path={[topQuestionIdx]}
            node={topQuestionNode}
            onAddTopAnswer={handleAddChild}
            onDeleteChild={handleDeleteChild}
            onSetContent={handleSetContent}
          />
          {topQuestionNode.children.map((topAnswerNode, topAnswerIdx) => (
            <TopAnswerContainer
              key={`topAnswerContainer-${topQuestionIdx}`}
              index={topAnswerIdx}
              path={[topQuestionIdx, topAnswerIdx]}
              node={topAnswerNode}
              onAddChild={handleAddChild}
              onDeleteChild={handleDeleteChild}
              onSetContent={handleSetContent}>
              {topAnswerNode.children.map((childQANode, childQAIdx) => (
                <ChildQANode
                  key={`childQANode-${topAnswerIdx}-${childQAIdx}`}
                  path={[topQuestionIdx, topAnswerIdx, childQAIdx]}
                  index={childQAIdx}
                  node={childQANode}
                  onAddChild={handleAddChild}
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

      {/* 컴포넌트 분리 */}
      {/* type을 submit으로 변경하면 페이지를 이동하는 것에 초점을 둬서 제대로 작동하지 않음  */}
      {/* <StSubmitButton
        type="button"  
        onClick={submitPeriNote}
        disabled={isPreventedPeriNote.isCompleted}
        id="btn_complete_reading">
        작성 완료
      </StSubmitButton> */}
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

const StSubmitButton = styled(DefaultButton)<{ disabled: boolean }>`
  margin-top: 6rem;
  margin-left: auto;
  border-radius: 1rem;

  width: 32.5rem;
  height: 5.6rem;
  ${({ theme }) => theme.fonts.button}

  background-color: ${({ disabled, theme }) => (disabled ? theme.colors.white400 : theme.colors.orange100)};
  color: ${({ disabled, theme }) => (disabled ? theme.colors.gray300 : theme.colors.white)};

  ${({ disabled }) =>
    disabled &&
    css`
      &:hover {
        cursor: default;
      }
    `}
`;
