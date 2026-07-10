import React from 'react';
import { ResponsiveModal } from '@kindercare/ui';
import * as S from './styles';

interface ConfirmCancelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ConfirmCancelModal: React.FC<ConfirmCancelModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  return (
    <ResponsiveModal isOpen={isOpen} onClose={onClose} maxWidth="400px">
      <div style={{ padding: 28 }}>
        <S.ModalHeader>
          <S.ModalTitle>Hủy yêu cầu</S.ModalTitle>
          <S.CloseBtn onClick={onClose}>✕</S.CloseBtn>
        </S.ModalHeader>
        <div style={{ fontSize: '14.5px', color: '#4b5563', marginBottom: '24px', lineHeight: '1.5', fontWeight: 500 }}>
          Bạn có chắc chắn muốn hủy đơn này không? Hành động này không thể hoàn tác.
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <S.BtnBackToList onClick={onClose} style={{ flex: 1, margin: 0 }}>
            Quay lại
          </S.BtnBackToList>
          <S.BtnCancelDetail onClick={onConfirm} style={{ flex: 1, margin: 0 }}>
            ✕ Xác nhận hủy
          </S.BtnCancelDetail>
        </div>
      </div>
    </ResponsiveModal>
  );
};
