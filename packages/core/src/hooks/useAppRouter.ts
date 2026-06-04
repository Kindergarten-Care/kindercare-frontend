'use client';

/** All micro-frontend apps in the monorepo. */
export type AppKey = 'landing' | 'parent' | 'teacher' | 'principal' | 'admin' | 'portal';

export interface AppRouterOptions {
  /** Current locale string (e.g. 'vi', 'en'). Defaults to 'vi'. */
  locale?: string;
  /**
   * The default locale that uses NO url prefix (localePrefix: 'as-needed').
   * Defaults to 'vi'.
   */
  defaultLocale?: string;
}

/** Base URLs for every app — read from env vars with localhost fallbacks for dev. */
function resolveBase(app: AppKey): string {
  const bases: Record<AppKey, string> = {
    landing:   process.env.NEXT_PUBLIC_LANDING_APP_URL   ?? 'http://localhost:3004',
    parent:    process.env.NEXT_PUBLIC_PARENT_APP_URL    ?? 'http://localhost:3000',
    teacher:   process.env.NEXT_PUBLIC_TEACHER_APP_URL   ?? 'http://localhost:3001',
    principal: process.env.NEXT_PUBLIC_PRINCIPAL_APP_URL ?? 'http://localhost:3002',
    admin:     process.env.NEXT_PUBLIC_ADMIN_APP_URL     ?? 'http://localhost:3003',
    portal:    process.env.NEXT_PUBLIC_PORTAL_APP_URL    ?? 'http://localhost:3005',
  };
  return bases[app];
}

/**
 * Cross-app router for the KinderCare monorepo.
 *
 * @example
 * // As a link href
 * const { urls } = useAppRouter({ locale });
 * <a href={urls.parentLogin}>Đăng nhập phụ huynh</a>
 *
 * @example
 * // Imperative navigation
 * const { go } = useAppRouter({ locale });
 * go.parentLogin();
 *
 * @example
 * // Custom path for any app
 * const { buildUrl } = useAppRouter({ locale });
 * buildUrl('admin', '/dashboard/students')
 */
export function useAppRouter(options?: AppRouterOptions) {
  const { locale = 'vi', defaultLocale = 'vi' } = options ?? {};

  /** Builds a full URL for a given app and path, injecting the locale prefix when needed. */
  function buildUrl(app: AppKey, path: string): string {
    const base = resolveBase(app);
    const prefix = locale !== defaultLocale ? `/${locale}` : '';
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return `${base}${prefix}${normalizedPath}`;
  }

  /** Hard-navigates to a URL (works for both same-app and cross-app). */
  function navigate(url: string): void {
    if (typeof window !== 'undefined') {
      window.location.href = url;
    }
  }

  /** Pre-built href strings — handy for `<a href>` or `<Link href>`. */
  const urls = {
    parentLogin:        buildUrl('parent',    '/login'),
    teacherLogin:       buildUrl('teacher',   '/login'),
    principalDashboard: buildUrl('principal', '/'),
    adminDashboard:     buildUrl('admin',     '/'),
    portalLogin:        buildUrl('portal',    '/login'),
    landing:            buildUrl('landing',   '/'),
  } as const;

  /** Imperative navigation helpers. */
  const go = {
    parentLogin:        () => navigate(urls.parentLogin),
    teacherLogin:       () => navigate(urls.teacherLogin),
    principalDashboard: () => navigate(urls.principalDashboard),
    adminDashboard:     () => navigate(urls.adminDashboard),
    portalLogin:        () => navigate(urls.portalLogin),
    landing:            () => navigate(urls.landing),
    custom: (app: AppKey, path: string) => navigate(buildUrl(app, path)),
  } as const;

  return { buildUrl, navigate, urls, go };
}
