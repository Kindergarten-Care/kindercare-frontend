// ── Request ───────────────────────────────────────────────────────────────────

export interface LoginRequest {
  /** Phone number or email address. */
  identifier: string;
  password: string;
}

// ── Response ──────────────────────────────────────────────────────────────────

export interface AuthUser {
  userId: number;
  username: string;
  roleId: number;
  roleName: string;
  fcmToken?: string;
}

export interface LoginData {
  token: string;
  user: AuthUser;
}

// ── Session ───────────────────────────────────────────────────────────────────

export interface AuthSession {
  user: AuthUser;
  token: string;
}
