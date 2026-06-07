import type { AuthUser } from '../types/auth';

const TOKEN_COOKIE = 'kc_token';
const USER_KEY     = 'kc_user';

const PERSISTENT_MAX_AGE = 7 * 24 * 3600; // 7 days

const isBrowser = () => typeof window !== 'undefined';

function readCookie(name: string): string | null {
  if (!isBrowser()) return null;
  const match = document.cookie.split('; ').find(c => c.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.split('=')[1]) : null;
}

function writeCookie(name: string, value: string, maxAge?: number): void {
  const parts = [
    `${name}=${encodeURIComponent(value)}`,
    'path=/',
    'SameSite=Strict',
  ];
  if (maxAge) parts.push(`max-age=${maxAge}`);
  document.cookie = parts.join('; ');
}

function deleteCookie(name: string): void {
  document.cookie = `${name}=; path=/; max-age=0`;
}

// ── Token ─────────────────────────────────────────────────────────────────────

export function getToken(): string | null {
  return readCookie(TOKEN_COOKIE);
}

export function setToken(token: string, persistent = false): void {
  if (!isBrowser()) return;
  writeCookie(TOKEN_COOKIE, token, persistent ? PERSISTENT_MAX_AGE : undefined);
}

export function clearToken(): void {
  if (!isBrowser()) return;
  deleteCookie(TOKEN_COOKIE);
}

// ── User ──────────────────────────────────────────────────────────────────────

export function getStoredUser(): AuthUser | null {
  if (!isBrowser()) return null;
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

export function setStoredUser(user: AuthUser): void {
  if (!isBrowser()) return;
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearStoredUser(): void {
  if (!isBrowser()) return;
  localStorage.removeItem(USER_KEY);
}

// ── Session ───────────────────────────────────────────────────────────────────

export function isSessionValid(): boolean {
  return getToken() !== null && getStoredUser() !== null;
}

export function clearSession(): void {
  clearToken();
  clearStoredUser();
  if (isBrowser()) {
    window.dispatchEvent(new Event('kc:auth:logout'));
  }
}

/** @deprecated Use named exports instead */
export const tokenStorage = {
  getAccessToken: getToken,
  setAccessToken: setToken,
  clearAccessToken: clearToken,
  getUser: getStoredUser,
  setUser: setStoredUser,
  clearUser: clearStoredUser,
  clearAll: clearSession,
};
