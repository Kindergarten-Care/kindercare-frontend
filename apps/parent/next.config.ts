import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
import path from 'path';
import { loadMonorepoEnv, withApiProxy } from '../../packages/config/withMonorepoEnv';

loadMonorepoEnv(path.resolve(__dirname, '../..'));

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  output: 'standalone',
  reactCompiler: true,
  transpilePackages: ['@kindercare/ui', '@kindercare/public', '@kindercare/core'],
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

export default withNextIntl(withApiProxy(nextConfig));
