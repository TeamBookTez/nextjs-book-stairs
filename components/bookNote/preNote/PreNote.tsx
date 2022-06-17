/*
마지막 편집자: 22-06-10 joohaem
변경사항 및 참고:
  - 모듈 import 가 많아지네요 ! indexing 작업도 해야겠습니다 하하
    
고민점:
  - 
  
*/

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";

import { patchBookNote } from "../../../core/api";
import { StepUpNDrawerIdx } from "../../../pages/book-note/[reviewId]";
import { BookNotePathKey, PreNoteData, SavingProgress } from "../../../types/bookNote";
import useFetchBookNote from "../../../util/hooks/useFetchBookNote";
import { Loading } from "../../common";
import { DefaultButton } from "../../common/styled/Button";
import LinkToSignUpSection from "./LinkToSignUpSection";
import PreNoteFormContainer from "./PreNoteFormContainer";
import PreNotePostSection from "./PreNotePostSection";
import PreNoteThirdArticle from "./PreNoteThirdArticle";

interface PreNoteProps {
  isLogin: boolean;
  reviewId: string;
  toggleExitModal: () => void;
  handleOpenStepUpModal: (i: StepUpNDrawerIdx) => void;
  handleOpenDrawer: (i: StepUpNDrawerIdx) => void;
  handleCloseDrawer: () => void;
  isPrevented: boolean;
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
    toggleExitModal,
    handleOpenStepUpModal,
    handleOpenDrawer,
    handleCloseDrawer,
    isPrevented,
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

  // 네비게이션 바 클릭 시 or 저장하기 버튼 클릭 시 isPending: true
  // 처음 data 를 fetch 하기 전 initialData 가 곧바로 저장되는 현상을 막아줌
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

  const preventGoBack = () => {
    history.pushState(null, "", location.href);
    toggleExitModal();
  };

  useEffect(() => {
    history.pushState(null, "", location.href);
    window.addEventListener("popstate", preventGoBack);

    return () => {
      window.removeEventListener("popstate", preventGoBack);
      handleCloseDrawer();
    };
  }, []);

  // --------------------------------------------------------------------------

  if (isLoading) return <Loading />;

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
            value={data.answerOne}
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
            value={data.answerTwo}
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
              questionList={data.questionList}
              onChangeReview={handleChangeReview}
              isPrevented={isPrevented}
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
