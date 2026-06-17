// ── Request ───────────────────────────────────────────────────────────────────

export interface LoginRequest {
  /** Phone number or email address. */
  identifier: string;
  password: string;
}

// ── Response ──────────────────────────────────────────────────────────────────

export interface AuthStudent {
  studentId: number;
  fullName: string;
  relationship: string;
  avatarUrl?: string;
  classId?: number;
  className?: string;
}

export interface AuthUser {
  userId: number;
  username: string;
  roleId: number;
  roleName: string;
  fcmToken?: string;
  fullName?: string;
  relationship?: string;
  children?: AuthStudent[];
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
