/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'www.clinicdermatech.com',
      'wallpapercave.com',
      'localhost',
      'https://next-blog-api.cyclic.app',
    ],
  },
};

module.exports = nextConfig;
