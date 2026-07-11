import React from 'react';
import { AccountDomainModel } from '@/config/types/account';
import {
  Modal,
  ModalHeader,
  ModalBody,
  KmCallout,
  KmFoot,
  KmBtn,
  LockIcon,
} from '@/components/Modal';

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

  const isLock = action === 'lock';
  const roleLabel = role === 'parent' ? 'Phụ huynh' : role === 'teacher' ? 'Giáo viên' : 'Nhân viên';

  return (
    <Modal size="sm" onClose={isLock ? undefined : onClose} closeOnOverlayClick={!isLock}>
      <ModalHeader
        icon={<LockIcon />}
        iconVariant={isLock ? 'red' : 'amber'}
        title={isLock ? 'Xác nhận khóa tài khoản' : 'Xác nhận mở khóa tài khoản'}
        onClose={isLock ? undefined : onClose}
      />
      <ModalBody>
        <KmCallout $variant={isLock ? 'red' : 'amber'}>
          <span>
            Bạn có chắc chắn muốn {isLock ? 'khóa' : 'mở khóa'} tài khoản của{' '}
            <b>{roleLabel} {account.fullName}</b> không?
          </span>
        </KmCallout>
      </ModalBody>
      <KmFoot $tight={isLock}>
        <KmBtn $variant="ghost" onClick={onClose}>
          Hủy
        </KmBtn>
        <KmBtn $variant={isLock ? 'danger' : 'brand'} onClick={onConfirm}>
          {isLock ? 'Khóa tài khoản' : 'Mở khóa tài khoản'}
        </KmBtn>
      </KmFoot>
    </Modal>
  );
};
