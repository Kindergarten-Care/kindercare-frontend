'use client';

import { useState } from 'react';
import { apiClient, setSession } from '@kindercare/core';

export type UserRole = 'teacher';

export interface UseLoginStateReturn {
  username: string;
  password: string;
  rememberMe: boolean;
  errors: { username?: string; password?: string };
  isSubmitting: boolean;
  handleUsernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRememberMeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export const useLoginState = (): UseLoginStateReturn => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUsername(e.target.value);
    if (errors.username) {
      setErrors(prev => ({ ...prev, username: undefined }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
    if (errors.password) {
      setErrors(prev => ({ ...prev, password: undefined }));
    }
  };

  const handleRememberMeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setRememberMe(e.target.checked);
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    const newErrors: { username?: string; password?: string } = {};
    if (!username.trim()) {
      newErrors.username = 'Vui lòng nhập email hoặc số điện thoại.';
    }
    if (!password) {
      newErrors.password = 'Vui lòng nhập mật khẩu.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Gọi trực tiếp API URL (proxy rewrite không hoạt động trong standalone mode)
      const baseApiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://web-test.kindercare.app/api/v1';
      const apiUrl = `${baseApiUrl}/auth/teacher/login`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ identifier: username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors({ username: data.message || 'Đăng nhập thất bại. Vui lòng thử lại.' });
        setIsSubmitting(false);
        return;
      }

      const token = data.data.token;

      // Save session in sessionStorage (expires in 30 minutes, or longer if rememberMe is checked, e.g. 3 days)
      const expireMinutes = rememberMe ? 3 * 24 * 60 : 30;
      setSession(token, 'teacher', expireMinutes);

      // Redirect to teacher app (chỉ còn role teacher sau khi bỏ principal)
      const nextUrl = `${process.env.NEXT_PUBLIC_TEACHER_APP_URL || 'http://localhost:3001'}/teacher`;
      const redirectUrl = nextUrl.startsWith('http')
        ? new URL(nextUrl)
        : new URL(nextUrl, typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3005');

      redirectUrl.searchParams.set('token', token);

      window.location.href = redirectUrl.toString();
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ username: 'Lỗi kết nối đến máy chủ.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    username,
    password,
    rememberMe,
    errors,
    isSubmitting,
    handleUsernameChange,
    handlePasswordChange,
    handleRememberMeChange,
    handleSubmit,
  };
};