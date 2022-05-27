/*
마지막 편집자: 22-05-27 joohaem
변경사항 및 참고:
  - 
    
고민점:
  - url 을 state 관리로 바꿈으로써,
    bookcaseInfo 의 reviewSt 를 통해 pre, peri 를 나누어주어야 함
*/

import styled from "@emotion/styled";
import { useState } from "react";

import { BookNoteHeader, Navigation, SavePoint } from "../../../components/bookNote";
import { BookNotePathKey } from "../../../types/bookNote";

export default function index() {
  const [navIndex, setNavIndex] = useState<BookNotePathKey>("pre");

  const handleNavIndex = (idx: BookNotePathKey) => {
    setNavIndex(idx);
  };

  return (
    <StNoteModalWrapper>
      <BookNoteHeader>
        <Navigation navIndex={navIndex} onClickNavList={handleNavIndex} />
        <SavePoint />
      </BookNoteHeader>
    </StNoteModalWrapper>
  );
}

const StNoteModalWrapper = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  padding: 10rem 9.5rem;
  background-color: ${({ theme }) => theme.colors.white200};

  min-height: 100vh;
`;
