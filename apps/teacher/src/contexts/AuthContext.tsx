'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

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
    // 1. Kiểm tra token trên URL trước (từ Portal truyền sang)
    const urlParams = new URLSearchParams(window.location.search);
    const urlToken = urlParams.get('token');
    
    if (urlToken) {
      localStorage.setItem('token', urlToken);
      // Xoá token khỏi URL để bảo mật
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    }

    // 2. Lấy token từ localStorage (hoặc vừa lưu ở trên)
    const token = localStorage.getItem('token');
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
