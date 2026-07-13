import { useState } from 'react';
import { AccountDomainModel } from '@/config/types/account';
import { accountService } from '@/services/account/AccountService';
import { kcToast } from '@kindercare/ui';

export const useAccountModal = (fetchAccounts: (isMounted?: boolean) => void) => {
  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    action: 'lock' | 'unlock' | null;
    account: AccountDomainModel | null;
  }>({
    isOpen: false,
    action: null,
    account: null,
  });

  const handleActionClick = (account: AccountDomainModel, action: 'lock' | 'unlock') => {
    setModalConfig({ isOpen: true, action, account });
  };

  const closeModal = () => {
    setModalConfig({ isOpen: false, action: null, account: null });
  };

  const confirmModalAction = async () => {
    if (!modalConfig.account || !modalConfig.action) return;
    const { id, fullName } = modalConfig.account;
    const { action } = modalConfig;
    
    try {
      if (action === 'lock') {
        await accountService.lockAccount(id);
        kcToast.success(`Đã khóa tài khoản ${fullName} thành công!`);
      } else {
        await accountService.unlockAccount(id);
        kcToast.success(`Đã mở khóa tài khoản ${fullName} thành công!`);
      }
      closeModal();
      fetchAccounts(true);
    } catch (error: any) {
      kcToast.error(error.message || 'Có lỗi xảy ra, vui lòng thử lại.');
    }
  };

  return {
    modalConfig,
    handleActionClick,
    closeModal,
    confirmModalAction,
  };
};
