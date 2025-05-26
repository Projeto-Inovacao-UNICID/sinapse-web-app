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

       {
        source: '/api/profile/company/:id/imagem',
        destination: 'http://localhost:8080/profile/company/:id/imagem',
      },
    
      {
        source: '/api/:path*',
        destination: 'http://localhost:8080/:path*',
      }
    ];
  },
};

export default nextConfig;
