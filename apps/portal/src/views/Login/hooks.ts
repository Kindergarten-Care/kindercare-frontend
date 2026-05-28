'use client';

import { useState } from 'react';

export type UserRole = 'admin' | 'principal' | 'teacher';

export interface UseLoginStateReturn {
  role: UserRole;
  username: string;
  password:  string;
  rememberMe: boolean;
  errors: { username?: string; password?: string };
  handleRoleChange: (role: UserRole) => void;
  handleUsernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRememberMeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export const useLoginState = (): UseLoginStateReturn => {
  const [role, setRole] = useState<UserRole>('admin');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});

  const handleRoleChange = (selectedRole: UserRole) => {
    setRole(selectedRole);
    // Clear errors when changing roles
    setErrors({});
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    if (errors.username) {
      setErrors(prev => ({ ...prev, username: undefined }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (errors.password) {
      setErrors(prev => ({ ...prev, password: undefined }));
    }
  };

  const handleRememberMeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(e.target.checked);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { username?: string; password?: string } = {};
    if (!username.trim()) {
      newErrors.username = 'Vui lòng nhập tên đăng nhập / mã nhân viên.';
    }
    if (!password) {
      newErrors.password = 'Vui lòng nhập mật khẩu.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Perform redirect based on role
    if (role === 'admin') {
      window.location.href = '/admin';
    } else if (role === 'principal') {
      window.location.href = '/principal';
    } else if (role === 'teacher') {
      window.location.href = '/teacher';
    }
  };

  return {
    role,
    username,
    password,
    rememberMe,
    errors,
    handleRoleChange,
    handleUsernameChange,
    handlePasswordChange,
    handleRememberMeChange,
    handleSubmit,
  };
};
