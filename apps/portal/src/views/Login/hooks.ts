'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export type UserRole = 'admin' | 'principal' | 'teacher';

export interface UseLoginStateReturn {
  role: UserRole;
  username: string;
  password: string;
  rememberMe: boolean;
  errors: { username?: string; password?: string };
  isSubmitting: boolean;
  handleRoleChange: (role: UserRole) => void;
  handleUsernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRememberMeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export const useLoginState = (): UseLoginStateReturn => {
  const router = useRouter();
  const [role, setRole] = useState<UserRole>('admin');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRoleChange = (selectedRole: UserRole): void => {
    setRole(selectedRole);
    setErrors({});
    setUsername('');
    setPassword('');
  };

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

  const handleSubmit = (e: React.FormEvent): void => {
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

    setIsSubmitting(true);

    // Redirect based on role using Next.js router
    const roleRoutes: Record<UserRole, string> = {
      admin: '/admin',
      principal: '/principal',
      teacher: '/teacher',
    };

    router.push(roleRoutes[role]);
  };

  return {
    role,
    username,
    password,
    rememberMe,
    errors,
    isSubmitting,
    handleRoleChange,
    handleUsernameChange,
    handlePasswordChange,
    handleRememberMeChange,
    handleSubmit,
  };
};
