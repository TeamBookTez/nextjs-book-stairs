import styled from "@emotion/styled";
import React from "react";

import { IcCancelWhite } from "../../public/assets/icons";
import { PopUpExit } from "../common";

interface BookNoteHeaderProps {
  children: React.ReactNode;
}

export default function BookNoteHeader(props: BookNoteHeaderProps) {
  const { children } = props;

  return (
    <>
      {false && <PopUpExit />}
      <StIcCancelWhite onClick={() => {}} />
      <StBookTitle>...title...</StBookTitle>
      <StNavWrapper>{children}</StNavWrapper>
    </>
  );
}

const StIcCancelWhite = styled(IcCancelWhite)`
  position: absolute;
  top: 3.2rem;
  left: 2.4rem;
  z-index: 20;

  width: 4.8rem;
  height: 4.8rem;

  &:hover {
    cursor: pointer;
  }
`;

const StNavWrapper = styled.div`
  position: relative;

  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  height: 4.8rem;

  margin-top: 4.3rem;
`;

const StBookTitle = styled.h1`
  width: 100%;

  ${({ theme }) => theme.fonts.header0};
`;
