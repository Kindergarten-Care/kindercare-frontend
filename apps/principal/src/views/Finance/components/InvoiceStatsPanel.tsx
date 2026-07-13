'use client';

import React, { useState } from 'react';
import { Dropdown, kcToast } from '@kindercare/ui';
import { financeService } from '@/services/Principal/FinanceService';
import { useInvoiceStats } from '../hooks/useInvoiceStats';
import RevenueStatusDonutChart from './RevenueStatusDonutChart';
import RevenueByMonthChart from './RevenueByMonthChart';
import PublishBadge from './PublishBadge';
import InvoiceDetailModal from './InvoiceDetailModal';
import {
  TableCard, TableScroll, Table, Th, Tr, Td, StatusBadge, TypeBadge,
  FilterBar, SearchInput, LoadingText, ErrorText,
  PaginationContainer, PaginationText, PaginationGroup, PageButton,
} from '../styles';
import {
  StatsLayout, SideColumn, MainColumn, KPIGrid2, KPICardSm, KPIIconBadge, KPIValueSm, KPILabelSm,
  ListCard, ListHeaderRow, ListTitleIcon, ListTitle, DetailButton,
} from './InvoiceStatsPanel.styles';

const formatVND = (n: number) => `${new Intl.NumberFormat('vi-VN').format(n)} đ`;

const formatDate = (timestamp: number | null, invoiceType?: string) => {
  if (!timestamp) return invoiceType?.toUpperCase() === 'EXTRACURRICULAR' ? 'Chưa cập nhật' : 'Chưa công khai';
  return new Date(timestamp * 1000).toLocaleDateString('vi-VN');
};

function statusVariant(status: string): 'paid' | 'unpaid' | 'overdue' | 'other' {
  const s = status?.toLowerCase();
  if (s === 'paid') return 'paid';
  if (s === 'overdue') return 'overdue';
  if (s === 'unpaid') return 'unpaid';
  return 'other';
}

function statusLabel(status: string): string {
  const s = status?.toLowerCase();
  if (s === 'paid') return 'Đã thanh toán';
  if (s === 'overdue') return 'Quá hạn';
  if (s === 'unpaid') return 'Chưa thanh toán';
  return status;
}

function typeVariant(type: string): 'monthly' | 'extracurricular' | 'other' {
  const t = type?.toUpperCase();
  if (t === 'MONTHLY' || t === 'TUITION') return 'monthly';
  if (t === 'EXTRACURRICULAR') return 'extracurricular';
  return 'other';
}

function typeLabel(type: string): string {
  const t = type?.toUpperCase();
  if (t === 'TUITION') return 'Học phí';
  if (t === 'MONTHLY') return 'Tiền ăn';
  if (t === 'EXTRACURRICULAR') return 'Ngoại khóa';
  return type;
}

function InvoiceIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6M9 13h6M9 17h6M9 9h1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v4M12 16h.01" />
    </svg>
  );
}

function StackIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 6h16M4 6v13a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V6M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  );
}

