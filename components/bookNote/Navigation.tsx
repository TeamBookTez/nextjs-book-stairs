/*
마지막 편집자: 22-06-11 joohaem
변경사항 및 참고:
  - 
    
고민점:
  - sibling 컴포넌트 북노트의 data를 저장하기 기능을 추가해야 함
*/

import styled from "@emotion/styled";
import { flushSync } from "react-dom";

import { BookNotePathKey, SavingProgress } from "../../types/bookNote";

interface NavigationProps {
  navIndex: BookNotePathKey;
  isPreventedPreNote: boolean;
  handleNavIndex: (idx: BookNotePathKey) => void;
  handleSavingProgress: (obj: SavingProgress) => void;
  onSetDrawerAsDefault: () => void;
}

export default function Navigation(props: NavigationProps) {
  const { navIndex, isPreventedPreNote, handleNavIndex, handleSavingProgress, onSetDrawerAsDefault } = props;

  const onClickNavList = (idx: BookNotePathKey) => {
    onSetDrawerAsDefault();

    if (idx === "peri" && isPreventedPreNote) return;

    // 토스트가 사라지기 전에 네비게이션이 이동했을 때 저장되지 않는 버그를 막기 위해 flushSync
    // flushSync로 감싸게 되면 해당 setState에 대해서는 state batch를 막아줌
    flushSync(() => {
      handleSavingProgress({ isPending: true, isError: false });
    });
    handleNavIndex(idx);
    handleSavingProgress({ isPending: false, isError: false });
  };

  return (
    <StNav>
      <StUl>
        <StList onClick={() => onClickNavList("pre")} active={navIndex === "pre"}>
          독서 전
        </StList>
        <StList onClick={() => onClickNavList("peri")} active={navIndex === "peri"}>
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
