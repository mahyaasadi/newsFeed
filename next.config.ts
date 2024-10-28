/** @type {import('next').NextConfig} */

const nextConfig = {
  // reactStrictMode: false,
  distDir: "build",
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // This allows any host with HTTPS protocol
      },
    ],
  },
};

module.exports = nextConfig;
