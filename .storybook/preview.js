import { Global, ThemeProvider } from "@emotion/react";
import GlobalStyle, { resetStyle } from "../styles/globalStyle";
import theme from "../styles/theme";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story, context) => (
    <ThemeProvider theme={theme}>
      <Global styles={resetStyle} />
      <Global styles={GlobalStyle} />
      <Story {...context} />
    </ThemeProvider>
  ),
];
