/** @type {import('next').NextConfig} */
const { BASE_URL, NEXT_PUBLIC_IMAGES_DOMAIN, NEXT_PUBLIC_KAKAO_IMAGES_DOMAIN } = process.env;

const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_URL: BASE_URL,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  images: {
    domains: [NEXT_PUBLIC_IMAGES_DOMAIN, NEXT_PUBLIC_KAKAO_IMAGES_DOMAIN],
  },
};

module.exports = nextConfig;
