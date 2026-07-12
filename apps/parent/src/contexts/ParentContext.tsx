'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from '@kindercare/core';
import { ParentProfileDomainModel, UpdateParentProfileDto } from '@/config/types/parent';
import { parentService } from '@/services/Parent/ParentService';

interface ParentContextValue {
  parentProfile: ParentProfileDomainModel | null;
  loading: boolean;
  error: string | null;
  refreshProfile: () => Promise<void>;
  updateProfile: (dto: UpdateParentProfileDto) => Promise<ParentProfileDomainModel>;
}

const ParentContext = createContext<ParentContextValue | null>(null);

export function ParentProvider({ children }: { children: React.ReactNode }): React.ReactElement {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [parentProfile, setParentProfile] = useState<ParentProfileDomainModel | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await parentService.getProfile();
      setParentProfile(data);
    } catch (err: any) {
      console.error('Failed to fetch parent profile:', err);
      setError(err.message || 'Failed to load parent profile');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authLoading) return;

    if (isAuthenticated) {
      fetchProfile();
    } else {
      setParentProfile(null);
    }
  }, [isAuthenticated, authLoading, fetchProfile]);

  const updateProfile = useCallback(async (dto: UpdateParentProfileDto) => {
    const updated = await parentService.updateProfile(dto);
    setParentProfile(updated);
    return updated;
  }, []);

  const value: ParentContextValue = {
    parentProfile,
    loading,
    error,
    refreshProfile: fetchProfile,
    updateProfile,
  };

  return (
    <ParentContext.Provider value={value}>
      {children}
    </ParentContext.Provider>
  );
}

export function useParent(): ParentContextValue {
  const ctx = useContext(ParentContext);
  if (!ctx) {
    throw new Error('useParent must be used inside a ParentProvider');
  }
  return ctx;
}
