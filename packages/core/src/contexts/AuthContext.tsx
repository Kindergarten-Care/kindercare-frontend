'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import { apiClient } from '../lib/apiClient';
import {
  getToken,
  getStoredUser,
  setToken,
  setStoredUser,
  clearSession,
} from '../lib/tokenStorage';
import { SERVER } from '../config/server';
import type { ApiResponse } from '../types/api';
import type { AuthUser, LoginRequest, LoginData } from '../types/auth';

// ── State ─────────────────────────────────────────────────────────────────────

type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'unauthenticated';

interface AuthState {
  status: AuthStatus;
  user: AuthUser | null;
}

type AuthAction =
  | { type: 'INIT' }
  | { type: 'AUTHENTICATED'; user: AuthUser }
  | { type: 'UNAUTHENTICATED' };

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'INIT':
      return { ...state, status: 'loading' };
    case 'AUTHENTICATED':
      return { status: 'authenticated', user: action.user };
    case 'UNAUTHENTICATED':
      return { status: 'unauthenticated', user: null };
  }
}

// ── Context value ─────────────────────────────────────────────────────────────

export interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginRequest, options?: { rememberMe?: boolean; loginUrl?: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

// ── Provider ──────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, {
    status: 'idle',
    user: null,
  });

  useEffect(() => {
    dispatch({ type: 'INIT' });
    if (getToken() && getStoredUser()) {
      dispatch({ type: 'AUTHENTICATED', user: getStoredUser()! });
    } else {
      clearSession();
      dispatch({ type: 'UNAUTHENTICATED' });
    }
  }, []);

  useEffect(() => {
    const handleForcedLogout = () => dispatch({ type: 'UNAUTHENTICATED' });
    window.addEventListener('kc:auth:logout', handleForcedLogout);
    return () => window.removeEventListener('kc:auth:logout', handleForcedLogout);
  }, []);

  const login = useCallback(
    async (credentials: LoginRequest, options?: { rememberMe?: boolean; loginUrl?: string }) => {
      const url = options?.loginUrl || SERVER.auth.login;
      const { data: res } = await apiClient.post<ApiResponse<LoginData>>(
        url,
        credentials,
      );

      if (!res.success) throw new Error(res.message);

      const { token, user } = res.data;
      setToken(token, options?.rememberMe);
      setStoredUser(user, options?.rememberMe);
      dispatch({ type: 'AUTHENTICATED', user });
    },
    [],
  );

  const logout = useCallback(async () => {
    try {
      // Call the backend to invalidate the token (if required)
      await apiClient.post(SERVER.auth.logout);
    } catch (error) {
      console.error('Logout API failed:', error);
    } finally {
      clearSession();
      dispatch({ type: 'UNAUTHENTICATED' });
    }
  }, []);

  const value: AuthContextValue = {
    user: state.user,
    isAuthenticated: state.status === 'authenticated',
    isLoading: state.status === 'idle' || state.status === 'loading',
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
