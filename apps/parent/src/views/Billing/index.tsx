'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import * as S from './styles';
import { useBilling, TypeFilter, StatusFilter } from './hooks/useBilling';
import { formatVND, formatBillingMonth, getDueStatus } from '@/utils/Billing/format';
import { IconCreditCard, IconReceipt, IconAlert } from '@/assets/icons/dashboard';

const TYPE_TABS: { key: TypeFilter; label: string }[] = [
  { key: 'ALL', label: 'Tất cả' },
  { key: 'TUITION', label: 'Học phí' },
  { key: 'MONTHLY', label: 'Hàng tháng' },
];

const STATUS_TABS: { key: StatusFilter; label: string }[] = [
  { key: 'ALL', label: 'Mọi trạng thái' },
  { key: 'Unpaid', label: 'Chưa thanh toán' },
  { key: 'Partial', label: 'Đã thanh toán 1 phần' },
  { key: 'Paid', label: 'Đã thanh toán' },
];

function statusBadgeVariant(status: string): 'unpaid' | 'partial' | 'paid' {
  if (status === 'Paid') return 'paid';
  if (status === 'Partial') return 'partial';
  return 'unpaid';
}

function statusLabel(status: string): string {
  if (status === 'Paid') return 'Đã thanh toán';
  if (status === 'Partial') return 'Thanh toán 1 phần';
  return 'Chưa thanh toán';
}

export function Billing() {
  const locale = useLocale();
  const {
    loading,
    error,
    activeStudent,
    invoices,
    summary,
    typeFilter,
    setTypeFilter,
    statusFilter,
    setStatusFilter,
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
        {TYPE_TABS.map(tab => (
          <S.FilterBtn key={tab.key} $active={typeFilter === tab.key} onClick={() => setTypeFilter(tab.key)}>
            {tab.label}
          </S.FilterBtn>
        ))}
        <span style={{ width: 1, height: 20, background: '#e6eee9', margin: '0 4px' }} />
        {STATUS_TABS.map(tab => (
          <S.FilterBtn key={tab.key} $active={statusFilter === tab.key} onClick={() => setStatusFilter(tab.key)}>
            {tab.label}
          </S.FilterBtn>
        ))}
      </S.FilterRow>

      {loading ? (
        <S.LoadingState>Đang tải danh sách hóa đơn...</S.LoadingState>
      ) : error ? (
        <S.EmptyState>{error}</S.EmptyState>
      ) : invoices.length === 0 ? (
        <S.EmptyState>Không có hóa đơn nào phù hợp bộ lọc hiện tại.</S.EmptyState>
      ) : (
        <S.InvoiceList>
          {invoices.map(inv => {
            const due = getDueStatus(inv.dueDate, inv.paymentStatus);
            return (
              <S.InvoiceCard key={inv.invoiceId} href={`/${locale}/billing/${inv.invoiceId}`}>
                <S.InvIcon $type={inv.invoiceType}>
                  {inv.invoiceType === 'TUITION' ? <IconCreditCard size={20} /> : <IconReceipt size={20} />}
                </S.InvIcon>
                <S.InvBody>
                  <S.InvTitle>
                    {inv.invoiceType === 'TUITION'
                      ? `Học phí ${inv.periodRange ?? formatBillingMonth(inv.billingMonth)}`
                      : `Hóa đơn ${formatBillingMonth(inv.billingMonth)}`}
                    <S.Badge $variant={statusBadgeVariant(inv.paymentStatus)}>{statusLabel(inv.paymentStatus)}</S.Badge>
                  </S.InvTitle>
                  <S.InvMeta>Ngày tạo: {formatBillingMonth(inv.billingMonth)}</S.InvMeta>
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
          })}
        </S.InvoiceList>
      )}
    </S.PageWrap>
  );
}
