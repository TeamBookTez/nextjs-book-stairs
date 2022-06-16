import styled from "@emotion/styled";
import { useRouter } from "next/router";

interface MainHeaderProps {
  isLogin?: boolean;
  pageName: string;
  color?: string;
}

export default function MainHeader(props: MainHeaderProps) {
  const { isLogin, pageName } = props;
  const router = useRouter();

  const bookcaseBottom = router.asPath.startsWith("/bookcase") ? "0.4rem" : "3.5rem";
  const isLoginBtnHidden = router.asPath === "/my-page" || router.asPath === "/to-be";

  return (
    <StHeader bottom={bookcaseBottom}>
      <StHeading2>{pageName}</StHeading2>
      {!isLogin && !isLoginBtnHidden && <StLoginBtn onClick={() => router.push("/login")}>로그인</StLoginBtn>}
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

const StLoginBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 1rem;

  background-color: ${({ theme }) => theme.colors.gray100};

  width: 12rem;
  height: 4.6rem;

  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.button}
`;
