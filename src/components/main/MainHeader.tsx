import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";

import { DefaultButton } from "../common/styled/Button";

interface MainHeaderProps {
  children: string;
  color?: string;
}

export default function MainHeader(props: MainHeaderProps) {
  const { children } = props;

  const { asPath } = useRouter();

  const bookcaseBottom = asPath.startsWith("/bookcase") ? "0.4rem" : "3.5rem";
  const isMypage = asPath === "/my-page" || asPath === "/to-be" ? "none" : "block";

  return (
    <StHeader bottom={bookcaseBottom}>
      <StHeading2>{children}</StHeading2>
      <StLoginBtn isMypage={isMypage}>
        <Link href="/login" passHref>
          <StLoginLink>로그인</StLoginLink>
        </Link>
      </StLoginBtn>
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

const StLoginBtn = styled(DefaultButton)<{ isMypage: string }>`
  display: ${(props) => props.isMypage};

  width: 12rem;
  height: 4.6rem;

  background-color: ${({ theme }) => theme.colors.gray100};

  border-radius: 1rem;

  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.button}
`;

const StLoginLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
`;
