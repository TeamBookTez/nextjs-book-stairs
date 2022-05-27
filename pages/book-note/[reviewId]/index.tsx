import styled from "@emotion/styled";

import { BookNoteHeader, Navigator, SavePoint } from "../../../components/bookNote";

export default function index() {
  return (
    <StNoteModalWrapper>
      <BookNoteHeader>
        <Navigator />
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
