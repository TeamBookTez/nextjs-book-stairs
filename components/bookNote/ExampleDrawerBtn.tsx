import styled from "@emotion/styled";

import { IcRightArrow } from "../../public/assets/icons";

interface ExampleDrawerBtnProps {
  idx: number;
  onOpenDrawer: (i: number) => void;
}

export default function ExampleDrawerBtn(props: ExampleDrawerBtnProps) {
  const { idx, onOpenDrawer } = props;

  return (
    <StButton type="button" onClick={() => onOpenDrawer(idx)}>
      예시
      <StIcon />
    </StButton>
  );
}

const StButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;

  border-radius: 0.8rem;
  padding: 1.05rem 2.1rem;
  background-color: ${({ theme }) => theme.colors.white300};

  min-width: 8.7rem;
  height: 4.2rem;

  ${({ theme }) => theme.fonts.body5}
`;

const StIcon = styled(IcRightArrow)`
  width: 0.6rem;
  height: 1.2rem;
`;
