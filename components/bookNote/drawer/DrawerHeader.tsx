import { css } from "@emotion/react";
import styled from "@emotion/styled";

import { IcBooks, IcLeftArrow } from "../../../public/assets/icons";
import { ImgDrawer, ImgDrawerSmall } from "../../../public/assets/images";

interface DrawerHeaderProps {
  stepUpNDrawerIdx: number;
  onCloseDrawer: () => void;
}

export default function DrawerHeader(props: DrawerHeaderProps) {
  const { stepUpNDrawerIdx, onCloseDrawer } = props;

  return (
    <header>
      <StIcWrapper>
        <StIcLeftArrow onClick={onCloseDrawer} />
      </StIcWrapper>
      <StImgWrapper idx={stepUpNDrawerIdx} />
      <StTitleWrapper>
        <IcBooks />
        나는 왜 이 일을 하는가?
      </StTitleWrapper>
    </header>
  );
}

const StIcWrapper = styled.div`
  text-align: left;
  margin-bottom: 3.2rem;
`;

const StIcLeftArrow = styled(IcLeftArrow)`
  &:hover {
    cursor: pointer;
  }
`;

const StImgWrapper = styled.div<{ idx: number }>`
  position: relative;

  margin-bottom: 3.8rem;
  border-radius: 1.6rem;

  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  ${({ idx }) =>
    idx === 4
      ? css`
          width: 53.4rem;
          height: 12.5rem;
          background-image: url(${ImgDrawer.src});
        `
      : css`
          width: 32.4rem;
          height: 11.9rem;
          background-image: url(${ImgDrawerSmall.src});
        `}
`;

const StTitleWrapper = styled.header`
  display: flex;
  margin-bottom: 2rem;

  ${({ theme }) => theme.fonts.header4};

  & > svg {
    width: 2rem;
    height: 2.1rem;

    margin-right: 0.6rem;
  }
`;
