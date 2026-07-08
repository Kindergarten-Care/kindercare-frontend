import React from 'react';
import { AccountDomainModel } from '@/config/types/account';
import {
  ModalOverlay,
  ModalContent,
  ModalTitle,
  ModalDescription,
  ModalActions,
  CancelButton,
  ConfirmButton
} from './ConfirmationModal.styles';

interface ConfirmationModalProps {
  isOpen: boolean;
  action: 'lock' | 'unlock' | null;
  account: AccountDomainModel | null;
  role: string | null;
  onClose: () => void;
  onConfirm: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  action,
  account,
  role,
  onClose,
  onConfirm,
}) => {
  if (!isOpen || !account || !action) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <ModalTitle>
          {action === 'lock' ? 'Xác nhận khóa tài khoản' : 'Xác nhận mở khóa tài khoản'}
        </ModalTitle>
        <ModalDescription>
          Bạn có chắc chắn muốn {action === 'lock' ? 'khóa' : 'mở khóa'} tài khoản của 
          <strong> {role === 'parent' ? 'Phụ huynh' : role === 'teacher' ? 'Giáo viên' : 'Nhân viên'} {account.fullName} </strong> 
          không?
        </ModalDescription>
        <ModalActions>
          <CancelButton onClick={onClose}>
            Hủy
          </CancelButton>
          <ConfirmButton $danger={action === 'lock'} onClick={onConfirm}>
            {action === 'lock' ? 'Khóa tài khoản' : 'Mở khóa tài khoản'}
          </ConfirmButton>
        </ModalActions>
      </ModalContent>
    </ModalOverlay>
  );
};
