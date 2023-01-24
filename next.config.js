/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'www.clinicdermatech.com',
      'wallpapercave.com',
      'localhost',
      'next-blog-api.iran.liara.run',
      'next-blog-nly8.onrender.com',
    ],
  },
};

module.exports = nextConfig;
