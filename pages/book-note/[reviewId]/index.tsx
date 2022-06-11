/*
마지막 편집자: 22-06-11 joohaem
변경사항 및 참고:
  - 

고민점:
  - url 을 state 관리로 바꿈으로써,
    useEffect로
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
import { Loading } from "../../../components/common";
import { StBookModalWrapper } from "../../../components/common/styled/BookModalWrapper";
import { stepUpContentArray } from "../../../core/bookNote/exampleData";
import { BookNotePathKey } from "../../../types/bookNote";
import useCheckLoginState from "../../../util/hooks/useCheckLoginState";

export type StepUpNDrawerIdx = 1 | 2 | 3 | 4;

export default function Index() {
  const { isLogin, isLoginLoading } = useCheckLoginState();

  const [navIndex, setNavIndex] = useState<BookNotePathKey>("pre");

  const [isSaveAlarmTime, setIsSaveAlarmTime] = useState<boolean>(false);
  const [isPrevented, setIsPrevented] = useState<boolean>(false);

  const [isOpenedExitModal, setIsOpenExitModal] = useState<boolean>(false);

  const [isOpenedStepUpModal, setIsOpenStepUpModal] = useState<boolean>(false);

  const [stepUpNDrawerIdx, setStepUpNDrawerIdx] = useState<StepUpNDrawerIdx>(1);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isDrawerdefault, setIsDrawerdefault] = useState(true);
  const drawerWidthValue = navIndex === "peri" ? 60 : 39;

  const handleNavIndex = (idx: BookNotePathKey) => {
    setNavIndex(idx);
  };

  // reviewSt가 2라면 peri로 이동할 수 없게 하기
  // 모든 답변이 채워지지 않으면 다음 단계로 이동할 수 없게 하기
  const handlePrevent = (shouldPrevent: boolean) => {
    setIsPrevented(shouldPrevent);
  };

  const handleSaveAlarmTime = (isSave: boolean) => {
    setIsSaveAlarmTime(isSave);
  };

  const toggleExitModal = () => {
    setIsOpenExitModal((prevIsOpened) => !prevIsOpened);
  };

  const handleOpenStepUpModal = (i: StepUpNDrawerIdx) => {
    setIsOpenStepUpModal(true);
    setStepUpNDrawerIdx(i);
  };

  const handleCloseStepUpModal = () => {
    setIsOpenStepUpModal(false);
  };

  const handleOpenDrawer = (i: StepUpNDrawerIdx) => {
    setIsDrawerdefault(false);
    setIsDrawerOpen(true);
    setStepUpNDrawerIdx(i);
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

  const bookNoteComponent =
    navIndex === "pre" ? (
      <PreNote
        toggleExitModal={toggleExitModal}
        handleOpenStepUpModal={handleOpenStepUpModal}
        handleOpenDrawer={handleOpenDrawer}
        handleCloseDrawer={handleCloseDrawer}
        isPrevented={isPrevented}
        handlePrevent={handlePrevent}
      />
    ) : (
      <div>페리노트</div>
    );

  if (isLoginLoading) return <Loading />;

  return (
    <StBookNoteContainer isopen={isDrawerOpen} isdefault={isDrawerdefault} width={drawerWidthValue}>
      <BookNoteHeader onClickExitBtn={toggleExitModal}>
        <Navigation
          navIndex={navIndex}
          isPrevented={isPrevented}
          handleNavIndex={handleNavIndex}
          onSetDrawerAsDefault={handleDrawerDefault}
        />
        {isLogin && (
          <SavePoint navIndex={navIndex} isSaveAlarmTime={isSaveAlarmTime} handleSaveAlarmTime={handleSaveAlarmTime} />
        )}
      </BookNoteHeader>

      {bookNoteComponent}

      {isDrawerOpen && <DrawerWrapper stepUpNDrawerIdx={stepUpNDrawerIdx} onCloseDrawer={handleCloseDrawer} />}
      {isOpenedExitModal && <ExitModal onClickCancelBtn={toggleExitModal} />}
      {isOpenedStepUpModal && (
        <StStepModalWrapper>
          <StepUpLayout
            handleCloseStepUpModal={handleCloseStepUpModal}
            stepUpContent={stepUpContentArray[stepUpNDrawerIdx - 1]}
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
