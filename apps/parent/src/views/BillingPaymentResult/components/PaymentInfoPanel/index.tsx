'use client';

import React from 'react';
import { InvoiceDetailDomainModel } from '@/config/types/invoice';
import { formatUnixDateTime } from '@/utils/Billing/format';
import { invoiceTitle } from '../../utils/invoiceTitle';
import * as S from './styles';

interface PaymentInfoPanelProps {
  invoice: InvoiceDetailDomainModel;
}

export const PaymentInfoPanel: React.FC<PaymentInfoPanelProps> = ({ invoice }) => {
  const lastTx = invoice.transactions[0];
  return (
    <S.InfoPanel>
      <S.InfoRow>
        <S.InfoLabel>Hóa đơn</S.InfoLabel>
        <S.InfoValue>{invoiceTitle(invoice)}</S.InfoValue>
      </S.InfoRow>
      {lastTx?.transactionCode && (
        <S.InfoRow>
          <S.InfoLabel>Mã giao dịch</S.InfoLabel>
          <S.InfoValue>{lastTx.transactionCode}</S.InfoValue>
        </S.InfoRow>
      )}
      {lastTx && (
        <S.InfoRow>
          <S.InfoLabel>Thời gian thanh toán</S.InfoLabel>
          <S.InfoValue>{formatUnixDateTime(lastTx.transactionDate)}</S.InfoValue>
        </S.InfoRow>
      )}
    </S.InfoPanel>
  );
};