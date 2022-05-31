import { css } from "@emotion/react";
import styled from "@emotion/styled";

import { DefaultButton } from "../../common/styled/Button";
import LinkToSignUpSection from "./LinkToSignUpSection";
import PreNoteFormContainer from "./PreNoteFormContainer";
import PreNoteThirdArticle from "./PreNoteThirdArticle";

export default function PreNote() {
  const isLogin = true;

  return (
    <StNoteForm onSubmit={(e) => e.preventDefault()}>
      <StFormHead>책을 넘기기 전 독서전략을 세워보아요.</StFormHead>
      <StFormWrapper>
        <PreNoteFormContainer>
          <StTextarea placeholder="답변을 입력해주세요." />
        </PreNoteFormContainer>
        <PreNoteFormContainer>
          <StTextarea placeholder="답변을 입력해주세요." />
        </PreNoteFormContainer>
        {isLogin ? (
          <PreNoteFormContainer>
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
