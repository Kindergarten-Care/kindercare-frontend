import React from 'react';
import * as S from '../styles';
import { IconMedicine, IconRequest } from '@/assets/icons/dashboard';

interface SelectRequestTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLeave: () => void;
  onSelectMedication: () => void;
}

export const SelectRequestTypeModal: React.FC<SelectRequestTypeModalProps> = ({
  isOpen,
  onClose,
  onSelectLeave,
  onSelectMedication,
}) => {
  if (!isOpen) return null;

  return (
    <S.ModalOverlay onClick={onClose}>
      <S.ModalContent onClick={e => e.stopPropagation()}>
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
        </S.SelectionGrid>
      </S.ModalContent>
    </S.ModalOverlay>
  );
};
