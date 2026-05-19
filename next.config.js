/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '162.0.230.240',
        port: '3000',
      },
    ],
  },
};

module.exports = nextConfig;

