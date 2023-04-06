import styled from "@emotion/styled";
import Link from "next/link";

import { IcLogo, IcTitleLogo } from "../icons/NavHeaderIcons";
import { LabelHidden } from "./styled/LabelHidden";

interface NavHeaderProps {
  logoColor: string;
}

export default function NavHeader(props: NavHeaderProps) {
  const { logoColor } = props;

  return (
    <StLink href="/main" passHref>
      <StAnchorWrapper>
        <IcLogo />
        <IcTitleLogo logoColor={logoColor} />
        <LabelHidden>북스테어즈</LabelHidden>
      </StAnchorWrapper>
    </StLink>
  );
}

const StLink = styled(Link)`
  position: relative;
`;

const StAnchorWrapper = styled.a`
  position: absolute;
  top: 0;
  left: 0;

  display: flex;
  align-items: center;

  width: 100%;
  height: 9rem;

  font-size: 1.6rem;
  font-weight: 700;
  letter-spacing: -0.2rem;
`;
