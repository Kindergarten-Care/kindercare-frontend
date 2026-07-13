'use client';

import React, { useEffect, useState } from 'react';
import { kcToast } from '@kindercare/ui';
import { Modal, ModalHeader, ModalBody, KmFoot, KmBtn, CreditCardIcon } from '@/components/Modal';
import { financeService } from '@/services/Principal/FinanceService';
import { InvoiceDetailDto } from '@/config/types/finance';
import PublishBadge from './PublishBadge';
import { TypeBadge, StatusBadge, LoadingText } from '../styles';
import {
  SummaryCard, SummaryTop, SummaryStudent, SummaryMeta, SummaryAmount, SummaryAmountLabel,
  Section, SectionTitle, BreakdownGrid, BreakdownRow, BreakdownRowTop, BreakdownLabel, BreakdownValue, BreakdownNote,
  InfoGrid, InfoItem, InfoLabel, InfoValue,
  TxList, TxRow, TxMethod, TxMeta, TxAmount, TxStatusBadge, EmptyTx, LoadingBox,
} from './InvoiceDetailModal.styles';

interface InvoiceDetailModalProps {
  invoiceId: number;
  onClose: () => void;
  onPublish?: (invoiceId: number) => Promise<void>;
}

const formatVND = (n: number) => `${new Intl.NumberFormat('vi-VN').format(n)} đ`;

const formatDateTime = (timestamp: number | null) => {
  if (!timestamp) return '—';
  const d = new Date(timestamp * 1000);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(d.getHours())}:${pad(d.getMinutes())} ${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
};

