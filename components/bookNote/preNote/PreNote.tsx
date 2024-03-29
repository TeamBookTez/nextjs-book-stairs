import styled from "@emotion/styled";
import { useEffect, useState } from "react";

import { StepUpAndDrawerIdx } from "../../../pages/book-note/[reviewId]";
import { BookNotePathKey } from "../../../types/bookNote";
import usePreNote from "../../../util/hooks/bookNote/usePreNote";
import { LinkToSignUpSection, PreNoteFormContainer, PreNotePostSection, PreNoteThirdArticle } from ".";

interface PreNoteProps {
  isLogin: boolean;
  reviewId: string;
  handleOpenStepUpModal: (i: StepUpAndDrawerIdx) => void;
  handleOpenDrawer: (i: StepUpAndDrawerIdx) => void;
  isPreventedPreNote: boolean;
  handlePrevent: (shouldPrevent: boolean) => void;
  handleNavIndex: (idx: BookNotePathKey) => void;
}

export default function PreNote(props: PreNoteProps) {
  const {
    isLogin,
    reviewId,
    handleOpenStepUpModal,
    handleOpenDrawer,
    isPreventedPreNote,
    handlePrevent,
    handleNavIndex,
  } = props;

  const { preNoteData, setPreNoteData } = usePreNote(reviewId);

  const [isFilled, setIsFilled] = useState<boolean>(false);
  const [isFilledOnlyThree, setIsFilledOnlyThree] = useState<boolean>(false);

  const handleChangeReview = <K extends keyof typeof preNoteData, V extends typeof preNoteData[K]>(
    key: K,
    value: V,
  ): void => {
    setPreNoteData((currentNote) => {
      const newData = { ...currentNote };

      newData[key] = value;

      return newData;
    });
  };

  useEffect(() => {
    if (preNoteData && preNoteData.reviewSt > 2) {
      handlePrevent(false);
      setIsFilled(true);
      setIsFilledOnlyThree(true);
    } else {
      handlePrevent(true);
    }

    if (preNoteData && preNoteData.answerOne && preNoteData.answerTwo && !preNoteData.questionList.includes("")) {
      setIsFilled(true);
      setIsFilledOnlyThree(true);
    } else if (preNoteData && !preNoteData.questionList.includes("")) {
      setIsFilled(false);
      setIsFilledOnlyThree(true);
    } else {
      setIsFilled(false);
      setIsFilledOnlyThree(false);
    }
  }, [preNoteData]);

  return (
    <StNoteForm onSubmit={(e) => e.preventDefault()}>
      <StFormHead>책을 넘기기 전 독서전략을 세워보아요.</StFormHead>
      <StFormWrapper>
        <PreNoteFormContainer
          isLogin={isLogin}
          idx={1}
          onClickStepUpBtn={() => handleOpenStepUpModal(1)}
          onClickOpenDrawer={() => handleOpenDrawer(1)}>
          <StTextarea
            placeholder="답변을 입력해주세요."
            value={preNoteData && preNoteData.answerOne}
            onChange={(e) => handleChangeReview("answerOne", e.target.value)}
          />
        </PreNoteFormContainer>
        <PreNoteFormContainer
          isLogin={isLogin}
          idx={2}
          onClickStepUpBtn={() => handleOpenStepUpModal(2)}
          onClickOpenDrawer={() => handleOpenDrawer(2)}>
          <StTextarea
            placeholder="답변을 입력해주세요."
            value={preNoteData && preNoteData.answerTwo}
            onChange={(e) => handleChangeReview("answerTwo", e.target.value)}
          />
        </PreNoteFormContainer>
        {isLogin ? (
          <PreNoteFormContainer
            isLogin={isLogin}
            idx={3}
            onClickStepUpBtn={() => handleOpenStepUpModal(3)}
            onClickOpenDrawer={() => handleOpenDrawer(3)}>
            <PreNoteThirdArticle
              questionList={preNoteData && preNoteData.questionList}
              onChangeReview={handleChangeReview}
              isPreventedPreNote={isPreventedPreNote}
              isFilledOnlyThree={isFilledOnlyThree}
            />
          </PreNoteFormContainer>
        ) : (
          <LinkToSignUpSection />
        )}
      </StFormWrapper>

      <PreNotePostSection
        reviewId={reviewId}
        isDisabledNextButton={!isFilled || preNoteData.questionList.length === 0}
        handlePrevent={handlePrevent}
        handleNavIndex={handleNavIndex}
      />
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
