import { css } from "@emotion/react";

export const resetStyle = css`
  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }

  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }

  body {
    line-height: 1;
  }

  ul,
  ol,
  li {
    list-style: none;
  }

  blockquote,
  q {
    quotes: none;
  }

  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: "";
    content: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
`;

export const GlobalStyle = css`
  * {
    box-sizing: border-box;
  }

  &::-webkit-scrollbar {
    background-color: transparent;
    width: 0.8rem;
  }

  &::-webkit-scrollbar-track {
    height: auto;
  }

  &::-webkit-scrollbar-thumb {
    height: 10rem;
    border-radius: 1.6rem;
    background-color: #c1c1c1; // white500
  }

  /* @font-face {
    font-family: "Pretendard";
    font-weight: normal;
    font-style: normal;
    src: local("/fonts/PretendardVariable.woff2") format("woff2");
  } */
  /* font 로컬로 변경 대비하여 주석처리  */

  html {
    color: #242424; // gray100
    font-family: Pretendard;
    font-size: 62.5%;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  input,
  button {
    outline: none;
    border: none;
    background-color: transparent;
  }

  button {
    padding: 0;
    cursor: pointer;
  }

  input {
    -webkit-appearance: none; /* Safari and Chrome */
    -moz-appearance: none; /* Firefox */
    appearance: none;

    &:focus {
      outline: none;
    }
  }

  textarea {
    border: none;
    background-color: transparent;
    resize: none;
    outline: none;
  }

  input:focus::-webkit-input-placeholder,
  textarea:focus::-webkit-input-placeholder {
    /* WebKit browsers */
    color: transparent;
  }
  input:focus:-moz-placeholder,
  textarea:focus:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: transparent;
  }
  input:focus::-moz-placeholder,
  textarea:focus::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: transparent;
  }
  input:focus:-ms-input-placeholder,
  textarea:focus:-ms-input-placeholder {
    /* Internet Explorer 10+ */
    color: transparent;
  }
`;

export default GlobalStyle;
