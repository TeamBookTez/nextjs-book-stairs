import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

import { navigatingBookInfoState } from "../../../core/atom";
import LocalStorage from "../../../core/localStorage";
import { StepUpNDrawerIdx } from "../../../pages/book-note/[reviewId]";
import { NavigatingBookInfoState } from "../../../types/bookcase";
import { PreNoteData } from "../../../types/bookNote";
import useCheckLoginState from "../../../util/hooks/useCheckLoginState";
import useFetchBookNote from "../../../util/hooks/useFetchBookNote";
import { DefaultButton } from "../../common/styled/Button";
import LinkToSignUpSection from "./LinkToSignUpSection";
import PreNoteFormContainer from "./PreNoteFormContainer";
import PreNoteThirdArticle from "./PreNoteThirdArticle";

interface PreNoteProps {
  toggleExitModal: () => void;
  handleOpenStepUpModal: (i: StepUpNDrawerIdx) => void;
  handleOpenDrawer: (i: StepUpNDrawerIdx) => void;
  handleCloseDrawer: () => void;
}

type ReviewKey = "answerOne" | "answerTwo" | "questionList";

export default function PreNote(props: PreNoteProps) {
  const { toggleExitModal, handleOpenStepUpModal, handleOpenDrawer, handleCloseDrawer } = props;

  const navigatingBookInfo = useRecoilValue<NavigatingBookInfoState>(navigatingBookInfoState);
  const { reviewId } = navigatingBookInfo;

  const { isLogin } = useCheckLoginState();

  const { data, setData, isLoading } = useFetchBookNote<PreNoteData>(
    LocalStorage.getItem("booktez-token"),
    `/review/${reviewId}/pre`,
    {
      answerOne: "",
      answerTwo: "",
      questionList: [""],
      reviewSt: 2,
      finishSt: false,
    },
  );

  const [isFilled, setIsFilled] = useState<boolean>(false);

  const handleChangeReview = (key: ReviewKey, value: string | string[]): void => {
    setData((currentNote) => {
      const newData = { ...currentNote };

      if (typeof value === "string") {
        if (key === "answerOne") newData.answerOne = value;
        if (key === "answerOne") newData.answerTwo = value;
      } else {
        newData.questionList = value;
      }

      return newData;
    });
  };

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

  return (
    <StNoteForm onSubmit={(e) => e.preventDefault()}>
      <StFormHead>책을 넘기기 전 독서전략을 세워보아요.</StFormHead>
      <StFormWrapper>
        <PreNoteFormContainer
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
          idx={2}
          onClickStepUpBtn={() => handleOpenStepUpModal(2)}
          onClickOpenDrawer={() => handleOpenDrawer(2)}>
          <StTextarea
            placeholder="답변을 입력해주세요."
            value={data.answerOne}
            onChange={(e) => handleChangeReview("answerTwo", e.target.value)}
          />
        </PreNoteFormContainer>
        {isLogin ? (
          <PreNoteFormContainer
            idx={3}
            onClickStepUpBtn={() => handleOpenStepUpModal(3)}
            onClickOpenDrawer={() => handleOpenDrawer(3)}>
            <PreNoteThirdArticle />
          </PreNoteFormContainer>
        ) : (
          <LinkToSignUpSection />
        )}
      </StFormWrapper>
      <StNextBtn type="button" disabled={!isFilled || data.questionList.length === 0}>
        다음 계단
      </StNextBtn>
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
