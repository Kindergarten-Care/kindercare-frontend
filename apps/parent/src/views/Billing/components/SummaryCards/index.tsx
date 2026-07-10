'use client';

import React from 'react';
import { IconCreditCard, IconAlert, IconReceipt } from '@/assets/icons/dashboard';
import { formatVND } from '@/utils/Billing/format';
import * as S from './styles';

interface BillingSummary {
  unpaidTotal: number;
  overdueCount: number;
  totalCount: number;
}

interface SummaryCardsProps {
  summary: BillingSummary;
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({ summary }) => (
  <S.SummaryGrid>
    <S.SummaryCard>
      <S.SummaryIcon>
        <IconCreditCard size={20} />
      </S.SummaryIcon>
      <div>
        <S.SummaryLabel>Tổng cần thanh toán</S.SummaryLabel>
        <S.SummaryValue>{formatVND(summary.unpaidTotal)}</S.SummaryValue>
      </div>
    </S.SummaryCard>
    <S.SummaryCard>
      <S.SummaryIcon $bg="#fee2e2" $fg="#dc2626">
        <IconAlert size={20} />
      </S.SummaryIcon>
      <div>
        <S.SummaryLabel>Hóa đơn quá hạn</S.SummaryLabel>
        <S.SummaryValue>{summary.overdueCount}</S.SummaryValue>
      </div>
    </S.SummaryCard>
    <S.SummaryCard>
      <S.SummaryIcon $bg="#e3edfd" $fg="#2563eb">
        <IconReceipt size={20} />
      </S.SummaryIcon>
      <div>
        <S.SummaryLabel>Tổng số hóa đơn</S.SummaryLabel>
        <S.SummaryValue>{summary.totalCount}</S.SummaryValue>
      </div>
    </S.SummaryCard>
  </S.SummaryGrid>
);