/*
마지막 편집자: 22-06-20 joohaem
변경사항 및 참고:
  - menuposition === "isPriA" ? "2.9rem" : ~
    이었습니다만, 사용되는 곳이 없어 수정하였습니다
    
고민점:
  - 
*/

import styled from "@emotion/styled";

export const StMenuWrapper = styled.div<{ menuposition?: "isTopOfQA" }>`
  display: none;

  position: absolute;
  top: ${({ menuposition }) => (menuposition === "isTopOfQA" ? "6rem" : "4.3rem")};
  right: ${({ menuposition }) => (menuposition === "isTopOfQA" ? "4.4rem" : "1.6rem")};
  z-index: 10;

  border: 0.1rem solid ${({ theme }) => theme.colors.gray200};
  border-radius: 0.8rem;
  padding: 0.4rem;
  background-color: ${({ theme }) => theme.colors.white};
`;
