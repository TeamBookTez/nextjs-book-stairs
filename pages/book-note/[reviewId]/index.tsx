/*
마지막 편집자: 22-05-27 joohaem
변경사항 및 참고:
  - 
    
고민점:
  - url 을 state 관리로 바꿈으로써,
    bookcaseInfo 의 reviewSt 를 통해 pre, peri 를 나누어주어야 함 (원래는 통합)
*/

import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";

import {
  BookNoteHeader,
  DrawerWrapper,
  ExitModal,
  Navigation,
  PreNote,
  SavePoint,
  StepUpLayout,
} from "../../../components/bookNote";
import { StBookModalWrapper } from "../../../components/common/styled/BookModalWrapper";
import { stepUpContentArray } from "../../../core/bookNote/exampleData";
import { BookNotePathKey } from "../../../types/bookNote";

export type DrawerIdx = 1 | 2 | 3 | 4;

export default function Index() {
  const [navIndex, setNavIndex] = useState<BookNotePathKey>("pre");

  const [isOpenedExitModal, setIsOpenExitModal] = useState<boolean>(false);

  const [isOpenedStepUpModal, setIsOpenStepUpModal] = useState<boolean>(false);

  const [drawerIdx, setDrawerIdx] = useState<DrawerIdx>(1);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isDrawerdefault, setIsDrawerdefault] = useState(true);
  const drawerWidthValue = navIndex === "peri" ? 60 : 39;

  const handleNavIndex = (idx: BookNotePathKey) => {
    setNavIndex(idx);
  };

  const handleExitModal = () => {
    setIsOpenExitModal((prevIsOpened) => !prevIsOpened);
  };

  const handleOpenStepUpModal = (i: DrawerIdx) => {
    setIsOpenStepUpModal(true);
    setDrawerIdx(i);
  };

  const handleCloseStepUpModal = () => {
    setIsOpenStepUpModal(false);
  };

  const handleOpenDrawer = (i: DrawerIdx) => {
    setIsDrawerdefault(false);
    setIsDrawerOpen(true);
    setDrawerIdx(i);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleDrawerDefault = () => {
    setIsDrawerdefault(true);
  };

  const preventClose = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = ""; //deprecated
  };

  useEffect(() => {
    (() => {
      window.addEventListener("beforeunload", preventClose);
    })();

    return () => {
      window.removeEventListener("beforeunload", preventClose);
    };
  }, []);

  return (
    <StBookNoteContainer isopen={isDrawerOpen} isdefault={isDrawerdefault} width={drawerWidthValue}>
      <BookNoteHeader onClickExitBtn={handleExitModal}>
        <Navigation navIndex={navIndex} onClickNavList={handleNavIndex} onSetDrawerAsDefault={handleDrawerDefault} />
        <SavePoint />
      </BookNoteHeader>
      <PreNote
        handleExitModal={handleExitModal}
        handleOpenStepUpModal={handleOpenStepUpModal}
        handleOpenDrawer={handleOpenDrawer}
        handleCloseDrawer={handleCloseDrawer}
      />

      {isDrawerOpen && <DrawerWrapper drawerIdx={drawerIdx} onCloseDrawer={handleCloseDrawer} />}
      {isOpenedExitModal && <ExitModal onClickCancelBtn={handleExitModal} />}
      {isOpenedStepUpModal && (
        <StStepModalWrapper>
          <StepUpLayout
            handleCloseStepUpModal={handleCloseStepUpModal}
            stepUpContent={stepUpContentArray[drawerIdx - 1]}
          />
        </StStepModalWrapper>
      )}
    </StBookNoteContainer>
  );
}

const reducewidth = (width: number) => keyframes`
  0% {
    width: 100%;
    padding-right: 9.5rem;
  }
  100% {
    width: calc(100% - ${width}rem);
    padding-right: 3.4rem;
}
`;

const boostwidth = (width: number) => keyframes`
  0% {
    width: calc(100% - ${width}rem);
    padding-right: 3.4rem;
  }
  100% {
    width: 100%;
    padding-right: 9.5rem;
}
`;

const StBookNoteContainer = styled.main<{
  isopen: boolean;
  isdefault: boolean;
  width: number;
}>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  padding: 10rem 9.5rem;
  background-color: ${({ theme }) => theme.colors.white200};

  min-height: 100vh;

  ${({ isopen, isdefault, width }) =>
    isopen
      ? css`
          animation: ${reducewidth(width)} 300ms linear 1;
          animation-fill-mode: forwards;
        `
      : !isdefault &&
        css`
          animation: ${boostwidth(width)} 300ms linear 1;
          animation-fill-mode: forwards;
        `}
`;

const StStepModalWrapper = styled(StBookModalWrapper)`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;

  background-color: rgba(55, 56, 62, 0.8);
`;
