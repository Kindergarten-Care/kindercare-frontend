'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import { Dropdown } from '@kindercare/ui';
import * as S from './styles';
import { useBilling, TypeFilter, StatusFilter, MonthFilter } from './hooks/useBilling';
import { formatBillingMonth } from '@/utils/Billing/format';
import { SummaryCards } from './components/SummaryCards';
import { MonthGroupList } from './components/MonthGroupList';

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

      <SummaryCards summary={summary} />

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
        <MonthGroupList groups={groupedInvoices} locale={locale} />
      )}
    </S.PageWrap>
  );
}