const path = require("path");
const resolvePath = (_path) => path.join(process.cwd(), _path);

module.exports = {
  stories: ["../**/*.stories.mdx", "../**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions"],
  // framework: "@storybook/react",
  // core: {
  //   builder: "@storybook/builder-webpack5",
  // },
  webpackFinal: async (config) => ({
    ...config,
    resolve: {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        "@emotion/core": resolvePath("node_modules/@emotion/react"),
        "@emotion/styled": resolvePath("node_modules/@emotion/styled"),
        "emotion-theming": resolvePath("node_modules/@emotion/react"),
      },
    },
  }),
};
