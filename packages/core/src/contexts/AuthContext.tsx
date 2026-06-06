'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { apiClient } from '../lib/apiClient';
import { tokenStorage } from '../lib/tokenStorage';
import { SERVER } from '../config/server';
import type { ApiResponse } from '../types/api';
import type { AuthUser, LoginCredentials, LoginData } from '../types/auth';

// ── Types ────────────────────────────────────────────────────────────────────

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AuthContextValue extends AuthState {
  login: (credentials: LoginCredentials & { rememberMe?: boolean }) => Promise<void>;
  logout: () => void;
}

// ── Context ──────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue | null>(null);

// ── Provider ─────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Rehydrate from storage on mount
  useEffect(() => {
    const token = tokenStorage.getAccessToken();
    if (token) {
      const savedUser = tokenStorage.getUser<AuthUser>();
      if (savedUser) {
        setState({ user: savedUser, isAuthenticated: true, isLoading: false });
      } else {
        tokenStorage.clearAll();
        setState({ user: null, isAuthenticated: false, isLoading: false });
      }
    } else {
      setState(s => ({ ...s, isLoading: false }));
    }
  }, []);

  // Listen for forced logout triggered by the apiClient interceptor
  useEffect(() => {
    const onForcedLogout = () =>
      setState({ user: null, isAuthenticated: false, isLoading: false });
    window.addEventListener('kc:auth:logout', onForcedLogout);
    return () => window.removeEventListener('kc:auth:logout', onForcedLogout);
  }, []);

  const login = useCallback(
    async ({ rememberMe = false, ...credentials }: LoginCredentials & { rememberMe?: boolean }) => {
      const { data: res } = await apiClient.post<ApiResponse<LoginData>>(
        SERVER.auth.login,
        credentials,
      );

      if (!res.success) throw new Error(res.message);

      const { token, user } = res.data;

      tokenStorage.setAccessToken(token, rememberMe);
      tokenStorage.setUser(user);

      setState({ user, isAuthenticated: true, isLoading: false });
    },
    [],
  );

  const logout = useCallback(() => {
    tokenStorage.clearAll();
    setState({ user: null, isAuthenticated: false, isLoading: false });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// ── Hook ─────────────────────────────────────────────────────────────────────

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
