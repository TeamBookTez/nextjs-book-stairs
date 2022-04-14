import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";

import { IcBookcase, IcHome, IcMypage, IcToBe } from "../../styles/icons/NavWrapperIcons";
import NavHeader from "./NavHeader";

export default function NavWrapper() {
  const { asPath } = useRouter();

  const defaultColor = "#C1C1C1";
  const highlightColor = "#FF4C00";

  const isCurrentPage = (pathName: string): string => {
    return asPath.startsWith(pathName) ? highlightColor : defaultColor;
  };

  return (
    <StSection>
      <NavHeader logoColor={"#FFFFFF"} />
      <StNav>
        <StUl>
          <StItem color={isCurrentPage("/main")}>
            <StLink href="/main" passHref>
              <StAnchorWrapper>
                <IcHome fillColor={isCurrentPage("/main")} />홈
              </StAnchorWrapper>
            </StLink>
          </StItem>

          <StItem color={isCurrentPage("/bookcase")}>
            <StLink href="/bookcase" passHref>
              <StAnchorWrapper>
                <IcBookcase fillColor={isCurrentPage("/bookcase")} />
                서재
              </StAnchorWrapper>
            </StLink>
          </StItem>

          <StItem color={isCurrentPage("/my-page")}>
            <StLink href="/my-page" passHref>
              <StAnchorWrapper>
                <IcMypage fillColor={isCurrentPage("/my-page")} />
                마이페이지
              </StAnchorWrapper>
            </StLink>
          </StItem>

          <StItem color={isCurrentPage("/to-be")}>
            <StLink href="/to-be" passHref>
              <StAnchorWrapper>
                <IcToBe fillColor={isCurrentPage("/to-be")} />
                준비중
              </StAnchorWrapper>
            </StLink>
          </StItem>
        </StUl>
      </StNav>
    </StSection>
  );
}

const StAnchorWrapper = styled.a`
  display: flex;
  align-items: center;
`;

const StSection = styled.section`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;

  background-color: #242424;
  width: 17.5rem; //NAV_WRAPPER_WIDTH
  color: #c1c1c1;

  z-index: 10;
`;

const StNav = styled.nav`
  margin-top: 12.3rem;

  font-family: Pretendard;
  font-weight: 700;
  font-size: 1.6rem;
  line-height: 1.3;
  letter-spacing: -0.1rem;
`;

const StUl = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 2.8rem;

  padding-left: 2.2rem;
`;

const StItem = styled.li<{ color: string }>`
  display: flex;
  align-items: center;
  color: ${({ color }) => color};

  &:hover {
    a {
      color: #ff4c00;
    }

    svg {
      fill: #ff4c00;
    }
  }
`;

const StLink = styled(Link)`
  width: 15.3rem;

  font-family: Pretendard;
  font-weight: 700;
  font-size: 1.6rem;
  line-height: 1.3;
  letter-spacing: -0.1rem;
`;
