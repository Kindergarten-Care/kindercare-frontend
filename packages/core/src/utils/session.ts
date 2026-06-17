interface SessionData {
  token: string;
  role: string;
  expiresAt: number;
}

const SESSION_KEY = 'kc_session';
const COOKIE_TOKEN_KEY = 'kc_token';

const isBrowser = (): boolean => typeof window !== 'undefined';

function readCookie(name: string): string | null {
  if (!isBrowser()) return null;
  const match = document.cookie.split('; ').find(c => c.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.split('=')[1]) : null;
}

function writeCookie(name: string, value: string, maxAge?: number): void {
  if (!isBrowser()) return;
  const parts = [
    `${name}=${encodeURIComponent(value)}`,
    'path=/',
    'SameSite=Strict',
  ];
  if (maxAge) parts.push(`max-age=${maxAge}`);
  document.cookie = parts.join('; ');
}

function deleteCookie(name: string): void {
  if (!isBrowser()) return;
  document.cookie = `${name}=; path=/; max-age=0`;
}

export function setSession(token: string, role: string, expiresInMinutes: number = 30): void {
  if (!isBrowser()) return;
  const expiresAt = Date.now() + expiresInMinutes * 60 * 1000;
  const sessionData: SessionData = { token, role, expiresAt };
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
  
  // Also write the cookie so other app ports on localhost can read it
  writeCookie(COOKIE_TOKEN_KEY, token, expiresInMinutes * 60);
}

export function getSession(): { token: string; role: string } | null {
  if (!isBrowser()) return null;
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw) as SessionData;
    if (Date.now() > session.expiresAt) {
      clearSession();
      return null;
    }
    return { token: session.token, role: session.role };
  } catch {
    clearSession();
    return null;
  }
}

export function clearSession(): void {
  if (!isBrowser()) return;
  sessionStorage.removeItem(SESSION_KEY);
  deleteCookie(COOKIE_TOKEN_KEY);
}

export function isSessionValid(): boolean {
  return getSession() !== null;
}

export function getToken(): string | null {
  if (!isBrowser()) return null;
  const session = getSession();
  return session ? session.token : readCookie(COOKIE_TOKEN_KEY);
}
