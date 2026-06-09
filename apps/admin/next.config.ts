import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
import path from 'path';
import { loadMonorepoEnv, withApiProxy } from '../../packages/config/withMonorepoEnv';

loadMonorepoEnv(path.resolve(__dirname, '../..'));

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  basePath: '/admin',
  output: 'standalone',
  reactCompiler: true,
  compiler: {
    styledComponents: true,
  },
};

export default withNextIntl(withApiProxy(nextConfig));
