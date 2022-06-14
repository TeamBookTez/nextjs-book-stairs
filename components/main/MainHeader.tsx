import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";

interface MainHeaderProps {
  isLogin?: boolean;
  pageName: string;
  color?: string;
}

export default function MainHeader(props: MainHeaderProps) {
  const { isLogin, pageName } = props;
  const { asPath } = useRouter();

  const bookcaseBottom = asPath.startsWith("/bookcase") ? "0.4rem" : "3.5rem";
  const displayAttr = asPath === "/my-page" || asPath === "/to-be" ? "none" : "flex";

  return (
    <StHeader bottom={bookcaseBottom}>
      <StHeading2>{pageName}</StHeading2>
      {isLogin && (
        <StLoginLink displayattr={displayAttr} href="/login" passHref>
          로그인
        </StLoginLink>
      )}
    </StHeader>
  );
}

const StHeader = styled.header<{ bottom: string }>`
  display: flex;
  justify-content: space-between;

  margin: 3.5rem 4rem ${(props) => props.bottom} 4rem;
  color: ${({ theme }) => theme.colors.gray100};
`;

const StHeading2 = styled.h2`
  ${({ theme }) => theme.fonts.header0};

  z-index: 10;
`;

const StLoginLink = styled(Link)<{ displayattr: string }>`
  display: ${(props) => props.displayattr};
  justify-content: center;
  align-items: center;

  border-radius: 1rem;

  background-color: ${({ theme }) => theme.colors.gray100};

  width: 12rem;
  height: 4.6rem;

  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.button}
`;
