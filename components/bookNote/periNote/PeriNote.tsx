/*
마지막 편집자: 22-06-18 joohaem
변경사항 및 참고:
  - TopQuestionContainer 안에 TopAnswerContainer 안에 ChildQANode
  - toggleMenu 살펴보기
    
고민점:
  - 
*/

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";

import { StepUpNDrawerIdx } from "../../../pages/book-note/[reviewId]";
import { PeriNoteData } from "../../../types/bookNote";
import useFetchBookNote from "../../../util/hooks/useFetchBookNote";
import { DefaultButton } from "../../common/styled/Button";
import { HeaderLabel } from ".";
import TopQuestionContainer from "./TopQuestionContainer";

interface PeriNoteProps {
  reviewId: string;
  handleOpenStepUpModal: (i: StepUpNDrawerIdx) => void;
  handleOpenDrawer: (i: StepUpNDrawerIdx) => void;
}

const initialPeriNoteData: PeriNoteData = {
  answerThree: {
    type: "ROOT",
    content: "root",
    children: [{ type: "question", content: "", children: [{ type: "answer", content: "", children: [] }] }],
  },
  reviewSt: 3,
};

export default function PeriNote(props: PeriNoteProps) {
  const { reviewId, handleOpenStepUpModal, handleOpenDrawer } = props;

  const { data, setData, isLoading } = useFetchBookNote<PeriNoteData>(`/review/${reviewId}/peri`, initialPeriNoteData);

  // handling data
  // handling saving progress
  // prevent refresh

  const [isPreventedPeriNote, setIsPreventedPeriNote] = useState({ addQuestion: true, isCompleted: true });

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

  return (
    <StNoteForm onClick={toggleMenu}>
      <HeaderLabel handleOpenStepUpModal={handleOpenStepUpModal} handleOpenDrawer={handleOpenDrawer} />

      {data.answerThree?.children &&
        data.answerThree.children.map((node, idx) => <TopQuestionContainer key={`questionList-${idx}`} />)}

      {/* 컴포넌트 분리 */}
      {/* <StAddChildButton
        type="button"
        disabled={isPreventedPeriNote.addQuestion}
        onClick={() => handleAddChild([], data.answerThree.children.length, true)}>
        질문 리스트 추가
      </StAddChildButton> */}

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
