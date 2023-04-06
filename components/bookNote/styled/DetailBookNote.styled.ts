import styled from "@emotion/styled";

import { IcToggle } from "../../../public/assets/icons";
import { StBookModalWrapper } from "../../common/styled/BookModalWrapper";

export const StNoteModalWrapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  width: 100%;
  min-height: 100vh;

  padding: 10rem 9.5rem;

  background-color: ${({ theme }) => theme.colors.white200};
`;

export const StBookTitle = styled.h1`
  width: 100%;

  ${({ theme }) => theme.fonts.header0};
`;

export const StStepModalWrapper = styled(StBookModalWrapper)`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;

  background-color: rgba(55, 56, 62, 0.8);
`;

export const StIcToggle = styled(IcToggle)`
  min-width: 2.6rem;
  margin-left: 1.6rem;
  &:hover {
    cursor: pointer;
  }
`;
