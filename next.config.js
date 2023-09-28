/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: '/auth/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
