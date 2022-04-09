import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";

import { DefaultButton } from "../../styles/common/DefaultButton";

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
  color: #242424;
`;

const StHeading2 = styled.h2`
  font-family: Pretendard;
  font-weight: 800;
  font-size: 3rem;
  line-height: 1.3;
  letter-spacing: -0.1rem;

  z-index: 10;
`;

const StLoginBtn = styled(DefaultButton)<{ isMypage: string }>`
  display: ${(props) => props.isMypage};

  width: 12rem;
  height: 4.6rem;

  background-color: #242424;

  border-radius: 1rem;

  font-family: Pretendard;
  font-weight: 700;
  font-size: 1.8rem;
  line-height: 1.3;
  letter-spacing: -0.1rem;
  color: #ffffff;
`;

const StLoginLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
`;
