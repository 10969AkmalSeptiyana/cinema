/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    IMAGE_URL: process.env.IMAGE_URL,
  },
  images: {
    domains: [process.env.IMAGE_DOMAIN],
  },
};

module.exports = nextConfig;
