import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useViewportScroll } from "framer-motion";
import { useEffect, useState } from "react";

import { BookcasePathKey, bookcasePathKey } from "../../types/bookcase";
import useBookcase from "../../util/hooks/useBookcase";

export default function Navigation() {
  const { navIndex, changeNavIndex } = useBookcase();
  const handleChangeNavIndex = (index: BookcasePathKey) => {
    changeNavIndex?.(index);
  };

  const [isScroll, setIsScroll] = useState<boolean>(false);
  const { scrollY } = useViewportScroll();
  const MAIN_HEADER_HEIGHT = 109;

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
        <StList onClick={() => handleChangeNavIndex(bookcasePathKey.all)}>전체</StList>
        <StList onClick={() => handleChangeNavIndex(bookcasePathKey.pre)}>독서 전</StList>
        <StList onClick={() => handleChangeNavIndex(bookcasePathKey.peri)}>독서 중</StList>
        <StList onClick={() => handleChangeNavIndex(bookcasePathKey.post)}>독서 완료</StList>
      </StUl>
      <StBottomLine>
        <StOrangLine index={navIndex.value} />
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
