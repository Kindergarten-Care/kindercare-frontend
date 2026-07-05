import React from 'react';
import { ResponsiveModal } from '@kindercare/ui';
import * as S from '../styles';
import { IconMedicine, IconRequest, IconProfile } from '@/assets/icons/dashboard';

interface SelectRequestTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLeave: () => void;
  onSelectMedication: () => void;
  onSelectProxy: () => void;
}

export const SelectRequestTypeModal: React.FC<SelectRequestTypeModalProps> = ({
  isOpen,
  onClose,
  onSelectLeave,
  onSelectMedication,
  onSelectProxy,
}) => {
  return (
    <ResponsiveModal isOpen={isOpen} onClose={onClose} maxWidth="560px">
      <div style={{ padding: 28 }}>
        <S.ModalHeader>
          <S.ModalTitle>Tạo yêu cầu mới</S.ModalTitle>
          <S.CloseBtn onClick={onClose}>✕</S.CloseBtn>
        </S.ModalHeader>
        <S.SelectionGrid>
          <S.SelectionCard onClick={onSelectLeave}>
            <S.CardIconCircle $bg="#eff6ff" $color="#2563eb">
              <IconRequest size={24} />
            </S.CardIconCircle>
            <S.SelectionCardTitle>Báo nghỉ học</S.SelectionCardTitle>
            <S.SelectionCardSub>Xin nghỉ phép cho bé gửi đến giáo viên lớp</S.SelectionCardSub>
          </S.SelectionCard>

          <S.SelectionCard onClick={onSelectMedication}>
            <S.CardIconCircle $bg="#fff7ed" $color="#ea580c">
              <IconMedicine size={24} />
            </S.CardIconCircle>
            <S.SelectionCardTitle>Dặn dò thuốc</S.SelectionCardTitle>
            <S.SelectionCardSub>Gửi lịch và hướng dẫn uống thuốc cho bé</S.SelectionCardSub>
          </S.SelectionCard>

          <S.SelectionCard onClick={onSelectProxy}>
            <S.CardIconCircle $bg="#e2f8f0" $color="#0f766e">
              <IconProfile size={24} />
            </S.CardIconCircle>
            <S.SelectionCardTitle>Đăng ký ủy quyền đưa đón hộ</S.SelectionCardTitle>
            <S.SelectionCardSub>Ủy quyền cho người thân đón hoặc đưa bé</S.SelectionCardSub>
          </S.SelectionCard>
        </S.SelectionGrid>
      </div>
    </ResponsiveModal>
  );
};
