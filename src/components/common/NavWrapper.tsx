import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";

import { IcBookcase, IcHome, IcMypage, IcToBe } from "../../styles/icons/NavWrapperIcons";
import NavHeader from "./NavHeader";

export default function NavWrapper() {
  const { asPath } = useRouter();

  const defaultColor = "#C1C1C1"; // white500
  const highlightColor = "#FF4C00"; // orange100

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

  background-color: ${({ theme }) => theme.colors.gray100};
  width: 17.5rem; //NAV_WRAPPER_WIDTH
  color: ${({ theme }) => theme.colors.white500};

  z-index: 10;
`;

const StNav = styled.nav`
  margin-top: 12.3rem;

  ${({ theme }) => theme.fonts.body5}
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
      color: ${({ theme }) => theme.colors.orange100};
    }
    }

    svg {
      fill: ${({ theme }) => theme.colors.orange100};
    }
  }
`;

const StLink = styled(Link)`
  width: 15.3rem;

  ${({ theme }) => theme.fonts.body5};
`;
