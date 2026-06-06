import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  /* config options here */
  basePath: '/parents',
  output: 'standalone',
  reactCompiler: true,
  transpilePackages: ['@kindercare/ui', '@kindercare/public'],
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

export default withNextIntl(nextConfig);
