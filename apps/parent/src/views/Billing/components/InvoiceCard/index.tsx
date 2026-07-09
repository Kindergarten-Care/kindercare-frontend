'use client';

import React from 'react';
import { IconCreditCard, IconWave, IconReceipt } from '@/assets/icons/dashboard';
import { InvoiceDomainModel } from '@/config/types/invoice';
import { formatVND, getDueStatus } from '@/utils/Billing/format';
import { statusBadgeVariant, statusLabel, invoiceTitle } from '../../utils/invoiceStatus';
import * as S from './styles';

interface InvoiceCardProps {
  invoice: InvoiceDomainModel;
  locale: string;
}

export const InvoiceCardRow: React.FC<InvoiceCardProps> = ({ invoice, locale }) => {
  const due = getDueStatus(invoice.dueDate, invoice.paymentStatus);

  return (
    <S.InvoiceCard href={`/${locale}/billing/${invoice.invoiceId}`}>
      <S.InvIcon $type={invoice.invoiceType}>
        {invoice.invoiceType === 'TUITION' ? (
          <IconCreditCard size={20} />
        ) : invoice.invoiceType === 'EXTRACURRICULAR' ? (
          <IconWave size={20} />
        ) : (
          <IconReceipt size={20} />
        )}
      </S.InvIcon>
      <S.InvBody>
        <S.InvTitle>
          {invoiceTitle(invoice)}
          <S.Badge $variant={statusBadgeVariant(invoice)}>{statusLabel(invoice)}</S.Badge>
        </S.InvTitle>
        {invoice.refundAmount > 0 && (
          <S.InvRefund>Hoàn tiền ăn tháng trước: -{formatVND(invoice.refundAmount)}</S.InvRefund>
        )}
      </S.InvBody>
      <S.InvRight>
        <S.InvAmount>{formatVND(invoice.totalAmount)}</S.InvAmount>
        {due.label && (
          <S.DueBadge $variant={due.variant === 'none' ? 'ok' : due.variant}>{due.label}</S.DueBadge>
        )}
      </S.InvRight>
    </S.InvoiceCard>
  );
};