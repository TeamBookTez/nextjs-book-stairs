import styled from "@emotion/styled";
import React from "react";

import { IcDelete } from "../../../public/assets/icons";

interface InputQuestionProps {
  idx: number;
  value: string;
  onChangeValue: (e: React.ChangeEvent<HTMLInputElement>, idx: number) => void;
  onDelete: (idx: number) => void;
  isPreventedPreNote: boolean;
  isAdded: boolean;
  onAddInput: () => void;
}

export default function InputQuestion(props: InputQuestionProps) {
  const { idx, value, onChangeValue, onDelete, isPreventedPreNote, isAdded, onAddInput } = props;

  const addInputByEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isPreventedPreNote) return;

    if (e.key === "Enter") {
      onAddInput();
    }
  };

  return (
    <StWrapper>
      <StInput
        placeholder="질문 입력"
        value={value}
        onChange={(e) => onChangeValue(e, idx)}
        autoFocus={isAdded}
        onKeyPress={addInputByEnter}
      />
      {isPreventedPreNote && <StIcon onClick={() => onDelete(idx)} />}
    </StWrapper>
  );
}

const StWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StIcon = styled(IcDelete)`
  width: 2.8rem;
  height: 2.8rem;

  margin-left: 2.5rem;

  &:hover {
    cursor: pointer;
  }
`;

const StInput = styled.input`
  width: 100%;

  margin-bottom: 1rem;
  padding: 1.35rem 2.4rem;

  border: 0.2rem solid ${({ theme }) => theme.colors.white400};
  border-radius: 0.8rem;

  color: ${({ theme }) => theme.colors.gray400};
  ${({ theme }) => theme.fonts.body4}

  &::placeholder {
    color: ${({ theme }) => theme.colors.white500};
  }
`;
