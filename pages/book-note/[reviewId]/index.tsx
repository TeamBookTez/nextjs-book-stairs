/*
마지막 편집자: 22-07-04 soryeongk
변경사항 및 참고:
  - 

고민점:
  - recoil persist로 관리되고 있는 아이들을 모두 localStorage로 바꿀 수는 없을까?
    localStorage로 대체함으로써 package를 하나라도 덜고 싶습니다..
*/

import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

import {
  BookNoteHeader,
  DrawerWrapper,
  ExitModal,
  Navigation,
  SavePoint,
  StepUpLayout,
} from "../../../components/bookNote";
import PeriNote from "../../../components/bookNote/periNote/PeriNote";
import { PreNote } from "../../../components/bookNote/preNote";
import { Loading } from "../../../components/common";
import { StBookModalWrapper } from "../../../components/common/styled/BookModalWrapper";
import { navigatingBookInfoState } from "../../../core/atom";
import { periNoteStepUp, stepUpContentArray } from "../../../core/constant/bookNote/exampleData";
import { NavigatingBookInfoState } from "../../../types/bookcase";
import { BookNotePathKey } from "../../../types/bookNote";
import usePeriNote from "../../../util/hooks/bookNote/usePeriNote";
import usePreNote from "../../../util/hooks/bookNote/usePreNote";
import useUser from "../../../util/hooks/useUser";

export type StepUpAndDrawerIdx = 1 | 2 | 3 | 4;

export default function Index() {
  const { isLogin, isLoginLoading } = useUser();
  const { reviewId, reviewSt } = useRecoilValue<NavigatingBookInfoState>(navigatingBookInfoState);

  const { isLoading: isPeriLoading, savePeriNote, cleanUpPeriNoteData } = usePeriNote(reviewId);
  const { isLoading: isPreLoading, savePreNote, cleanUpPreNoteData } = usePreNote(reviewId);

  const [navIndex, setNavIndex] = useState<BookNotePathKey>("pre");

  const [isPreventedPreNote, setIsPreventedPreNote] = useState<boolean>(false);
  const [isExitModalOpen, setIsExitModalOpen] = useState<boolean>(false);
  const [isStepUpModalOpen, setIsStepUpModalOpen] = useState<boolean>(false);

  const [stepUpAndDrawerIdx, setStepUpAndDrawerIdx] = useState<StepUpAndDrawerIdx>(1);
  const [drawerOpenStatus, setDrawerOpenStatus] = useState({ isOpened: false, isDefault: true });

  const drawerWidthValue = navIndex === "peri" ? 60 : 39;

  useEffect(() => {
    return function cleanUp() {
      cleanUpPeriNoteData();
      cleanUpPreNoteData();
    };
  }, []);

  const handleNavIndex = (idx: BookNotePathKey) => {
    setNavIndex(idx);
  };

  // reviewSt가 2라면 peri로 navigate 할 수 없게 하기
  // 모든 답변이 채워지지 않으면 다음 단계로 이동할 수 없게 하기
  const handlePrevent = (shouldPrevent: boolean) => {
    setIsPreventedPreNote(shouldPrevent);
  };

  const toggleExitModal = () => {
    setIsExitModalOpen((prevIsOpened) => !prevIsOpened);
  };

  const handleOpenStepUpModal = (i: StepUpAndDrawerIdx) => {
    setIsStepUpModalOpen(true);
    setStepUpAndDrawerIdx(i);
  };

  const handleCloseStepUpModal = () => {
    setIsStepUpModalOpen(false);
  };

  const handleOpenDrawer = (i: StepUpAndDrawerIdx) => {
    setDrawerOpenStatus({ isOpened: true, isDefault: false });
    setStepUpAndDrawerIdx(i);
  };

  const handleCloseDrawer = () => {
    setDrawerOpenStatus((current) => ({ ...current, isOpened: false }));
  };

  const handleDefaultDrawer = () => {
    setDrawerOpenStatus((current) => ({ ...current, isDefault: true }));
  };

  const handleClickNavList = (idx: BookNotePathKey) => {
    handleDefaultDrawer();

    if (idx === "peri" && isPreventedPreNote) return;

    switch (navIndex) {
      case "pre":
        savePreNote();
        break;
      case "peri":
        savePeriNote();
        break;
    }
    handleNavIndex(idx);
  };

  usePreventExit(reviewSt, toggleExitModal, setNavIndex, handleCloseDrawer);

  const bookNoteComponent =
    navIndex === "pre" ? (
      <PreNote
        isLogin={isLogin}
        reviewId={reviewId}
        handleOpenStepUpModal={handleOpenStepUpModal}
        handleOpenDrawer={handleOpenDrawer}
        isPreventedPreNote={isPreventedPreNote}
        handlePrevent={handlePrevent}
        handleNavIndex={handleNavIndex}
      />
    ) : (
      <PeriNote reviewId={reviewId} handleOpenStepUpModal={handleOpenStepUpModal} handleOpenDrawer={handleOpenDrawer} />
    );

  if (isLoginLoading || isPreLoading || isPeriLoading) return <Loading />;

  return (
    <StBookNoteContainer openstatus={drawerOpenStatus} width={drawerWidthValue}>
      {/* <Suspense fallback={<Loading />}> */}
      {/* TODO :: ErrorBoundary */}
      <BookNoteHeader onClickExitBtn={toggleExitModal}>
        <Navigation navIndex={navIndex} onClickNavList={handleClickNavList} />
        {isLogin && <SavePoint navIndex={navIndex} reviewId={reviewId} />}
      </BookNoteHeader>

      {bookNoteComponent}
      {/* </Suspense> */}

      {drawerOpenStatus.isOpened && (
        <DrawerWrapper stepUpAndDrawerIdx={stepUpAndDrawerIdx} onCloseDrawer={handleCloseDrawer} />
      )}
      {isExitModalOpen && <ExitModal onClickCancelBtn={toggleExitModal} />}
      {isStepUpModalOpen && (
        <StStepModalWrapper>
          <StepUpLayout
            onClickModalCancel={handleCloseStepUpModal}
            stepUpContent={navIndex === "pre" ? stepUpContentArray[stepUpAndDrawerIdx - 1] : periNoteStepUp}
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
  openstatus: {
    isOpened: boolean;
    isDefault: boolean;
  };
  width: number;
}>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  padding: 10rem 9.5rem;
  background-color: ${({ theme }) => theme.colors.white200};

  min-height: 100vh;

  ${({ openstatus, width }) =>
    openstatus.isOpened
      ? css`
          animation: ${reducewidth(width)} 300ms linear 1;
          animation-fill-mode: forwards;
        `
      : !openstatus.isDefault &&
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

const usePreventExit = (
  reviewSt: 2 | 3 | 4 | undefined,
  toggleExitModal: () => void,
  handleNavIndex: (idx: BookNotePathKey) => void,
  handleCloseDrawer: () => void,
) => {
  // 뒤로 가기 막기
  const preventGoBack = () => {
    history.pushState(null, "", location.href);
    toggleExitModal();
  };

  // 새로고침 막기
  const preventClose = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = ""; //deprecated
  };

  useEffect(() => {
    (() => {
      const index = reviewSt === 2 ? "pre" : "peri";

      handleNavIndex(index);
      // 뒤로 가기 막기
      history.pushState(null, "", location.href);
      window.addEventListener("popstate", preventGoBack);
      // 새로고침 막기
      window.addEventListener("beforeunload", preventClose);
    })();

    return () => {
      window.removeEventListener("popstate", preventGoBack);
      window.removeEventListener("beforeunload", preventClose);

      handleCloseDrawer();
    };
  }, []);
};
