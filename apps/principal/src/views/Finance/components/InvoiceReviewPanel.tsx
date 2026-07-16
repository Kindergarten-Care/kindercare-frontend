'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Dropdown, kcToast, MonthYearPicker } from '@kindercare/ui';
import { financeService } from '@/services/Principal/FinanceService';
import { useInvoiceReview } from '../hooks/useInvoiceReview';
import { billingMonthToMonthYear, monthYearToBillingMonth } from '../utils/billingMonth';
import PublishBadge from './PublishBadge';
import PublishSelectedConfirmModal from './PublishSelectedConfirmModal';
import RunMonthlyModal from './RunMonthlyModal';
import InvoiceDetailModal from './InvoiceDetailModal';
import {
  TableCard, TableScroll, Table, Th, Tr, Td, TypeBadge, LoadingText, ErrorText,
} from '../styles';
import {
  FilterRow, StatusTabs, StatusTabButton, BulkActionBar, BulkPublishButton,
  RowActions, PublishRowButton, ExpandButton,
  EmptyState, EmptyIcon, EmptyHint, RunManualButton, BulkSelectToggle, CheckboxCell,
} from './InvoiceReviewPanel.styles';

const formatVND = (n: number) => `${new Intl.NumberFormat('vi-VN').format(n)} đ`;

const formatDueDate = (timestamp: number | null) => {
  if (!timestamp) return 'Chưa công khai';
  return new Date(timestamp * 1000).toLocaleDateString('vi-VN');
};

function invoiceTypeVariant(type: string): 'monthly' | 'extracurricular' | 'other' {
  const t = type?.toUpperCase();
  if (t === 'MONTHLY' || t === 'TUITION') return 'monthly';
  if (t === 'EXTRACURRICULAR') return 'extracurricular';
  return 'other';
}

function invoiceTypeLabel(type: string): string {
  const t = type?.toUpperCase();
  if (t === 'TUITION') return 'Học phí';
  if (t === 'MONTHLY') return 'Tiền ăn';
  if (t === 'EXTRACURRICULAR') return 'Ngoại khóa';
  return type;
}

