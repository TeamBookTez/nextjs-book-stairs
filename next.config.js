/** @type {import('next').NextConfig} */
const { BASE_URL, NEXT_PUBLIC_IMAGES_DOMAIN, NEXT_PUBLIC_KAKAO_IMAGES_DOMAIN } = process.env;

const nextConfig = {
  basePath: "",
  reactStrictMode: true,
  env: {
    BASE_URL: BASE_URL,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      loader: "@svgr/webpack",
      options: {
        prettier: false,
        svgo: true,
        svgoConfig: {
          plugins: [
            {
              name: "preset-default",
              params: {
                overrides: { removeViewBox: false },
              },
            },
          ],
        },
      },
    });
    return config;
  },
  images: {
    domains: ["/public", NEXT_PUBLIC_IMAGES_DOMAIN, NEXT_PUBLIC_KAKAO_IMAGES_DOMAIN],
  },
};

module.exports = nextConfig;
