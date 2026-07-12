'use client';

import React, { useEffect } from 'react';
import { useAuth } from '@kindercare/core';
import { useRouter } from '@/i18n/routing';
import HomeView from '@/views/Home';

export default function HomePage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !isAuthenticated) {
    return null; 
  }

  return <HomeView />;
}