export default function InvoiceReviewPanel() {
  const {
    billingMonth, setBillingMonth, statusTab, setStatusTab,
    typeFilter, setTypeFilter, invoices, loading, error, refetch,
  } = useInvoiceReview();

  const { month, year } = billingMonthToMonthYear(billingMonth);

  const [detailInvoiceId, setDetailInvoiceId] = useState<number | null>(null);
  const [publishingId, setPublishingId] = useState<number | null>(null);
  const [showSelectedConfirm, setShowSelectedConfirm] = useState(false);
  const [showRunMonthly, setShowRunMonthly] = useState(false);

  const [bulkSelectMode, setBulkSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  const selectableInvoices = useMemo(() => invoices.filter(inv => inv.published === 0), [invoices]);

  // Danh sách hóa đơn đổi (đổi tháng/tab/filter) → bỏ chọn để tránh publish nhầm hóa đơn không còn hiển thị.
  useEffect(() => {
    setSelectedIds(new Set());
  }, [invoices]);

  const toggleBulkSelectMode = () => {
    setBulkSelectMode(v => !v);
    setSelectedIds(new Set());
  };

  const toggleSelectOne = (id: number) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    setSelectedIds(prev =>
      prev.size === selectableInvoices.length ? new Set() : new Set(selectableInvoices.map(inv => inv.id))
    );
  };

  const handlePublishOne = async (invoiceId: number) => {
    try {
      setPublishingId(invoiceId);
      await financeService.publishInvoice(invoiceId);
      kcToast.success('Công khai hóa đơn thành công');
      await refetch();
    } catch (err: any) {
      kcToast.error(err.message || 'Có lỗi xảy ra khi công khai hóa đơn');
      throw err;
    } finally {
      setPublishingId(null);
    }
  };

  const handlePublishSelected = async () => {
    await financeService.publishSelectedInvoices(Array.from(selectedIds));
    setSelectedIds(new Set());
    await refetch();
  };

  return (
    <>
      <FilterRow>
        <MonthYearPicker
          month={month}
          year={year}
          onChange={(m, y) => setBillingMonth(monthYearToBillingMonth(m, y))}
          ariaLabel="Chọn tháng billing"
        />

        <StatusTabs>
          <StatusTabButton $active={statusTab === 'all'} onClick={() => setStatusTab('all')}>
            Tất cả
          </StatusTabButton>
          <StatusTabButton $active={statusTab === 'draft'} onClick={() => setStatusTab('draft')}>
            Đang chờ duyệt
          </StatusTabButton>
          <StatusTabButton $active={statusTab === 'published'} onClick={() => setStatusTab('published')}>
            Đã công khai
          </StatusTabButton>
        </StatusTabs>

        <div style={{ minWidth: 160 }}>
          <Dropdown
            value={typeFilter}
            onChange={setTypeFilter}
            options={[
              { value: 'all', label: 'Tất cả loại' },
              { value: 'TUITION', label: 'Học phí' },
              { value: 'MONTHLY', label: 'Tiền ăn' },
            ]}
            ariaLabel="Loại hóa đơn"
          />
        </div>

        <RunManualButton type="button" onClick={() => setShowRunMonthly(true)}>
          Xuất hóa đơn thủ công
        </RunManualButton>
      </FilterRow>

      {statusTab !== 'published' && invoices.length > 0 && (
        <BulkActionBar>
          <BulkSelectToggle $active={bulkSelectMode} onClick={toggleBulkSelectMode}>
            {bulkSelectMode ? 'Hủy chọn nhiều' : 'Chọn nhiều'}
          </BulkSelectToggle>

          {bulkSelectMode && (
            <BulkPublishButton
              disabled={selectedIds.size === 0}
              title={selectedIds.size === 0 ? 'Chưa chọn hóa đơn nào' : undefined}
              onClick={() => setShowSelectedConfirm(true)}
            >
              Công khai {selectedIds.size} hóa đơn
            </BulkPublishButton>
          )}
        </BulkActionBar>
      )}

      {loading ? (
        <LoadingText>Đang tải dữ liệu...</LoadingText>
      ) : error ? (
        <ErrorText>{error}</ErrorText>
      ) : invoices.length === 0 ? (
        <EmptyState>
          <EmptyIcon>🎉</EmptyIcon>
          {statusTab === 'published' ? (
            'Chưa có hóa đơn nào được công khai cho tháng này.'
          ) : (
            <>
              {statusTab === 'draft'
                ? 'Không có hóa đơn nào đang chờ duyệt cho tháng này.'
                : 'Chưa có hóa đơn học phí/tiền ăn nào cho tháng này.'}
              <div>
                <EmptyHint onClick={() => setShowRunMonthly(true)}>Chạy hóa đơn tháng này ngay</EmptyHint>
              </div>
            </>
          )}
        </EmptyState>
      ) : (
        <TableCard>
          <TableScroll>
            <Table>
              <thead>
                <Tr>
                  {bulkSelectMode && (
                    <Th style={{ width: 40 }}>
                      <CheckboxCell
                        type="checkbox"
                        checked={selectableInvoices.length > 0 && selectedIds.size === selectableInvoices.length}
                        onChange={toggleSelectAll}
                        aria-label="Chọn tất cả"
                      />
                    </Th>
                  )}
                  <Th>Học sinh</Th>
                  <Th>Lớp</Th>
                  <Th>Loại</Th>
                  <Th>Kỳ</Th>
                  <Th>Tổng tiền</Th>
                  <Th>Trạng thái</Th>
                  <Th>Hạn đóng</Th>
                  <Th style={{ textAlign: 'center' }}>Thao tác</Th>
                </Tr>
              </thead>
              <tbody>
                {invoices.map(inv => (
                  <Tr key={inv.id}>
                    {bulkSelectMode && (
                      <Td>
                        {inv.published === 0 && (
                          <CheckboxCell
                            type="checkbox"
                            checked={selectedIds.has(inv.id)}
                            onChange={() => toggleSelectOne(inv.id)}
                            aria-label={`Chọn hóa đơn #${inv.id}`}
                          />
                        )}
                      </Td>
                    )}
                    <Td style={{ fontWeight: 500 }}>{inv.studentFullName || 'Không xác định'}</Td>
                    <Td>{inv.className || '-'}</Td>
                    <Td><TypeBadge $type={invoiceTypeVariant(inv.invoiceType)}>{invoiceTypeLabel(inv.invoiceType)}</TypeBadge></Td>
                    <Td>{inv.periodRange || inv.billingMonth}</Td>
                    <Td style={{ fontWeight: 600 }}>{formatVND(inv.totalAmount)}</Td>
                    <Td><PublishBadge published={inv.published} publishedAt={inv.publishedAt} /></Td>
                    <Td>{formatDueDate(inv.dueDate)}</Td>
                    <Td style={{ textAlign: 'center' }}>
                      <RowActions>
                        <ExpandButton onClick={() => setDetailInvoiceId(inv.id)}>
                          Xem chi tiết
                        </ExpandButton>
                        {!bulkSelectMode && inv.published === 0 && (
                          <PublishRowButton
                            disabled={publishingId === inv.id}
                            onClick={() => handlePublishOne(inv.id)}
                          >
                            {publishingId === inv.id ? 'Đang xử lý...' : 'Công khai'}
                          </PublishRowButton>
                        )}
                      </RowActions>
                    </Td>
                  </Tr>
                ))}
              </tbody>
            </Table>
          </TableScroll>
        </TableCard>
      )}

      {showSelectedConfirm && (
        <PublishSelectedConfirmModal
          count={selectedIds.size}
          onClose={() => setShowSelectedConfirm(false)}
          onConfirm={handlePublishSelected}
        />
      )}

      {showRunMonthly && (
        <RunMonthlyModal
          defaultBillingMonth={billingMonth}
          onClose={() => setShowRunMonthly(false)}
          onSuccess={refetch}
        />
      )}

      {detailInvoiceId !== null && (
        <InvoiceDetailModal
          invoiceId={detailInvoiceId}
          onClose={() => setDetailInvoiceId(null)}
          onPublish={handlePublishOne}
        />
      )}
    </>
  );
}
