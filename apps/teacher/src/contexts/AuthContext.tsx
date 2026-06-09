'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthUser {
  userId: number;
  username: string;
  roleId: number;
  roleName: string;
  fullName: string;
  relationship?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payloadBase64 = token.split('.')[1];
        const decodedJson = atob(payloadBase64);
        const payload = JSON.parse(decodedJson);
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
        localStorage.removeItem('token');
      }
    }
    setIsLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    window.location.href = 'http://localhost:3005/login'; // Redirect to portal login
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
