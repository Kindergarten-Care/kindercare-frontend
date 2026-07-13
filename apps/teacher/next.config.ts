import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
import path from 'path';
import { loadMonorepoEnv } from '../../packages/config/withMonorepoEnv';

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
        hostname: 'media.kindercare.app',
      },
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
      },
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
      }
    ],
  },
  async rewrites() {
    const target = process.env.NEXT_PUBLIC_API_URL;
    // Rewrite /api/* → BE server (works with basePath '/teacher')
    // Browser calls: /api/teacher/classes → Next.js receives: /api/teacher/classes → rewrite to: https://web-test.kindercare.app/api/v1/teacher/classes
    const proxyRewrites = target && !target.startsWith('/')
      ? [{ source: '/api/:path*', destination: `${target}/:path*` }]
      : [];
    return proxyRewrites;
  },
};

export default withNextIntl(nextConfig);
