'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '@kindercare/core';
import { PrincipalDomainModel } from '@/config/types/principal';
import { principalService } from '@/services/Principal/PrincipalService';

interface PrincipalContextValue {
  profile: PrincipalDomainModel | null;
  loading: boolean;
}

const PrincipalContext = createContext<PrincipalContextValue | null>(null);

export function PrincipalProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [profile, setProfile] = useState<PrincipalDomainModel | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (authLoading) return;
    if (isAuthenticated) {
      setLoading(true);
      principalService.getProfile()
        .then(data => {
          setProfile(data);
        })
        .finally(() => setLoading(false));
    } else {
      setProfile(null);
    }
  }, [isAuthenticated, authLoading]);

  return (
    <PrincipalContext.Provider value={{ profile, loading }}>
      {children}
    </PrincipalContext.Provider>
  );
}

export const usePrincipal = () => {
  const ctx = useContext(PrincipalContext);
  if (!ctx) throw new Error('usePrincipal must be used inside PrincipalProvider');
  return ctx;
};
