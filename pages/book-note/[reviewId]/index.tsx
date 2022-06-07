/*
마지막 편집자: 22-05-27 joohaem
변경사항 및 참고:
  - 
    
고민점:
  - url 을 state 관리로 바꿈으로써,
    bookcaseInfo 의 reviewSt 를 통해 pre, peri 를 나누어주어야 함 (원래는 통합)
*/

import styled from "@emotion/styled";
import { useEffect, useState } from "react";

import { BookNoteHeader, DrawerWrapper, Navigation, PreNote, SavePoint } from "../../../components/bookNote";
import { BookNotePathKey } from "../../../types/bookNote";

export default function Index() {
  const [navIndex, setNavIndex] = useState<BookNotePathKey>("pre");

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [drawerIdx, setDrawerIdx] = useState(1);
  const [isDrawerdefault, setIsDrawerdefault] = useState(true);

  const handleNavIndex = (idx: BookNotePathKey) => {
    setNavIndex(idx);
  };

  const handleOpenDrawer = (i: number) => {
    setIsDrawerdefault(false);
    setIsDrawerOpen(true);
    setDrawerIdx(i);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
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
    <StBookNoteContainer>
      <BookNoteHeader>
        <Navigation navIndex={navIndex} onClickNavList={handleNavIndex} />
        <SavePoint />
      </BookNoteHeader>
      <PreNote />

      {isDrawerOpen && <DrawerWrapper drawerIdx={drawerIdx} onCloseDrawer={handleCloseDrawer} />}
    </StBookNoteContainer>
  );
}

const StBookNoteContainer = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  padding: 10rem 9.5rem;
  background-color: ${({ theme }) => theme.colors.white200};

  min-height: 100vh;
`;
