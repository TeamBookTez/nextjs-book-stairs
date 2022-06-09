import styled from "@emotion/styled";
import React from "react";
import { useRecoilValue } from "recoil";

import { navigatingBookInfoState } from "../../core/atom";
import { IcCancelWhite } from "../../public/assets/icons";

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
      <StIcCancelWhite onClick={onClickExitBtn} />
      <StBookTitle>{title}</StBookTitle>
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
