/*
마지막 편집자: 22-04-28 q-bit-junior
변경사항 및 참고:
  - 소령님이나 주함님께서 Button -> DefaultButton 으로 수정하셨던 부분
  그대로 이용하겠습니다!
    
고민점:
  - 
*/
import styled from "@emotion/styled";

export const DefaultButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.orange100};

  color: ${({ theme }) => theme.colors.white}; ;
`;

export const StAddAnswerButton = styled.button`
  width: 6.6rem;
  height: 3.4rem;

  ${({ theme }) => theme.fonts.caption}
  color: ${({ theme }) => theme.colors.gray400};
`;

export const StMenuBtn = styled(DefaultButton)`
  border-radius: 0.8rem;
  background-color: transparent;
  width: 9.5rem;
  height: 3.8rem;
  ${({ theme }) => theme.fonts.caption}
  color: ${({ theme }) => theme.colors.gray200};

  &:hover {
    background-color: ${({ theme }) => theme.colors.white300};
  }
`;
