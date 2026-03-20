/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'miaoda-edit-image.s3cdn.medo.dev',
      },
      {
        protocol: 'https',
        hostname: 'miaoda-site-img.s3cdn.medo.dev',
      },
      {
        protocol: 'https',
        hostname: 'miaoda-conversation-file.s3cdn.medo.dev',
      },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000'],
    },
  },
};

module.exports = nextConfig;
