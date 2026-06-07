import path from 'path';
import { existsSync, readFileSync } from 'fs';
import type { NextConfig } from 'next';

function parseEnvFile(filePath: string): Record<string, string> {
  if (!existsSync(filePath)) return {};
  const vars: Record<string, string> = {};
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
 * Load .env.development then .env.local from the monorepo root into process.env.
 * Vars already set in the environment (e.g. forwarded by Turbo) are NOT overridden.
 *
 * Call this at the TOP of every app's next.config.ts:
 *   loadMonorepoEnv(path.resolve(__dirname, '../..'));
 */
export function loadMonorepoEnv(rootDir: string): void {
  for (const file of ['.env.development', '.env.local']) {
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
export function withApiProxy(config: NextConfig): NextConfig {
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
