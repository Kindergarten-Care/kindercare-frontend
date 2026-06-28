'use client';

import React from 'react';
import * as S from './styles';
import { IconMedicine, IconCreditCard, IconDiary, IconProfile } from '@/assets/icons/dashboard';

interface QuickActionsStripProps {
  onAbsence?: () => void;
  onMedication?: () => void;
  onFee?: () => void;
  onDiary?: () => void;
  onPickup?: () => void;
}

const ACTIONS = [
  { id: 'medication', label: 'Dặn dò thuốc',  Icon: IconMedicine,    bg: '#fef3c7', color: '#d97706' },
  { id: 'fee',        label: 'Học phí',       Icon: IconCreditCard,  bg: '#dbeafe', color: '#2563eb', badge: '!' },
  { id: 'diary',      label: 'Nhật ký',       Icon: IconDiary,       bg: '#f3e8ff', color: '#7c3aed' },
  { id: 'pickup',     label: 'Đăng ký đón hộ', Icon: IconProfile,     bg: '#e2f8f0', color: '#0f766e' },
];

const QuickActionsStrip: React.FC<QuickActionsStripProps> = ({
  onAbsence,
  onMedication,
  onFee,
  onDiary,
  onPickup,
}) => {
  const handlers: Record<string, (() => void) | undefined> = {
    absence: onAbsence,
    medication: onMedication,
    fee: onFee,
    diary: onDiary,
    pickup: onPickup,
  };

  return (
    <S.Bar>
      {ACTIONS.map(({ id, label, Icon, bg, color, badge }) => (
        <S.Btn key={id} onClick={handlers[id]}>
          <S.BtnIco $bg={bg} $color={color}>
            <Icon size={16} color={color} />
          </S.BtnIco>
          <S.BtnLabel>{label}</S.BtnLabel>
          {badge && <S.BtnBadge>{badge}</S.BtnBadge>}
        </S.Btn>
      ))}
    </S.Bar>
  );
};

export default QuickActionsStrip;
