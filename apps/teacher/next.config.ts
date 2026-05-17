import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  /* config options here */
  basePath: '/teacher',
  output: 'standalone',
  reactCompiler: true,
  compiler: {
    styledComponents: true,
  },
};

export default withNextIntl(nextConfig);
