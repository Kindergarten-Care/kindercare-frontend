import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
import path from 'path';
import { existsSync, readFileSync } from 'fs';

// Load root monorepo .env.local so NEXT_PUBLIC_* vars work when running next dev directly
function loadRootEnv() {
  const envPath = path.resolve(__dirname, '../../.env.local');
  if (!existsSync(envPath)) return;
  readFileSync(envPath, 'utf-8').split('\n').forEach(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx < 0) return;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim().replace(/^['"]|['"]$/g, '');
    if (key && !process.env[key]) process.env[key] = val;
  });
}
loadRootEnv();

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  async rewrites() {
    const target = process.env.NEXT_PUBLIC_API_URL;
    if (!target || target.startsWith('/')) return [];
    return [{ source: '/api/:path*', destination: `${target}/:path*` }];
  },
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

export default withNextIntl(nextConfig);
