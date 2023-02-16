import styled from "@emotion/styled";
import React from "react";
import { useRecoilValue } from "recoil";

import { navigatingBookInfoState } from "../../core/atom";
import { StIcCancelWhiteCircle } from "../common/styled/NoteModalWrapper";

interface BookNoteHeaderProps {
  onClickExitBtn: () => void;
  children: React.ReactNode;
}

export default function BookNoteHeader(props: BookNoteHeaderProps) {
  const { onClickExitBtn, children } = props;

  const navigatingBookInfo = useRecoilValue(navigatingBookInfoState);
  const { title } = navigatingBookInfo;

  return (
    <>
      <StIcCancelWhiteCircle onClick={onClickExitBtn} />
      <StBookTitle>{title}</StBookTitle>
      <StNavWrapper>{children}</StNavWrapper>
    </>
  );
}

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
