'use client';

import { useEffect } from 'react';
import { useLocale } from 'next-intl';
import { useAuth, useAppRouter } from '@kindercare/core';
import type { AuthUser } from '@kindercare/core';

export interface UseSessionOptions {
  /** If true, redirects unauthenticated users without active session to login. */
  required?: boolean;
  /** If true, redirects authenticated users with active session to dashboard. */
  redirectToDashboardIfAuth?: boolean;
}

export interface UseSessionReturn {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export function useSession(options?: UseSessionOptions): UseSessionReturn {
  const { required = false, redirectToDashboardIfAuth = false } = options ?? {};
  const locale = useLocale();
  const { user, isAuthenticated, isLoading } = useAuth();
  const { go } = useAppRouter({ locale });

  useEffect(() => {
    if (isLoading) return;

    if (required && !isAuthenticated) {
      go.parentLogin();
    } else if (redirectToDashboardIfAuth && isAuthenticated) {
      go.parentDashboard();
    }
  }, [isLoading, isAuthenticated, required, redirectToDashboardIfAuth, go]);

  return { user, isAuthenticated, isLoading };
}
