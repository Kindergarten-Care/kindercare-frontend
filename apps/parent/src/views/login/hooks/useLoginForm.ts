'use client';

import { useState, useCallback } from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { useAuth, useAppRouter } from '@kindercare/core';
import axios from 'axios';

type LoginTab = 'phone' | 'email';

const LOGIN_ERRORS: Record<number, string> = {
  400: 'Thiếu thông tin đăng nhập.',
  401: 'Sai tên đăng nhập hoặc mật khẩu.',
  403: 'Tài khoản bị vô hiệu hóa. Vui lòng liên hệ nhà trường.',
};

export function useLoginForm() {
  const locale   = useLocale();
  const router   = useRouter();
  const pathname = usePathname();
  const { login } = useAuth();
  const { go }  = useAppRouter({ locale });

  const [tab,          setTab]          = useState<LoginTab>('phone');
  const [phone,        setPhone]        = useState('');
  const [email,        setEmail]        = useState('');
  const [password,     setPassword]     = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe,   setRememberMe]   = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error,        setError]        = useState('');

  const handleLocaleChange = useCallback(
    (next: string) => {
      if (next !== locale) router.replace(pathname, { locale: next as 'vi' | 'en' });
    },
    [locale, pathname, router],
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      setError('');

      try {
        const identifier = tab === 'phone' ? phone : email;
        await login({ identifier, password }, { rememberMe });
        go.parentDashboard();
      } catch (err) {
        if (axios.isAxiosError(err)) {
          const status = err.response?.status ?? 0;
          setError(LOGIN_ERRORS[status] ?? 'Đăng nhập thất bại. Vui lòng thử lại.');
        } else {
          setError('Đã có lỗi xảy ra. Vui lòng thử lại.');
        }
      } finally {
        setIsSubmitting(false);
      }
    },
    [tab, phone, email, password, rememberMe, login, go],
  );

  return {
    // locale switcher
    locale,
    handleLocaleChange,
    // tab
    tab, setTab,
    // fields
    phone, setPhone,
    email, setEmail,
    password, setPassword,
    showPassword, setShowPassword,
    rememberMe, setRememberMe,
    // submission
    isSubmitting,
    error,
    handleSubmit,
  };
}
