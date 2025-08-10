/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ['*']
    }
  },
  webpack: (config, { isServer }) => {
    // Monaco workers (Next.js 15 + app router)
    if (!isServer) {
      config.resolve.fallback = { fs: false, path: false, crypto: false };
    }
    return config;
  }
};

export default nextConfig;
