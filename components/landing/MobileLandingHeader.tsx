import styled from "@emotion/styled";
import React from "react";

import { IcLandingMobileHeader } from "../../public/assets/icons";
export default function MobileLandingHeader() {
  return (
    <StHeader>
      <IcLandingMobileHeader />
    </StHeader>
  );
}

const StHeader = styled.header`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  min-width: 32rem;
  height: 6rem;

  background-color: ${({ theme }) => theme.colors.white};
`;
