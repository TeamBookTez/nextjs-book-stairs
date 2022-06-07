import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useEffect } from "react";

import { DrawerIdx } from "../../../pages/book-note/[reviewId]";
import { DefaultButton } from "../../common/styled/Button";
import LinkToSignUpSection from "./LinkToSignUpSection";
import PreNoteFormContainer from "./PreNoteFormContainer";
import PreNoteThirdArticle from "./PreNoteThirdArticle";

interface PreNoteProps {
  handleExitModal: () => void;
  handleOpenStepUpModal: (i: DrawerIdx) => void;
  handleOpenDrawer: (i: DrawerIdx) => void;
  handleCloseDrawer: () => void;
}

export default function PreNote(props: PreNoteProps) {
  const { handleExitModal, handleOpenStepUpModal, handleOpenDrawer, handleCloseDrawer } = props;

  const isLogin = true;

  const preventGoBack = () => {
    history.pushState(null, "", location.href);
    handleExitModal();
  };

  useEffect(() => {
    history.pushState(null, "", location.href);
    window.addEventListener("popstate", preventGoBack);

    return () => {
      window.removeEventListener("popstate", preventGoBack);
      handleCloseDrawer();
    };
  }, []);

  return (
    <StNoteForm onSubmit={(e) => e.preventDefault()}>
      <StFormHead>책을 넘기기 전 독서전략을 세워보아요.</StFormHead>
      <StFormWrapper>
        <PreNoteFormContainer
          onClickStepUpBtn={() => handleOpenStepUpModal(1)}
          onClickOpenDrawer={() => handleOpenDrawer(1)}>
          <StTextarea placeholder="답변을 입력해주세요." />
        </PreNoteFormContainer>
        <PreNoteFormContainer
          onClickStepUpBtn={() => handleOpenStepUpModal(2)}
          onClickOpenDrawer={() => handleOpenDrawer(2)}>
          <StTextarea placeholder="답변을 입력해주세요." />
        </PreNoteFormContainer>
        {isLogin ? (
          <PreNoteFormContainer
            onClickStepUpBtn={() => handleOpenStepUpModal(3)}
            onClickOpenDrawer={() => handleOpenDrawer(3)}>
            <PreNoteThirdArticle />
          </PreNoteFormContainer>
        ) : (
          <LinkToSignUpSection />
        )}
      </StFormWrapper>
      <StNextBtn type="button">다음 계단</StNextBtn>
    </StNoteForm>
  );
}

const StNoteForm = styled.form`
  width: 100%;
  max-height: fit-content;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const StFormWrapper = styled.section`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 12.8rem;
`;

const StFormHead = styled.h2`
  width: 100%;

  padding: 4.5rem 0 4.5rem 2rem;

  ${({ theme }) => theme.fonts.header3};
`;

const StTextarea = styled.textarea`
  width: 100%;
  height: 15.4rem;

  resize: none;
  border: none;

  color: ${({ theme }) => theme.colors.gray100};
  ${({ theme }) => theme.fonts.body4}

  &::placeholder {
    color: ${({ theme }) => theme.colors.white500};
    ${({ theme }) => theme.fonts.body4}
  }
`;

const StNextBtn = styled(DefaultButton)`
  width: 32.5rem;

  margin-top: 10rem;
  padding: 1.6rem 13rem;

  border-radius: 1rem;

  background-color: ${({ disabled, theme }) => (disabled ? theme.colors.white400 : theme.colors.orange100)};
  color: ${({ disabled, theme }) => (disabled ? theme.colors.gray300 : theme.colors.white)};
  ${({ theme }) => theme.fonts.button};

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: default;
    `}
`;
