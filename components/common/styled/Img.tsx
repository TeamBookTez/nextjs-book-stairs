/*
마지막 편집자: 22-05-03 joohaem
변경사항 및 참고:
  - StBookCardImgWrapper img 태그였으나, 
  Image next 태그를 사용하고 wrapper로 사용하기 위해
  div 태그로 변경하였습니다
    
고민점:
  -

*/

import styled from "@emotion/styled";

export const StBookCardImgWrapper = styled.div`
  width: 100%;
  height: 100%;

  /* 뷰 이슈로 곡률 완화 */
  border-radius: 1.4rem;

  object-fit: cover;
`;
