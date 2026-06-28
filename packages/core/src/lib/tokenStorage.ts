import type { AuthUser } from '../types/auth';

const TOKEN_COOKIE = 'kc_token';
const USER_KEY     = 'kc_user';

const PERSISTENT_MAX_AGE = 3 * 24 * 3600; // 3 days

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

function getJwtExpiry(token: string): number | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    let base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    const payload = JSON.parse(jsonPayload);
    if (typeof payload.exp === 'number') {
      return payload.exp; // epoch time in seconds
    }
  } catch (e) {
    console.error('Failed to parse JWT expiry:', e);
  }
  return null;
}

// ── Token ─────────────────────────────────────────────────────────────────────

export function getToken(): string | null {
  return readCookie(TOKEN_COOKIE) ?? (isBrowser() ? sessionStorage.getItem(TOKEN_COOKIE) : null);
}

export function setToken(token: string, persistent = false): void {
  if (!isBrowser()) return;
  if (persistent) {
    const exp = getJwtExpiry(token);
    const maxAge = exp ? Math.max(0, exp - Math.floor(Date.now() / 1000)) : PERSISTENT_MAX_AGE;
    writeCookie(TOKEN_COOKIE, token, maxAge);
  } else {
    sessionStorage.setItem(TOKEN_COOKIE, token);
  }
}

export function clearToken(): void {
  if (!isBrowser()) return;
  deleteCookie(TOKEN_COOKIE);
  sessionStorage.removeItem(TOKEN_COOKIE);
}

// ── User ──────────────────────────────────────────────────────────────────────

export function getStoredUser(): AuthUser | null {
  if (!isBrowser()) return null;
  try {
    const raw = localStorage.getItem(USER_KEY) ?? sessionStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

export function setStoredUser(user: AuthUser, persistent = false): void {
  if (!isBrowser()) return;
  const raw = JSON.stringify(user);
  if (persistent) {
    localStorage.setItem(USER_KEY, raw);
  } else {
    sessionStorage.setItem(USER_KEY, raw);
  }
}

export function clearStoredUser(): void {
  if (!isBrowser()) return;
  localStorage.removeItem(USER_KEY);
  sessionStorage.removeItem(USER_KEY);
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
