import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useViewportScroll } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

import { BookcasePathKey, bookcasePathKey } from "../../types/bookcase";

interface NavigationProps {
  navIndex: BookcasePathKey;
  onChangeNavIndex: (idx: BookcasePathKey) => void;
}

export default function Navigation(props: NavigationProps) {
  const { navIndex, onChangeNavIndex } = props;

  const [isScroll, setIsScroll] = useState<boolean>(false);
  const { scrollY } = useViewportScroll();
  const MAIN_HEADER_HEIGHT = 109;

  const navUnderbarIndex = useMemo(() => {
    switch (navIndex) {
      case bookcasePathKey.pre:
        return 1;

      case bookcasePathKey.peri:
        return 2;

      case bookcasePathKey.post:
        return 3;

      default:
        return 0;
    }
  }, [navIndex]);

  useEffect(() => {
    scrollY.onChange(() => {
      if (scrollY.get() > MAIN_HEADER_HEIGHT) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    });

    return () => {
      scrollY.clearListeners();
    };
  }, [scrollY]);

  return (
    <StNav isscroll={isScroll}>
      <StUl>
        <StList onClick={() => onChangeNavIndex(bookcasePathKey.all)}>전체</StList>
        <StList onClick={() => onChangeNavIndex(bookcasePathKey.pre)}>독서 전</StList>
        <StList onClick={() => onChangeNavIndex(bookcasePathKey.peri)}>독서 중</StList>
        <StList onClick={() => onChangeNavIndex(bookcasePathKey.post)}>독서 완료</StList>
      </StUl>
      <StBottomLine>
        <StOrangLine index={navUnderbarIndex} />
      </StBottomLine>
    </StNav>
  );
}

const StNav = styled.nav<{ isscroll: boolean }>`
  position: sticky;
  top: 0;

  z-index: 10;

  padding-top: 3.3rem;
  padding-left: 4rem;

  background-color: ${({ theme }) => theme.colors.white};

  ${({ isscroll }) =>
    isscroll
      ? css`
          box-shadow: 0rem 0.6rem 1rem rgba(0, 0, 0, 0.17);
        `
      : css`
          box-shadow: 0;
        `}
`;

const StUl = styled.ul`
  display: flex;
`;

const StList = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 8.8rem;
  height: 4.8rem;

  text-align: center;

  ${({ theme }) => theme.fonts.body1}
  color: ${({ theme }) => theme.colors.gray100};

  cursor: pointer;
`;

const StBottomLine = styled.div`
  position: absolute;
  bottom: 0;

  width: 35.2rem;
  height: 0.3rem;

  background-color: ${({ theme }) => theme.colors.white200};
`;

const StOrangLine = styled.span<{ index: number }>`
  position: absolute;
  top: 0;
  left: 0;

  width: 8.8rem;
  height: 0.3rem;

  background-color: ${({ theme }) => theme.colors.orange100};

  transition: transform 250ms ease;
  transform: translateX(${({ index }) => index * 8.8}rem);
`;
