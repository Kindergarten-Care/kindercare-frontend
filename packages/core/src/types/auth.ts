/** POST /auth/login request body. */
export interface LoginCredentials {
  /** Phone number or email address. */
  identifier: string;
  password: string;
}

export interface AuthUser {
  userId: number;
  username: string;
  roleId: number;
  roleName: string;
  fcmToken?: string;
}

/** Shape of `data` field in the login API response. */
export interface LoginData {
  token: string;
  user: AuthUser;
}
