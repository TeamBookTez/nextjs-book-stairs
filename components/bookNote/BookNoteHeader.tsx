import styled from "@emotion/styled";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";

import { navigatingBookInfoState } from "../../core/atom";
import { IcCancelWhite } from "../../public/assets/icons";
import ExitModal from "./ExitModal";

interface BookNoteHeaderProps {
  children: React.ReactNode;
}

export default function BookNoteHeader(props: BookNoteHeaderProps) {
  const { children } = props;

  const navigatingBookInfo = useRecoilValue(navigatingBookInfoState);
  const { title } = navigatingBookInfo;

  const [isOpenedExitModal, setIsOpenExitModal] = useState<boolean>(false);

  const handleExitModal = () => {
    setIsOpenExitModal((prevIsOpened) => !prevIsOpened);
  };

  return (
    <>
      {isOpenedExitModal && <ExitModal onClickCancelBtn={handleExitModal} />}

      <StIcCancelWhite onClick={handleExitModal} />
      <StBookTitle>{title}asdasdsadadas</StBookTitle>
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
