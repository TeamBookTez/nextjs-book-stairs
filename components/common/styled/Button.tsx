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
