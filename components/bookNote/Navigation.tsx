import styled from "@emotion/styled";

import { BookNotePathKey } from "../../types/bookNote";

interface NavigationProps {
  navIndex: BookNotePathKey;
  isPrevented: boolean;
  onClickNavList: (idx: BookNotePathKey) => void;
  onSetDrawerAsDefault: () => void;
}

export default function Navigation(props: NavigationProps) {
  const { navIndex, isPrevented, onClickNavList, onSetDrawerAsDefault } = props;

  const handleNavIndex = (idx: BookNotePathKey) => {
    // onSetIsSave(true);
    // if (navIndex === "pre") {
    // setTimeout(() => {
    //   onSetIsSave(false);
    //   onNav(0);
    // }, 0);
    // }
    // if (navIndex === "peri" && !isPrevented) {
    // setTimeout(() => {
    // onSetIsSave(false);
    // onNav(1);
    // }, 0);
    // }
    // onSetDrawerAsDefault();
    onClickNavList(idx);
  };

  return (
    <StNav>
      <StUl>
        <StList onClick={() => handleNavIndex("pre")} active={navIndex === "pre"}>
          독서 전
        </StList>
        <StList onClick={() => handleNavIndex("peri")} active={navIndex === "peri"}>
          독서 중
        </StList>
      </StUl>
      <StBottomLine>
        <StOrangLine index={navIndex === "pre" ? 0 : 1} />
      </StBottomLine>
    </StNav>
  );
}

const StNav = styled.nav`
  position: sticky;
  top: 0;

  width: 100%;

  margin-top: 4.3rem;
`;

const StUl = styled.ul`
  display: flex;
`;

const StList = styled.li<{ active: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 8.8rem;
  height: 4.8rem;

  text-align: center;
  font-size: 1.8rem;
  font-weight: 600;

  cursor: pointer;

  color: ${({ theme, active }) => (active ? theme.colors.orange300 : theme.colors.gray300)};
`;

const StBottomLine = styled.li`
  position: absolute;
  bottom: 0;

  width: 17.6rem;
  height: 0.3rem;

  background-color: ${({ theme }) => theme.colors.white400};
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
