'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import { Dropdown } from '@kindercare/ui';
import * as S from './styles';
import { useBilling, TypeFilter, StatusFilter, MonthFilter } from './hooks/useBilling';
import { formatVND, formatBillingMonth, getDueStatus } from '@/utils/Billing/format';
import { IconCreditCard, IconReceipt, IconAlert, IconWave } from '@/assets/icons/dashboard';
import { InvoiceDomainModel } from '@/config/types/invoice';

const TYPE_TABS: { key: TypeFilter; label: string }[] = [
  { key: 'ALL', label: 'Tất cả' },
  { key: 'TUITION', label: 'Học phí' },
  { key: 'MONTHLY', label: 'Hàng tháng' },
  { key: 'EXTRACURRICULAR', label: 'Ngoại khóa' },
];

const STATUS_TABS: { key: StatusFilter; label: string }[] = [
  { key: 'ALL', label: 'Mọi trạng thái' },
  { key: 'Unpaid', label: 'Chưa thanh toán' },
  { key: 'Paid', label: 'Đã thanh toán' },
];

/** An EXTRACURRICULAR invoice down to 0 means every item on it was cancelled (and refunded, when previously paid). */
function isCancelledToZero(inv: InvoiceDomainModel): boolean {
  return inv.invoiceType === 'EXTRACURRICULAR' && inv.totalAmount === 0;
}

function statusBadgeVariant(inv: InvoiceDomainModel): 'unpaid' | 'partial' | 'paid' | 'cancelled' {
  if (isCancelledToZero(inv)) return 'cancelled';
  if (inv.paymentStatus === 'Paid') return 'paid';
  if (inv.paymentStatus === 'Partial') return 'partial';
  return 'unpaid';
}

function statusLabel(inv: InvoiceDomainModel): string {
  if (isCancelledToZero(inv)) return inv.paymentStatus === 'Paid' ? 'Đã hủy & hoàn tiền' : 'Đã hủy';
  if (inv.paymentStatus === 'Paid') return 'Đã thanh toán';
  if (inv.paymentStatus === 'Partial') return 'Thanh toán 1 phần';
  return 'Chưa thanh toán';
}

function InvoiceRow({ inv, locale }: { inv: InvoiceDomainModel; locale: string }) {
  const due = getDueStatus(inv.dueDate, inv.paymentStatus);
  return (
    <S.InvoiceCard href={`/${locale}/billing/${inv.invoiceId}`}>
      <S.InvIcon $type={inv.invoiceType}>
        {inv.invoiceType === 'TUITION' ? (
          <IconCreditCard size={20} />
        ) : inv.invoiceType === 'EXTRACURRICULAR' ? (
          <IconWave size={20} />
        ) : (
          <IconReceipt size={20} />
        )}
      </S.InvIcon>
      <S.InvBody>
        <S.InvTitle>
          {inv.invoiceType === 'TUITION'
            ? `Học phí ${inv.periodRange ?? formatBillingMonth(inv.billingMonth)}`
            : inv.invoiceType === 'EXTRACURRICULAR'
            ? `Ngoại khóa ${formatBillingMonth(inv.billingMonth)}`
            : `Hóa đơn tiền ăn ${formatBillingMonth(inv.billingMonth)}`}
          <S.Badge $variant={statusBadgeVariant(inv)}>{statusLabel(inv)}</S.Badge>
        </S.InvTitle>
        {inv.refundAmount > 0 && (
          <S.InvRefund>Hoàn tiền ăn tháng trước: -{formatVND(inv.refundAmount)}</S.InvRefund>
        )}
      </S.InvBody>
      <S.InvRight>
        <S.InvAmount>{formatVND(inv.totalAmount)}</S.InvAmount>
        {due.label && <S.DueBadge $variant={due.variant === 'none' ? 'ok' : due.variant}>{due.label}</S.DueBadge>}
      </S.InvRight>
    </S.InvoiceCard>
  );
}

export function Billing() {
  const locale = useLocale();
  const {
    loading,
    error,
    activeStudent,
    groupedInvoices,
    hasAnyInvoices,
    availableMonths,
    summary,
    typeFilter,
    setTypeFilter,
    statusFilter,
    setStatusFilter,
    monthFilter,
    setMonthFilter,
  } = useBilling();

  return (
    <S.PageWrap>
      <S.PageHeader>
        <div>
          <S.PageTitle>Học phí &amp; Lệ phí</S.PageTitle>
          <S.PageSub>
            {activeStudent ? `Hóa đơn của ${activeStudent.fullName}` : 'Danh sách hóa đơn'}
          </S.PageSub>
        </div>
      </S.PageHeader>

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

      <S.FilterRow>
        <S.FilterDropdownWrap>
          <S.FilterLabel>Loại phí</S.FilterLabel>
          <Dropdown
            value={typeFilter}
            onChange={value => setTypeFilter(value as TypeFilter)}
            options={TYPE_TABS.map(tab => ({ value: tab.key, label: tab.label }))}
            fullWidth
          />
        </S.FilterDropdownWrap>
        <S.FilterDropdownWrap>
          <S.FilterLabel>Trạng thái</S.FilterLabel>
          <Dropdown
            value={statusFilter}
            onChange={value => setStatusFilter(value as StatusFilter)}
            options={STATUS_TABS.map(tab => ({ value: tab.key, label: tab.label }))}
            fullWidth
          />
        </S.FilterDropdownWrap>
        <S.FilterDropdownWrap>
          <S.FilterLabel>Thời gian</S.FilterLabel>
          <Dropdown
            value={monthFilter}
            onChange={value => setMonthFilter(value as MonthFilter)}
            options={[
              { value: 'ALL', label: 'Mọi tháng' },
              ...availableMonths.map(month => ({ value: month, label: formatBillingMonth(month) })),
            ]}
            fullWidth
          />
        </S.FilterDropdownWrap>
      </S.FilterRow>

      {loading ? (
        <S.LoadingState>Đang tải danh sách hóa đơn...</S.LoadingState>
      ) : error ? (
        <S.EmptyState>{error}</S.EmptyState>
      ) : groupedInvoices.length === 0 ? (
        <S.EmptyState>
          {hasAnyInvoices
            ? 'Không có hóa đơn nào phù hợp bộ lọc hiện tại.'
            : 'Hiện tại chưa có lịch sử hóa đơn.'}
        </S.EmptyState>
      ) : (
        <S.MonthGroupList>
          {groupedInvoices.map(group => (
            <S.MonthGroup key={group.billingMonth}>
              <S.MonthGroupTitle>{formatBillingMonth(group.billingMonth)}</S.MonthGroupTitle>
              <S.InvoiceList>
                {group.invoices.map(inv => (
                  <InvoiceRow key={inv.invoiceId} inv={inv} locale={locale} />
                ))}
              </S.InvoiceList>
            </S.MonthGroup>
          ))}
        </S.MonthGroupList>
      )}
    </S.PageWrap>
  );
}
