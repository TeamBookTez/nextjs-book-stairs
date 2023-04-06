import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { AnimatePresence, motion } from "framer-motion";

import DrawerHeader from "./DrawerHeader";
import PeriNoteExample from "./PeriNoteExample";
import PreNoteQa from "./PreNoteQa";

interface DrawerWrapperProps {
  stepUpAndDrawerIdx: number;
  onCloseDrawer: () => void;
}

export default function DrawerWrapper(props: DrawerWrapperProps) {
  const { stepUpAndDrawerIdx, onCloseDrawer } = props;

  const drawerWidth = stepUpAndDrawerIdx === 4 ? 60 : 39;

  return (
    <AnimatePresence>
      <StDrawerWrapper
        transition={{ type: "Inertia", ease: "linear" }}
        initial={{ transform: `translateX(${drawerWidth}rem)` }}
        animate={{ transform: "translateX(0rem)" }}
        exit={{ transform: `translateX(${drawerWidth}rem)` }}
        stepupndraweridx={stepUpAndDrawerIdx}>
        <DrawerHeader stepUpAndDrawerIdx={stepUpAndDrawerIdx} onCloseDrawer={onCloseDrawer} />
        <StArticle stepupndraweridx={stepUpAndDrawerIdx}>
          {stepUpAndDrawerIdx === 4 ? <PeriNoteExample /> : <PreNoteQa stepUpAndDrawerIdx={stepUpAndDrawerIdx} />}
        </StArticle>
      </StDrawerWrapper>
    </AnimatePresence>
  );
}

const StDrawerWrapper = styled(motion.section)<{ stepupndraweridx: number }>`
  overflow-y: scroll;
  overflow-x: hidden;

  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;

  display: flex;
  flex-direction: column;
  text-align: center;

  border-radius: 2rem 0 0 2rem;
  box-shadow: 0 0 0.4rem 0 rgba(0, 0, 0, 0.17);

  padding: 3.3rem 3.3rem 5.4rem 3.3rem;
  background-color: ${({ theme }) => theme.colors.white};

  width: ${({ stepupndraweridx }) => (stepupndraweridx === 4 ? "60rem" : "39rem")};
  /* height: ${({ stepupndraweridx }) => (stepupndraweridx === 4 ? "141.5rem" : "90rem")}; */
  min-height: 100vh;

  & > svg {
    width: 4.4rem;
    height: 4.4rem;

    margin-bottom: 3.2rem;
  }
`;

const StArticle = styled.article<{ stepupndraweridx: number }>`
  height: 100%;

  display: flex;
  flex-direction: column;
  ${({ stepupndraweridx }) =>
    stepupndraweridx === 4
      ? css`
          align-items: flex-start;
        `
      : ""}

  border-radius: 2rem;
  padding: ${({ stepupndraweridx }) => (stepupndraweridx === 4 ? "4rem 1.5rem" : "3.2rem")};
  background-color: ${({ theme }) => theme.colors.white200};

  width: ${({ stepupndraweridx }) => (stepupndraweridx === 4 ? "53.4rem" : "32.4rem")};
  min-height: ${({ stepupndraweridx }) => (stepupndraweridx === 4 ? "104.3rem" : "53.4rem")};
`;
