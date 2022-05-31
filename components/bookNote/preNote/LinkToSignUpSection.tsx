import styled from "@emotion/styled";
import Link from "next/link";

import { DefaultButton } from "../../common/styled/Button";

export default function LinkToSignUpSection() {
  return (
    <StLinkWrapper>
      <StSignupText>
        내 기대를 채워줄 책의 내용들은
        <br />
        앞으로 어떻게 구체화 될까요?
      </StSignupText>
      <Link href="/signup" passHref>
        <StButton className="btn_signup">회원가입 후 이어보기</StButton>
      </Link>
    </StLinkWrapper>
  );
}

const StLinkWrapper = styled.section`
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;

  height: 25.9rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background: linear-gradient(180deg, rgba(255, 255, 255, 0.2) -9.07%, rgba(194, 195, 204, 0.85) 100%);
`;

const StSignupText = styled.p`
  text-align: center;

  ${({ theme }) => theme.fonts.body0}
  color: ${({ theme }) => theme.colors.gray100};
`;

const StButton = styled(DefaultButton)`
  width: 32.5rem;
  height: 5.6rem;

  margin-top: 1.2rem;

  border-radius: 1rem;

  ${({ theme }) => theme.fonts.button}
`;