export default function InvoiceStatsPanel() {
  const {
    invoices, loading, error, refetch,
    searchTerm, setSearchTerm, statusFilter, setStatusFilter, typeFilter, setTypeFilter,
    invoiceStatuses, invoiceTypes, filteredInvoices, currentData,
    currentPage, setCurrentPage, totalPages, startIndex, itemsPerPage,
    kpis,
  } = useInvoiceStats();

  const [detailInvoiceId, setDetailInvoiceId] = useState<number | null>(null);

  const handlePublish = async (invoiceId: number) => {
    try {
      await financeService.publishInvoice(invoiceId);
      kcToast.success('Công khai hóa đơn thành công');
      await refetch();
    } catch (err: any) {
      kcToast.error(err.message || 'Có lỗi xảy ra khi công khai hóa đơn');
      throw err;
    }
  };

  if (loading) return <LoadingText>Đang tải dữ liệu...</LoadingText>;
  if (error) return <ErrorText>{error}</ErrorText>;

  return (
    <StatsLayout>
      <SideColumn>
        <KPIGrid2>
          <KPICardSm $accent="#047857">
            <KPIIconBadge $bg="#ecfdf5" $color="#047857"><InvoiceIcon /></KPIIconBadge>
            <KPIValueSm title={formatVND(kpis.totalRevenue)}>{formatVND(kpis.totalRevenue)}</KPIValueSm>
            <KPILabelSm>Tổng giá trị hóa đơn</KPILabelSm>
          </KPICardSm>
          <KPICardSm $accent="#16a34a">
            <KPIIconBadge $bg="#DEF7EC" $color="#03543F"><CheckIcon /></KPIIconBadge>
            <KPIValueSm title={formatVND(kpis.paidRevenue)}>{formatVND(kpis.paidRevenue)}</KPIValueSm>
            <KPILabelSm>Đã thu</KPILabelSm>
          </KPICardSm>
          <KPICardSm $accent="#f87171">
            <KPIIconBadge $bg="#fef2f2" $color="#b91c1c"><AlertIcon /></KPIIconBadge>
            <KPIValueSm title={formatVND(kpis.unpaidRevenue)}>{formatVND(kpis.unpaidRevenue)}</KPIValueSm>
            <KPILabelSm>Chưa thu</KPILabelSm>
          </KPICardSm>
          <KPICardSm $accent="#d97706">
            <KPIIconBadge $bg="#fff0d8" $color="#d97706"><StackIcon /></KPIIconBadge>
            <KPIValueSm>{kpis.unpaidCount}</KPIValueSm>
            <KPILabelSm>Hóa đơn chưa thanh toán</KPILabelSm>
          </KPICardSm>
        </KPIGrid2>

        <RevenueStatusDonutChart invoices={invoices} />
        <RevenueByMonthChart invoices={invoices} monthsToShow={6} />
      </SideColumn>

      <MainColumn>
        <ListCard>
          <ListHeaderRow>
            <ListTitleIcon><InvoiceIcon /></ListTitleIcon>
            <ListTitle>Danh sách hóa đơn</ListTitle>
          </ListHeaderRow>

          <FilterBar style={{ marginBottom: 16 }}>
            <SearchInput
              placeholder="Tìm theo tên học sinh hoặc mã hóa đơn..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div style={{ minWidth: 160 }}>
              <Dropdown
                value={statusFilter}
                onChange={setStatusFilter}
                options={[
                  { value: 'all', label: 'Tất cả trạng thái' },
                  ...invoiceStatuses.map(s => ({ value: s, label: statusLabel(s) })),
                ]}
              />
            </div>
            <div style={{ minWidth: 140 }}>
              <Dropdown
                value={typeFilter}
                onChange={setTypeFilter}
                options={[
                  { value: 'all', label: 'Tất cả loại' },
                  ...invoiceTypes.map(t => ({ value: t, label: typeLabel(t) })),
                ]}
              />
            </div>
          </FilterBar>

          <TableCard>
            <TableScroll>
              <Table>
                <thead>
                  <Tr>
                    <Th>Mã HĐ</Th>
                    <Th>Học sinh</Th>
                    <Th>Loại</Th>
                    <Th>Gói</Th>
                    <Th>Tháng</Th>
                    <Th>Tổng tiền</Th>
                    <Th>Trạng thái</Th>
                    <Th>Hạn thanh toán</Th>
                    <Th>Công khai</Th>
                    <Th style={{ textAlign: 'center' }}>Thao tác</Th>
                  </Tr>
                </thead>
                <tbody>
                  {currentData.length === 0 ? (
                    <Tr><Td colSpan={10}><LoadingText>Không tìm thấy hóa đơn nào.</LoadingText></Td></Tr>
                  ) : (
                    currentData.map(inv => (
                      <Tr key={inv.id}>
                        <Td>#{inv.id}</Td>
                        <Td style={{ fontWeight: 500 }}>{inv.studentFullName || 'Không xác định'}</Td>
                        <Td><TypeBadge $type={typeVariant(inv.invoiceType)}>{typeLabel(inv.invoiceType)}</TypeBadge></Td>
                        <Td>{inv.packageName || '-'}</Td>
                        <Td>{inv.billingMonth}</Td>
                        <Td style={{ fontWeight: 600 }}>{formatVND(inv.totalAmount)}</Td>
                        <Td><StatusBadge $status={statusVariant(inv.paymentStatus)}>{statusLabel(inv.paymentStatus)}</StatusBadge></Td>
                        <Td>{formatDate(inv.dueDate, inv.invoiceType)}</Td>
                        <Td>
                          {inv.invoiceType?.toUpperCase() === 'EXTRACURRICULAR'
                            ? '-'
                            : <PublishBadge published={inv.published} publishedAt={inv.publishedAt} />}
                        </Td>
                        <Td style={{ textAlign: 'center' }}>
                          <DetailButton onClick={() => setDetailInvoiceId(inv.id)}>Xem chi tiết</DetailButton>
                        </Td>
                      </Tr>
                    ))
                  )}
                </tbody>
              </Table>
            </TableScroll>

            {filteredInvoices.length > 0 && (
              <PaginationContainer>
                <PaginationText>
                  Hiển thị {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredInvoices.length)} của {filteredInvoices.length} hóa đơn
                </PaginationText>
                <PaginationGroup>
                  <PageButton disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>
                    Trước
                  </PageButton>
                  <PageButton disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>
                    Sau
                  </PageButton>
                </PaginationGroup>
              </PaginationContainer>
            )}
          </TableCard>
        </ListCard>
      </MainColumn>

      {detailInvoiceId !== null && (
        <InvoiceDetailModal
          invoiceId={detailInvoiceId}
          onClose={() => setDetailInvoiceId(null)}
          onPublish={handlePublish}
        />
      )}
    </StatsLayout>
  );
}
