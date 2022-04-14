import "../styles/globals.css";

import { ThemeProvider } from "@emotion/react";
import type { AppProps } from "next/app";

import theme from "../styles/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
