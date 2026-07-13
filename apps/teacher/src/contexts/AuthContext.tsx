'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

import { usePathname, useRouter } from 'next/navigation';

export interface AuthUser {
  userId: number;
  username: string;
  roleId: number;
  roleName: string;
  fullName: string;
  relationship?: string;
  phone?: string;
  phoneNumber?: string;
  email?: string;
  address?: string;
  avatarUrl?: string;
  employeeId?: string;
  status?: string;
  professionalRank?: string;
  workStatus?: string;
  dateOfBirth?: string;
  gender?: string;
  idCard?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  logout: () => void;
  setUser: (user: AuthUser | null) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  logout: () => {},
  setUser: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = sessionStorage.getItem('teacher_token');
    
    if (token) {
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        );
        const payload = JSON.parse(jsonPayload);
        
        setUser({
          userId: payload.userId,
          username: payload.username,
          roleId: payload.roleId,
          roleName: payload.roleName,
          fullName: payload.fullName,
          relationship: payload.relationship,
        });
      } catch (error) {
        console.error('Failed to parse token', error);
        sessionStorage.removeItem('teacher_token');
        setUser(null);
      }
    } else {
      setUser(null);
    }
    setIsLoading(false);
  }, []);

  // Route Guard
  useEffect(() => {
    if (isLoading) return;
    
    const isLoginPage = pathname.endsWith('/login');
    const hasToken = !!sessionStorage.getItem('teacher_token');

    if (!hasToken && !isLoginPage) {
      router.replace('/login');
    } else if (hasToken && isLoginPage) {
      router.replace('/');
    }
  }, [isLoading, pathname, user, router]);

  const logout = () => {
    sessionStorage.removeItem('teacher_token');
    localStorage.removeItem('token'); // Clear old token just in case
    setUser(null);
    router.replace('/login');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
