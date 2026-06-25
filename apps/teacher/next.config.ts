import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
import path from 'path';
import { loadMonorepoEnv, withApiProxy } from '../../packages/config/withMonorepoEnv';

loadMonorepoEnv(path.resolve(__dirname, '../..'));

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  basePath: '/teacher',
  output: 'standalone',
  reactCompiler: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me',
      }
    ],
  },
};

export default withNextIntl(withApiProxy(nextConfig));
