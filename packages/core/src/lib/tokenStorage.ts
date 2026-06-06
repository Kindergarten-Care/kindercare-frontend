const ACCESS_COOKIE  = 'kc_access_token';
const REFRESH_KEY    = 'kc_refresh_token';
const USER_KEY       = 'kc_user';

const isBrowser = () => typeof window !== 'undefined';

function getCookieValue(name: string): string | null {
  if (!isBrowser()) return null;
  const entry = document.cookie.split('; ').find(r => r.startsWith(`${name}=`));
  return entry ? decodeURIComponent(entry.split('=')[1]) : null;
}

export const tokenStorage = {
  // ── Access token (cookie — readable by middleware for route protection) ──

  setAccessToken(token: string, persistent = false): void {
    if (!isBrowser()) return;
    const maxAge = persistent ? 7 * 24 * 3600 : undefined;
    document.cookie = [
      `${ACCESS_COOKIE}=${encodeURIComponent(token)}`,
      'path=/',
      'SameSite=Strict',
      maxAge ? `max-age=${maxAge}` : '',
    ].filter(Boolean).join('; ');
  },

  getAccessToken(): string | null {
    return getCookieValue(ACCESS_COOKIE);
  },

  clearAccessToken(): void {
    if (!isBrowser()) return;
    document.cookie = `${ACCESS_COOKIE}=; path=/; max-age=0`;
  },

  // ── Refresh token (localStorage) ──

  setRefreshToken(token: string): void {
    if (!isBrowser()) return;
    localStorage.setItem(REFRESH_KEY, token);
  },

  getRefreshToken(): string | null {
    if (!isBrowser()) return null;
    return localStorage.getItem(REFRESH_KEY);
  },

  clearRefreshToken(): void {
    if (!isBrowser()) return;
    localStorage.removeItem(REFRESH_KEY);
  },

  // ── User info (localStorage) ──

  setUser<T>(user: T): void {
    if (!isBrowser()) return;
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  getUser<T>(): T | null {
    if (!isBrowser()) return null;
    try {
      const raw = localStorage.getItem(USER_KEY);
      return raw ? (JSON.parse(raw) as T) : null;
    } catch {
      return null;
    }
  },

  clearUser(): void {
    if (!isBrowser()) return;
    localStorage.removeItem(USER_KEY);
  },

  // ── Helpers ──

  clearAll(): void {
    this.clearAccessToken();
    this.clearRefreshToken();
    this.clearUser();
    if (isBrowser()) {
      window.dispatchEvent(new Event('kc:auth:logout'));
    }
  },
};
