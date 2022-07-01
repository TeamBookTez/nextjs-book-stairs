/*
마지막 편집자: 22-07-01 soryeongk
변경사항 및 참고:
  - Image 태그 사용에 문제가 많아서 div의 background로 채우는 것으로 변경했습니다.
    본 컴포넌트를 사용할 때 width와 height를 꼭 지정해주세요!!
    
고민점:
  - 
*/

import styled from "@emotion/styled";

export const ImageWrapper = styled.div<{ thumbnail: string }>`
  background-image: url(${({ thumbnail }) => thumbnail});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`;

export const StBookCardImgWrapper = styled(ImageWrapper)`
  /* 뷰 이슈로 곡률 완화 */
  border-radius: 1.4rem;

  object-fit: cover;
`;
