'use client';

import React from 'react';
import { useSession } from '@/hooks/useSession';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps): React.ReactElement | null {
  const { isAuthenticated, isLoading } = useSession({ required: true });

  if (isLoading || !isAuthenticated) return null;

  return <>{children}</>;
}
