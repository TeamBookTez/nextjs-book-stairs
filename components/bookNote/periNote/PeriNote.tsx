/*
마지막 편집자: 22-06-15 joohaem
변경사항 및 참고:
  - toggleMenu
    
고민점:
  - 
*/

import { css } from "@emotion/react";
import styled from "@emotion/styled";

import { StepUpNDrawerIdx } from "../../../pages/book-note/[reviewId]";
import { DefaultButton } from "../../common/styled/Button";
import StepUpBtn from "../StepUpBtn";

interface PeriNoteProps {
  handleOpenStepUpModal: (i: StepUpNDrawerIdx) => void;
}

export default function PeriNote(props: PeriNoteProps) {
  const { handleOpenStepUpModal } = props;

  // fetch
  // handling data
  // handling saving progress
  // prevent refresh

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

  return (
    <StNoteForm onClick={toggleMenu}>
      <StLabelWrapper>
        <StLabelContainer>
          <StLabel>질문 리스트를 구조화하며 책을 읽어보세요.</StLabel>
          <StepUpBtn onClickStepUpBtn={() => handleOpenStepUpModal(4)} />
        </StLabelContainer>
        {/* <ExButton idx={4} onOpenDrawer={handleOpenDrawer} /> */}
      </StLabelWrapper>
      {/* {data.answerThree?.children &&
        data.answerThree.children.map((node, idx) => (
          <StArticle key={`input-${idx}`}>
            <PriorQuestion
              path={[idx]}
              node={node}
              onAddChild={handleAddChild}
              onSetContent={handleSetContent}
              onDeleteChild={handleDeleteChild}
              formController={{ register, setFocus }}
            />
          </StArticle>
        ))} */}
      {/* <StAddChildButton
        type="button"
        disabled={isPrevented.addQuestion}
        onClick={() => handleAddChild([], data.answerThree.children.length, true)}>
        질문 리스트 추가
      </StAddChildButton> */}
      {/* type을 submit으로 변경하면 페이지를 이동하는 것에 초점을 둬서 제대로 작동하지 않음  */}
      {/* <StSubmitButton
        type="button"
        onClick={submitPeriNote}
        disabled={isPrevented.isCompleted}
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

const StLabelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 4.6rem 0 1.6rem 2rem;
`;

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

const StLabelContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StLabel = styled.label`
  margin-left: 2rem;
  ${({ theme }) => theme.fonts.header3}
  color: ${({ theme }) => theme.colors.gray100};
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
