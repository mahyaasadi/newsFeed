/** @type {import('next').NextConfig} */

const nextConfig = {
  distDir: "build",
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    // This allows any host with HTTPS and HTTP protocol
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
