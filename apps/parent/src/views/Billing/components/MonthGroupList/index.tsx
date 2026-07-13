'use client';

import React from 'react';
import { formatBillingMonth } from '@/utils/Billing/format';
import { InvoiceDomainModel } from '@/config/types/invoice';
import { formatVND } from '@/utils/Billing/format';
import { invoiceTitle, statusBadgeVariant, statusLabel } from '../../utils/invoiceStatus';
import { InvoiceMonthGroup } from '../../hooks/useBilling';
import * as S from './styles';

interface MonthGroupListProps {
  groups: InvoiceMonthGroup[];
  locale: string;
}

export const MonthGroupList: React.FC<MonthGroupListProps> = ({ groups, locale }) => (
  <S.MonthGroupList>
    {groups.map(group => (
      <S.MonthGroup key={group.billingMonth}>
        <S.MonthGroupTitle>{formatBillingMonth(group.billingMonth)}</S.MonthGroupTitle>
        <S.InvoiceList>
          {group.invoices.map(invoice => (
            <InvoiceCard key={invoice.invoiceId} invoice={invoice} locale={locale} />
          ))}
        </S.InvoiceList>
      </S.MonthGroup>
    ))}
  </S.MonthGroupList>
);

interface InvoiceCardProps {
  invoice: InvoiceDomainModel;
  locale: string;
}

const InvoiceCard: React.FC<InvoiceCardProps> = ({ invoice, locale }) => (
  <S.InvoiceCard href={`/${locale}/billing/${invoice.invoiceId}`}>
    <S.InvIcon $type={invoice.invoiceType}>
      {invoice.invoiceType === 'TUITION' ? '🎓' : invoice.invoiceType === 'EXTRACURRICULAR' ? '🎨' : '🍱'}
    </S.InvIcon>
    <S.InvBody>
      <S.InvTitle>
        {invoiceTitle(invoice)}
        <S.Badge $variant={statusBadgeVariant(invoice)}>{statusLabel(invoice)}</S.Badge>
      </S.InvTitle>
      {invoice.refundAmount > 0 && (
        <S.InvRefund>Hoàn tiền: -{formatVND(invoice.refundAmount)}</S.InvRefund>
      )}
    </S.InvBody>
    <S.InvRight>
      <S.InvAmount>{formatVND(invoice.totalAmount)}</S.InvAmount>
    </S.InvRight>
  </S.InvoiceCard>
);