const formatDate = (timestamp: number | null) => {
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

export default function InvoiceDetailModal({ invoiceId, onClose, onPublish }: InvoiceDetailModalProps) {
  const [invoice, setInvoice] = useState<InvoiceDetailDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [publishing, setPublishing] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    financeService.getInvoiceDetail(invoiceId)
      .then(data => { if (!cancelled) setInvoice(data); })
      .catch((err: any) => { if (!cancelled) kcToast.error(err.message || 'Lỗi khi tải chi tiết hóa đơn'); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [invoiceId]);

  const handlePublish = async () => {
    if (!invoice || !onPublish) return;
    try {
      setPublishing(true);
      await onPublish(invoice.id);
      onClose();
    } catch {
      // lỗi đã được xử lý & toast ở nơi gọi
    } finally {
      setPublishing(false);
    }
  };

  return (
    <Modal size="lg" onClose={onClose}>
      <ModalHeader
        icon={<CreditCardIcon />}
        iconVariant="brand"
        title="Chi tiết hóa đơn"
        subtitle={invoice ? `Mã hóa đơn #${invoice.id}` : undefined}
        onClose={onClose}
      />

      <ModalBody>
        {loading || !invoice ? (
          <LoadingBox><LoadingText>Đang tải chi tiết hóa đơn...</LoadingText></LoadingBox>
        ) : (
          <>
            <SummaryCard>
              <SummaryTop>
                <div>
                  <SummaryStudent>{invoice.studentFullName || 'Không xác định'}</SummaryStudent>
                  <SummaryMeta>
                    {invoice.className || 'Chưa xếp lớp'} · {invoice.periodRange || invoice.billingMonth}
                  </SummaryMeta>
                </div>
                <div>
                  <SummaryAmount>{formatVND(invoice.totalAmount)}</SummaryAmount>
                  <SummaryAmountLabel>Tổng cộng</SummaryAmountLabel>
                </div>
              </SummaryTop>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <TypeBadge $type={invoiceTypeVariant(invoice.invoiceType)}>{invoiceTypeLabel(invoice.invoiceType)}</TypeBadge>
                <StatusBadge $status={statusVariant(invoice.paymentStatus)}>{statusLabel(invoice.paymentStatus)}</StatusBadge>
                {invoice.invoiceType?.toUpperCase() !== 'EXTRACURRICULAR' && (
                  <PublishBadge published={invoice.published} publishedAt={invoice.publishedAt} />
                )}
              </div>
            </SummaryCard>

            <Section>
              <SectionTitle>Chi tiết số tiền</SectionTitle>
              <BreakdownGrid>
                <BreakdownRow>
                  <BreakdownLabel>Học phí</BreakdownLabel>
                  <BreakdownValue>{formatVND(invoice.tuitionFee)}</BreakdownValue>
                </BreakdownRow>
                <BreakdownRow>
                  <BreakdownLabel>Tiền ăn dự kiến</BreakdownLabel>
                  <BreakdownValue>{formatVND(invoice.expectedMealFee)}</BreakdownValue>
                </BreakdownRow>
                <BreakdownRow>
                  <BreakdownLabel>Phụ thu</BreakdownLabel>
                  <BreakdownValue>{formatVND(invoice.surcharge)}</BreakdownValue>
                </BreakdownRow>
                <BreakdownRow>
                  <BreakdownRowTop>
                    <BreakdownLabel>Hoàn tiền</BreakdownLabel>
                    <BreakdownValue>{formatVND(invoice.refundAmount)}</BreakdownValue>
                  </BreakdownRowTop>
                  {invoice.invoiceType?.toUpperCase() === 'MONTHLY' && invoice.mealRefundBreakdown && (
                    <BreakdownNote>
                      Nghỉ {invoice.mealRefundBreakdown.deductedDays} ngày công có phép × {formatVND(invoice.mealRefundBreakdown.dailyFee)}/ngày
                    </BreakdownNote>
                  )}
                </BreakdownRow>
                <BreakdownRow $emphasis>
                  <BreakdownLabel>Giảm giá</BreakdownLabel>
                  <BreakdownValue $emphasis>{formatVND(invoice.discountAmount)}</BreakdownValue>
                </BreakdownRow>
                <BreakdownRow $emphasis>
                  <BreakdownLabel>Tổng cộng</BreakdownLabel>
                  <BreakdownValue $emphasis>{formatVND(invoice.totalAmount)}</BreakdownValue>
                </BreakdownRow>
              </BreakdownGrid>
            </Section>

            <Section>
              <SectionTitle>Thông tin khác</SectionTitle>
              <InfoGrid>
                <InfoItem>
                  <InfoLabel>Gói học phí</InfoLabel>
                  <InfoValue>{invoice.packageName || '—'}</InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>Ngày tạo</InfoLabel>
                  <InfoValue>{formatDate(invoice.createdAt)}</InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>Hạn đóng</InfoLabel>
                  <InfoValue>{formatDate(invoice.dueDate)}</InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>Công khai lúc</InfoLabel>
                  <InfoValue>{invoice.publishedAt ? formatDateTime(invoice.publishedAt) : '—'}</InfoValue>
                </InfoItem>
              </InfoGrid>
            </Section>

            <Section>
              <SectionTitle>Lịch sử giao dịch</SectionTitle>
              {invoice.transactions.length === 0 ? (
                <EmptyTx>Chưa có giao dịch nào</EmptyTx>
              ) : (
                <TxList>
                  {invoice.transactions.map(tx => (
                    <TxRow key={tx.id}>
                      <div>
                        <TxMethod>{tx.paymentMethod}</TxMethod>
                        <TxMeta>Mã GD: {tx.transactionCode} · {formatDateTime(tx.transactionDate)}</TxMeta>
                        <div>
                          <TxStatusBadge $success={tx.status?.toLowerCase() === 'success'}>{tx.status}</TxStatusBadge>
                        </div>
                      </div>
                      <TxAmount>{formatVND(tx.amountPaid)}</TxAmount>
                    </TxRow>
                  ))}
                </TxList>
              )}
            </Section>
          </>
        )}
      </ModalBody>

      <KmFoot>
        <KmBtn type="button" $variant="ghost" onClick={onClose}>Đóng</KmBtn>
        {invoice && invoice.published === 0 && onPublish && (
          <KmBtn type="button" $variant="brand" onClick={handlePublish} disabled={publishing}>
            {publishing ? 'Đang xử lý...' : 'Công khai hóa đơn'}
          </KmBtn>
        )}
      </KmFoot>
    </Modal>
  );
}
