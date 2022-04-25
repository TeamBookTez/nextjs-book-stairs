import styled from "@emotion/styled";

export const DefaultButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.orange100};

  color: ${({ theme }) => theme.colors.white}; ;
`;
