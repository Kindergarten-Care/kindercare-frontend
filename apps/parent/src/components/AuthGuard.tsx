'use client';

import { useEffect } from 'react';
import { useLocale } from 'next-intl';
import { useAuth, useAppRouter } from '@kindercare/core';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const locale = useLocale();
  const { go } = useAppRouter({ locale });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      go.parentLogin();
    }
  }, [isLoading, isAuthenticated, go]);

  if (isLoading) return null;
  if (!isAuthenticated) return null;

  return <>{children}</>;
}
