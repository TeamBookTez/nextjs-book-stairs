import styled from "@emotion/styled";
import { ReactNode } from "react";

import { NavWrapper } from "../common";
import { MainHeader } from "../main";

interface LayoutProps {
  pageName: string;
  children: ReactNode;
}

export default function Layout(props: LayoutProps) {
  const { pageName, children } = props;

  return (
    <StLayoutWrapper>
      <NavWrapper />
      <StWrapper>
        <MainHeader>{pageName}</MainHeader>
        {children}
      </StWrapper>
    </StLayoutWrapper>
  );
}

const StLayoutWrapper = styled.section`
  background-color: #242424;
`;

const StWrapper = styled.main`
  position: relative;
  width: calc(100% - 17.5rem); //NAV_WRAPPER_WIDTH
  min-height: 100vh;

  margin-left: 17.5rem; //NAV_WRAPPER_WIDTH

  border-radius: 2rem 0 0 2rem;
  border: 0.1rem solid #ffffff;
  background-color: #ffffff;
`;
