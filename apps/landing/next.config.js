/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactCompiler: true,
  transpilePackages: ['@kindercare/ui', '@kindercare/core'],
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.kindercare.app',
      },
    ],
  },
};

module.exports = nextConfig;
