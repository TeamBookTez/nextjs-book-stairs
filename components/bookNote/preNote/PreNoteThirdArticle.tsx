import { css } from "@emotion/react";
import styled from "@emotion/styled";

import InputQuestion from "./InputQuestion";

export default function PreNoteThirdArticle() {
  const isPrevented = true;

  return (
    <>
      {/* {questionList &&
        questionList.map((question, idx) => (
          <InputQuestion
            key={idx}
            value={question}
            idx={idx}
            onChangeValue={handleChange}
            onDelete={handleDelete}
            isPrevented={isPrevented}
            isAdded={isAdded}
            onAddInput={handleAddInput}
          />
        ))} */}
      <InputQuestion />
      <InputQuestion />
      <InputQuestion />
      <InputQuestion />
      <InputQuestion />
      {isPrevented && (
        <StAddButton
          type="button"
          disabled={false}
          onClick={() => {
            console.log("handleAddInput");
          }}>
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
