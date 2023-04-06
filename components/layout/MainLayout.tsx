import styled from "@emotion/styled";
import { ReactNode } from "react";

import { NavWrapper } from "../common";

interface LayoutProps {
  header: ReactNode;
  children: ReactNode;
}

export default function Layout(props: LayoutProps) {
  const { header, children } = props;

  return (
    <StLayoutWrapper>
      <NavWrapper />
      <StWrapper>
        {header}
        {children}
      </StWrapper>
    </StLayoutWrapper>
  );
}

const StLayoutWrapper = styled.section`
  background-color: ${({ theme }) => theme.colors.gray100};
`;

const StWrapper = styled.main`
  position: relative;
  width: calc(100% - 17.5rem); //NAV_WRAPPER_WIDTH
  min-height: 100vh;

  margin-left: 17.5rem; //NAV_WRAPPER_WIDTH

  border-radius: 2rem 0 0 2rem;
  border: 0.1rem solid ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.white};
`;
