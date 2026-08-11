/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    cpus: 1,
  },
  async redirects() {
    return [
      {
        source: '/for/content-creators',
        destination: '/for/marketers',
        statusCode: 301,
      },
      {
        source: '/for/entrepreneurs',
        destination: '/for/small-business',
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
