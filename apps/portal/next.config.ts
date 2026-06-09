import type { NextConfig } from "next";
import path from 'path';
import { loadMonorepoEnv, withApiProxy } from '../../packages/config/withMonorepoEnv';

loadMonorepoEnv(path.resolve(__dirname, '../..'));

const nextConfig: NextConfig = {
  output: 'standalone',
  transpilePackages: ['@kindercare/ui', '@kindercare/core'],
  compiler: {
    styledComponents: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://web-test.kindercare.app/api/:path*', // Proxy to Backend
      },
    ];
  },
};

export default withApiProxy(nextConfig);
