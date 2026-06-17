import type { NextConfig } from "next";
import path from 'path';
import { loadMonorepoEnv, withApiProxy } from '../../packages/config/withMonorepoEnv';

// Load monorepo environment variables
loadMonorepoEnv(path.resolve(__dirname, '../..'));

const nextConfig: NextConfig = {
  output: 'standalone',
  transpilePackages: ['@kindercare/ui', '@kindercare/core'],
  compiler: {
    styledComponents: true,
  },
};

export default withApiProxy(nextConfig);
