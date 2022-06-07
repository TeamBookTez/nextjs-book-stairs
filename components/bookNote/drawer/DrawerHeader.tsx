import styled from "@emotion/styled";
import Image from "next/image";

import { IcBooks, IcLeftArrow } from "../../../public/assets/icons";
import { ImgDrawer, ImgDrawerSmall } from "../../../public/assets/images";

interface DrawerHeaderProps {
  drawerIdx: number;
  onCloseDrawer: () => void;
}

export default function DrawerHeader(props: DrawerHeaderProps) {
  const { drawerIdx, onCloseDrawer } = props;

  return (
    <>
      <StIcWrapper>
        <StIcLeftArrow onClick={onCloseDrawer} />
      </StIcWrapper>
      {drawerIdx === 4 ? (
        <StImg src={ImgDrawer} drawerIdx={drawerIdx} />
      ) : (
        <StImg src={ImgDrawerSmall} drawerIdx={drawerIdx} />
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

const StImg = styled(Image)<{ drawerIdx: number }>`
  width: ${({ drawerIdx }) => (drawerIdx === 4 ? "53.4rem" : "32.4rem")};
  height: ${({ drawerIdx }) => (drawerIdx === 4 ? "12.5rem" : "11.9rem")};

  margin-bottom: 3.8rem;
  border-radius: 1.6rem;
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
