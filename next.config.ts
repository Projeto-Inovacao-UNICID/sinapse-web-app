import type { NextConfig } from "next";

const nextConfig: NextConfig = {
};

module.exports = {
  async rewrites() {
    return [
      {
        source: '/ws/:path*',
        destination: 'http://localhost:8080/ws/:path*',
      },
    ];
  },
};

export default nextConfig;
