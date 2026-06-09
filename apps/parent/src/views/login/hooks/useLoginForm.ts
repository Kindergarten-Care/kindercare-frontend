import { useState, useCallback, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { useAuth, useAppRouter } from '@kindercare/core';
import axios from 'axios';

const LOGIN_ERRORS: Record<number, string> = {
  400: 'Thiếu thông tin đăng nhập.',
  401: 'Sai tên đăng nhập hoặc mật khẩu.',
  403: 'Tài khoản bị vô hiệu hóa. Vui lòng liên hệ nhà trường.',
};

export interface UseLoginFormReturn {
  locale: string;
  handleLocaleChange: (next: string) => void;
  identifier: string;
  setIdentifier: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  rememberMe: boolean;
  setRememberMe: React.Dispatch<React.SetStateAction<boolean>>;
  isSubmitting: boolean;
  isAuthChecking: boolean;
  error: string;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

export function useLoginForm(): UseLoginFormReturn {
  const locale   = useLocale();
  const router   = useRouter();
  const pathname = usePathname();
  const { login, isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const { go }  = useAppRouter({ locale });

  const [identifier,   setIdentifier]   = useState('');
  const [password,     setPassword]     = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe,   setRememberMe]   = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error,        setError]        = useState('');

  // Redirect if already authenticated
  useEffect(() => {
    if (!isAuthLoading && isAuthenticated) {
      go.parentDashboard();
    }
  }, [isAuthLoading, isAuthenticated, go]);

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
        await login({ identifier, password }, { rememberMe });
        go.parentDashboard();
      } catch (err) {
        if (axios.isAxiosError(err)) {
          const status = err.response?.status ?? 0;
          const apiMessage = err.response?.data?.message;
          if (apiMessage) {
             setError(apiMessage);
          } else {
             setError(LOGIN_ERRORS[status] ?? 'Đăng nhập thất bại. Vui lòng thử lại.');
          }
        } else {
          setError('Đã có lỗi xảy ra. Vui lòng thử lại.');
        }
      } finally {
        setIsSubmitting(false);
      }
    },
    [identifier, password, rememberMe, login, go],
  );

  return {
    locale,
    handleLocaleChange,
    identifier,
    setIdentifier,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    rememberMe,
    setRememberMe,
    isSubmitting,
    isAuthChecking: isAuthLoading || isAuthenticated,
    error,
    handleSubmit,
  };
}
