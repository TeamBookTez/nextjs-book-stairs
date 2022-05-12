/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // svg를 컴포넌트로 쓰기 위한 방법
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

module.exports = nextConfig;
