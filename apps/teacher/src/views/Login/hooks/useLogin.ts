import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'react-toastify';

function decodeJwtPayload(token: string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(
    decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )
  );
}

export function useLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const router = useRouter();
  const { setUser } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      setErrorMsg('Vui lòng nhập đầy đủ email và mật khẩu.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const response = await authService.login(username, password);
      const token = response?.token || response?.data?.token;

      if (!token) {
        throw new Error('Không nhận được token hợp lệ từ server.');
      }

      sessionStorage.setItem('teacher_token', token);

      const payload = decodeJwtPayload(token);

      setUser({
        userId: payload.userId,
        username: payload.username,
        roleId: payload.roleId,
        roleName: payload.roleName,
        fullName: payload.fullName,
      });

      toast.success('Đăng nhập thành công! Đang mở bảng điều khiển...');
      router.push('/dashboard');
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err?.response?.data?.message || err.message || 'Sai thông tin đăng nhập.');
    } finally {
      setLoading(false);
    }
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    remember,
    setRemember,
    loading,
    errorMsg,
    setErrorMsg,
    handleLogin,
  };
}
