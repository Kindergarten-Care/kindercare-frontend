'use client';

import { useState } from 'react';

export interface UseForgotPasswordStateReturn {
  email: string;
  error?: string;
  isLoading: boolean;
  isSubmitted: boolean;
  handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  resetForm: () => void;
}

export const useForgotPasswordState = (): UseForgotPasswordStateReturn => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) {
      setError(undefined);
    }
  };

  const resetForm = () => {
    setEmail('');
    setError(undefined);
    setIsLoading(false);
    setIsSubmitted(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setError('Vui lòng nhập email đã đăng ký hệ thống.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError('Định dạng email không hợp lệ (ví dụ: admin@kindercare.edu.vn).');
      return;
    }

    setIsLoading(true);

    // Simulate API request to recover password
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1200);
  };

  return {
    email,
    error,
    isLoading,
    isSubmitted,
    handleEmailChange,
    handleSubmit,
    resetForm,
  };
};
