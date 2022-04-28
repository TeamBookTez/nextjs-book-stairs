/*
마지막 편집자: 22-04-28 q-bit-junior
변경사항 및 참고:
  - useNavigation 을 리액트에서 사용할때 { state: "rightpath"} 로 전달하던 것을,
  useRouter 로 변경하면서 query 객체에 넣었습니다. -> { query: {state: "rightpath"}}
    
고민점:
  - 
*/
import styled from "@emotion/styled";
import { useRouter } from "next/router";

import { IcMainLogo } from "../../../public/assets/icons";
import { DefaultButton } from "../common/styled/Button";

export default function LandingHeader() {
  const router = useRouter();

  return (
    <>
      <StHeader>
        <StLogo />
        <StBtnWrapper>
          <StBtnLogin onClick={() => router.push("/login")}>로그인</StBtnLogin>
          <StBtnSignup onClick={() => router.push("/signup", { query: { state: "rightpath" } })}>회원가입</StBtnSignup>
        </StBtnWrapper>
      </StHeader>
    </>
  );
}

const StHeader = styled.header`
  display: flex;
  justify-content: space-between;

  padding: 4rem 5.6rem 4rem 3.4rem;

  width: 100%;
`;

const StLogo = styled(IcMainLogo)`
  width: 25rem;
  height: 5rem;
`;

const StBtnWrapper = styled.div`
  display: flex;
`;

const StBtnLogin = styled(DefaultButton)`
  border-radius: 1rem;
  padding: 1.2rem 3.75rem 1.1rem 3.75rem;
  background-color: ${({ theme }) => theme.colors.white300};

  ${({ theme }) => theme.fonts.button}
  color: ${({ theme }) => theme.colors.gray400};

  & + button {
    margin-left: 2.1rem;
  }
`;

const StBtnSignup = styled(DefaultButton)`
  border-radius: 1rem;
  padding: 1.2rem 3.05rem 1.1rem 2.95rem;
  background-color: ${({ theme }) => theme.colors.gray100};

  ${({ theme }) => theme.fonts.button}
  color: ${({ theme }) => theme.colors.white};
`;
