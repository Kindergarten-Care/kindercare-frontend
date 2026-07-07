'use client';

import React from 'react';
import { formatBillingMonth } from '@/utils/Billing/format';
import { InvoiceDomainModel } from '@/config/types/invoice';
import { formatVND } from '@/utils/Billing/format';
import { invoiceTitle, statusBadgeVariant, statusLabel } from '../../utils/invoiceStatus';
import { MergedInvoiceGroup } from '../../hooks/useBilling';
import * as S from './styles';

interface MonthGroupListProps {
  groups: MergedInvoiceGroup[];
  locale: string;
}

export const MonthGroupList: React.FC<MonthGroupListProps> = ({ groups, locale }) => (
  <S.MonthGroupList>
    {groups.map(group => (
      <S.MonthGroup key={group.billingMonth}>
        <S.MonthGroupTitle>{formatBillingMonth(group.billingMonth)}</S.MonthGroupTitle>
        <InvoiceCardRow
          primary={group.primary}
          breakdown={group.breakdown}
          locale={locale}
        />
      </S.MonthGroup>
    ))}
  </S.MonthGroupList>
);

interface InvoiceCardRowProps {
  primary: InvoiceDomainModel;
  breakdown: InvoiceDomainModel[];
  locale: string;
}

const InvoiceCardRow: React.FC<InvoiceCardRowProps> = ({ primary, breakdown, locale }) => {
  const hasBreakdown = breakdown.length > 1;
  const detailHref = `/${locale}/billing/${primary.invoiceId}`;

  return (
    <S.InvoiceStack>
      <S.InvoiceCard href={detailHref}>
        <S.InvIcon $type={primary.invoiceType}>
          {primary.invoiceType === 'TUITION' ? '🎓' : primary.invoiceType === 'EXTRACURRICULAR' ? '🎨' : '🍱'}
        </S.InvIcon>
        <S.InvBody>
          <S.InvTitle>
            Hóa đơn {formatBillingMonth(primary.billingMonth)}
            <S.Badge $variant={statusBadgeVariant(primary)}>{statusLabel(primary)}</S.Badge>
          </S.InvTitle>
          {primary.refundAmount > 0 && (
            <S.InvRefund>Hoàn tiền: -{formatVND(primary.refundAmount)}</S.InvRefund>
          )}
        </S.InvBody>
        <S.InvRight>
          <S.InvAmount>{formatVND(primary.totalAmount)}</S.InvAmount>
        </S.InvRight>
      </S.InvoiceCard>

      {hasBreakdown && (
        <S.BreakdownList>
          {breakdown.map(item => (
            <S.BreakdownItem key={item.invoiceId} href={`/${locale}/billing/${item.invoiceId}`}>
              <S.BreakdownLabel>{invoiceTitle(item)}</S.BreakdownLabel>
              <S.BreakdownAmount>{formatVND(item.totalAmount)}</S.BreakdownAmount>
            </S.BreakdownItem>
          ))}
        </S.BreakdownList>
      )}
    </S.InvoiceStack>
  );
};