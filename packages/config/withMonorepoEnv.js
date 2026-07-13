import path from 'path';
import { existsSync, readFileSync } from 'fs';

function parseEnvFile(filePath) {
  if (!existsSync(filePath)) return {};
  const vars = {};
  for (const line of readFileSync(filePath, 'utf-8').split('\n')) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const idx = t.indexOf('=');
    if (idx < 0) continue;
    const key = t.slice(0, idx).trim();
    const val = t.slice(idx + 1).trim().replace(/^['"]|['"]$/g, '');
    if (key) vars[key] = val;
  }
  return vars;
}

/**
 * Load env files based on NODE_ENV:
 * - development / test  → .env.development + .env.local
 * - production          → .env.production + .env.local
 *
 * Vars already set in the environment (e.g. forwarded by the deploy system /
 * set in CI) are NOT overridden.
 *
 * Call this at the TOP of every app's next.config.ts:
 *   loadMonorepoEnv(path.resolve(__dirname, '../..'));
 */
export function loadMonorepoEnv(rootDir) {
  const isProd = process.env.NODE_ENV === 'production';
  const files = isProd
    ? ['.env.production', '.env.local']
    : ['.env.development', '.env.local'];
  for (const file of files) {
    const vars = parseEnvFile(path.resolve(rootDir, file));
    for (const [k, v] of Object.entries(vars)) {
      if (!process.env[k]) process.env[k] = v;
    }
  }
}

/**
 * Wrap a NextConfig with an API proxy rewrite:
 *   /api/* → NEXT_PUBLIC_API_URL/*
 *
 * This eliminates CORS issues in development.
 * In production, NEXT_PUBLIC_API_BASE is typically unset so the
 * client calls the API URL directly (CORS allowed on the server).
 */
export function withApiProxy(config) {
  return {
    ...config,
    async rewrites() {
      const target = process.env.NEXT_PUBLIC_API_URL;
      const proxyRewrites = target && !target.startsWith('/')
        ? [{ source: '/api/:path*', destination: `${target}/:path*` }]
        : [];

      const existing = config.rewrites ? await config.rewrites() : [];
      if (Array.isArray(existing)) {
        return [...existing, ...proxyRewrites];
      }
      return {
        beforeFiles: existing.beforeFiles ?? [],
        afterFiles:  [...(existing.afterFiles ?? []), ...proxyRewrites],
        fallback:    existing.fallback ?? [],
      };
    },
  };
}
