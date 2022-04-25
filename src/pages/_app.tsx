import "../styles/globals.css";

import { Global, ThemeProvider } from "@emotion/react";
import type { AppProps } from "next/app";

import GlobalStyle, { resetStyle } from "../styles/globalStyle";
import theme from "../styles/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={resetStyle} />
      <Global styles={GlobalStyle} />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
