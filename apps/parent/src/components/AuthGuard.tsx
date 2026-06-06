'use client';

import React, { useEffect } from 'react';
import { useLocale } from 'next-intl';
import { useAuth, useAppRouter } from '@kindercare/core';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const locale = useLocale();
  const { go } = useAppRouter({ locale });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      go.parentLogin();
    }
  }, [isLoading, isAuthenticated, go]);

  if (isLoading || !isAuthenticated) return null;

  return <>{children}</>;
}
