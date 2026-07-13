import { useState, useEffect } from 'react';
import { AccountDomainModel } from '@/config/types/account';
import { accountService } from '@/services/account/AccountService';

export const useAccountList = (role: string | null, isAuthenticated: boolean, authLoading: boolean) => {
  const [accounts, setAccounts] = useState<AccountDomainModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchAccounts = (isMounted: boolean = true) => {
    setLoading(true);
    setError('');
    accountService.getAccountsByRole(role as 'teacher' | 'parent')
      .then(data => {
        if (isMounted) setAccounts(data);
      })
      .catch((err: any) => {
        if (isMounted) setError(err.message || 'Lỗi khi tải danh sách');
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
  };

  useEffect(() => {
    if (authLoading || !isAuthenticated) return;
    if (role !== 'teacher' && role !== 'parent') {
      setError('Vai trò không hợp lệ');
      return;
    }

    let isMounted = true;
    fetchAccounts(isMounted);

    return () => { isMounted = false; };
  }, [role, isAuthenticated, authLoading]);

  return { accounts, loading, error, fetchAccounts };
};
