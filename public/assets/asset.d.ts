/*
마지막 편집자: 22-04-28 q-bit-junior
변경사항 및 참고:
  - svg를 컴포넌트로 이용하기 위해 모듈을 선언하고, asset.d.ts 에서 { ReactComponent as } 로 export 해주었으나
  webpack을 추가하고 next.config.js 파일을 수정하는 방법을 이용하였습니다.
  따라서 삭제해도 될 것 같습니다만 주석처리를 해놓았습니다.
    
고민점:
  - 
*/

declare module "*.jpg";
declare module "*.png";
declare module "*.jpeg";
declare module "*.gif";

// declare module "*.svg" {
//   import React = require("react");
//   export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
//   const src: string;
//   export default src;
// }
