import styled from "@emotion/styled";
import { useEffect, useState } from "react";

import { patchBookNote } from "../../../core/api";
import { StepUpAndDrawerIdx } from "../../../pages/book-note/[reviewId]";
import { BookNotePathKey, PreNoteData, SavingProgress } from "../../../types/bookNote";
import useFetchBookNote from "../../../util/hooks/useFetchBookNote";
import { Loading } from "../../common";
import { LinkToSignUpSection, PreNoteFormContainer, PreNotePostSection, PreNoteThirdArticle } from ".";

interface PreNoteProps {
  isLogin: boolean;
  reviewId: string;
  handleOpenStepUpModal: (i: StepUpAndDrawerIdx) => void;
  handleOpenDrawer: (i: StepUpAndDrawerIdx) => void;
  isPreventedPreNote: boolean;
  handlePrevent: (shouldPrevent: boolean) => void;
  handleNavIndex: (idx: BookNotePathKey) => void;
  savingProgress: SavingProgress;
  handleSavingProgress: (obj: SavingProgress) => void;
}

const initialPreNoteData: PreNoteData = {
  answerOne: "",
  answerTwo: "",
  questionList: [""],
  reviewSt: 2,
  finishSt: false,
};

export default function PreNote(props: PreNoteProps) {
  const {
    isLogin,
    reviewId,
    handleOpenStepUpModal,
    handleOpenDrawer,
    isPreventedPreNote,
    handlePrevent,
    handleNavIndex,
    savingProgress,
    handleSavingProgress,
  } = props;

  const { data, setData, isLoading } = useFetchBookNote<PreNoteData>(`/review/${reviewId}/pre`, initialPreNoteData);

  const [isFilled, setIsFilled] = useState<boolean>(false);
  const [isFilledOnlyThree, setIsFilledOnlyThree] = useState<boolean>(false);

  const handleChangeReview = <K extends keyof typeof data, V extends typeof data[K]>(key: K, value: V): void => {
    setData((currentNote) => {
      const newData = { ...currentNote };

      newData[key] = value;

      return newData;
    });
  };

  useEffect(() => {
    if (data && data.reviewSt > 2) {
      handlePrevent(false);
      setIsFilled(true);
      setIsFilledOnlyThree(true);
    } else {
      handlePrevent(true);
    }

    if (data && data.answerOne && data.answerTwo && !data.questionList.includes("")) {
      setIsFilled(true);
      setIsFilledOnlyThree(true);
    } else if (data && !data.questionList.includes("")) {
      setIsFilled(false);
      setIsFilledOnlyThree(true);
    } else {
      setIsFilled(false);
      setIsFilledOnlyThree(false);
    }
  }, [data]);

  // ??????????????? ??? ?????? ??? or ???????????? ?????? ?????? ??? isPending: true
  // ?????? data ??? fetch ?????? ??? initialData ??? ????????? ???????????? ????????? ?????????
  useEffect(() => {
    if (data !== initialPreNoteData && savingProgress.isPending === true) {
      const _savingProgress = { isPending: false, isError: false };

      try {
        patchBookNote(`/review/${reviewId}/pre`, data);
      } catch {
        _savingProgress.isError = true;
      } finally {
        handleSavingProgress(_savingProgress);
      }
    }
  }, [savingProgress.isPending]);

  // --------------------------------------------------------------------------

  if (isLoading) return <Loading />;

  return (
    <StNoteForm onSubmit={(e) => e.preventDefault()}>
      <StFormHead>?????? ????????? ??? ??????????????? ???????????????.</StFormHead>
      <StFormWrapper>
        <PreNoteFormContainer
          isLogin={isLogin}
          idx={1}
          onClickStepUpBtn={() => handleOpenStepUpModal(1)}
          onClickOpenDrawer={() => handleOpenDrawer(1)}>
          <StTextarea
            placeholder="????????? ??????????????????."
            value={data && data.answerOne}
            onChange={(e) => handleChangeReview("answerOne", e.target.value)}
          />
        </PreNoteFormContainer>
        <PreNoteFormContainer
          isLogin={isLogin}
          idx={2}
          onClickStepUpBtn={() => handleOpenStepUpModal(2)}
          onClickOpenDrawer={() => handleOpenDrawer(2)}>
          <StTextarea
            placeholder="????????? ??????????????????."
            value={data && data.answerTwo}
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
              questionList={data && data.questionList}
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
        bookNoteData={data}
        isFilled={isFilled}
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
