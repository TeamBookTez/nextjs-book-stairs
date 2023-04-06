import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { useState } from "react";

import { PreNoteData } from "../../../types/bookNote";
import InputQuestion from "./InputQuestion";

const preNoteData: PreNoteData = {
  answerOne: "",
  answerTwo: "",
  questionList: [""],
  reviewSt: 2,
  finishSt: false,
};

interface PreNoteThirdArticleProps {
  questionList: string[];
  onChangeReview: <K extends keyof typeof preNoteData, V extends typeof preNoteData[K]>(key: K, value: V) => void;
  isPreventedPreNote: boolean;
  isFilledOnlyThree: boolean;
}

export default function PreNoteThirdArticle(props: PreNoteThirdArticleProps) {
  const { questionList, onChangeReview, isPreventedPreNote, isFilledOnlyThree } = props;

  const [isAdded, setIsAdded] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    setIsAdded(true);
    const modified = [...questionList];

    modified[idx] = e.target.value;
    onChangeReview("questionList", modified);
  };

  const handleDelete = (idx: number) => {
    const newArray = [...questionList];

    newArray.splice(idx, 1);
    onChangeReview("questionList", newArray);
  };

  const handleAddInput = () => {
    if (!isFilledOnlyThree) return;

    onChangeReview("questionList", [...questionList, ""]);
    setIsAdded(true);
  };

  return (
    <>
      {questionList &&
        questionList.map((question, idx) => (
          <InputQuestion
            key={idx}
            value={question}
            idx={idx}
            onChangeValue={handleChange}
            onDelete={handleDelete}
            isPreventedPreNote={isPreventedPreNote}
            isAdded={isAdded}
            onAddInput={handleAddInput}
          />
        ))}
      {isPreventedPreNote && (
        <StAddButton type="button" disabled={!isFilledOnlyThree} onClick={handleAddInput}>
          + 질문추가
        </StAddButton>
      )}
    </>
  );
}

const StAddButton = styled.button<{ disabled: boolean }>`
  width: calc(100% - 5rem);

  margin-right: 9.1rem;
  padding: 1.35rem 2.4rem;

  border: 0.2rem solid ${({ theme }) => theme.colors.white400};
  border-radius: 0.8rem;

  background-color: ${({ theme }) => theme.colors.white200};
  text-align: start;
  ${({ theme }) => theme.fonts.body4}
  color: ${({ disabled, theme }) => (!disabled ? theme.colors.gray100 : theme.colors.white500)};

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: default;
    `}
`;
