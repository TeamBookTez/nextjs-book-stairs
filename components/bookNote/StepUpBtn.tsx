import styled from "@emotion/styled";
import React from "react";

import { IcCheck } from "../../public/assets/icons";

interface StepUpBtnProps {
  onToggleModal: () => void;
}

export default function StepUpBtn(props: StepUpBtnProps) {
  const { onToggleModal } = props;

  return (
    <StButton type="button" onClick={onToggleModal}>
      <StIcon />
      Step Up
    </StButton>
  );
}

const StButton = styled.button`
  min-width: 9.3rem;
  height: 3.1rem;

  display: flex;
  align-items: center;
  justify-content: space-between;

  margin: 0 1.6rem;
  padding: 0.5rem 1rem 0.6rem 0.7rem;

  border-radius: 0.8rem;

  background-color: ${({ theme }) => theme.colors.orange200};
  ${({ theme }) => theme.fonts.body6}
  color: ${({ theme }) => theme.colors.orange100};
`;

const StIcon = styled(IcCheck)`
  width: 2rem;
  height: 2rem;
`;
