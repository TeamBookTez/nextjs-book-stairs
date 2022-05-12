/*
마지막 편집자: 22-05-03 joohaem
변경사항 및 참고:
  - StBookCardImg img 태그였으나, 
  Image next 태그를 사용하고 wrapper로 사용하기 위해
  div 태그로 변경하였습니다
    
고민점:
  - StBookCardImg -> StBookCardImgWrapper 변수명 변경을 원하나,
  후에 찾기 어려울까봐
*/

import styled from "@emotion/styled";

export const StBookCardImg = styled.img`
  width: 100%;
  height: 100%;

  /* 뷰 이슈로 곡률 완화 */
  border-radius: 1.4rem;

  object-fit: cover;
`;
