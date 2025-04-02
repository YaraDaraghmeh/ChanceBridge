import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
        port: '',
        pathname: '/ecemgo/mini-samples-great-tricks/assets/**',
      },
    ],
  },
};

export default nextConfig;
