import styled from "@emotion/styled";

import { IcBooks, IcLeftArrow } from "../../../public/assets/icons";
import { ImgDrawer, ImgDrawerSmall } from "../../../public/assets/images";
import { ImageWrapper } from "../../common/styled/Img";

interface DrawerHeaderProps {
  stepUpNDrawerIdx: number;
  onCloseDrawer: () => void;
}

export default function DrawerHeader(props: DrawerHeaderProps) {
  const { stepUpNDrawerIdx, onCloseDrawer } = props;

  return (
    <>
      <StIcWrapper>
        <StIcLeftArrow onClick={onCloseDrawer} />
      </StIcWrapper>
      {stepUpNDrawerIdx === 4 ? (
        <StImg thumbnail={ImgDrawer.src} width={"53.4rem"} height={"12.5rem"} />
      ) : (
        <StImg thumbnail={ImgDrawerSmall.src} width={"32.4rem"} height={"11.9rem"} />
      )}
      <StTitleWrapper>
        <IcBooks />
        나는 왜 이 일을 하는가?
      </StTitleWrapper>
    </>
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

const StImg = styled(ImageWrapper)<{ width: string; height: string }>`
  margin-bottom: 3.8rem;
  border-radius: 1.6rem;

  width: ${({ width }) => width};
  height: ${({ height }) => height};
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
