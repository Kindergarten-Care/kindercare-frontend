'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import { useParams } from 'next/navigation';
import { kcToast } from '@kindercare/ui';
import * as S from './styles';
import { useBillingDetail } from './hooks/useBillingDetail';
import { formatVND, formatBillingMonth, formatUnixDateTime, getDueStatus } from '@/utils/Billing/format';
import { IconChevronLeft, IconCreditCard, IconCheck, IconShieldInfo } from '@/assets/icons/dashboard';

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

function txStatusLabel(status: string): string {
  if (status === 'Success') return 'Thành công';
  if (status === 'Failed') return 'Thất bại';
  return 'Đang xử lý';
}

export function BillingDetail() {
  const locale = useLocale();
  const params = useParams();
  const invoiceId = params?.invoiceId as string;
  const { invoice, loading, error, payingMomo, payWithMomo, payingVnpay, payWithVnpay } = useBillingDetail(invoiceId);

  const handlePayMomo = async (): Promise<void> => {
    try {
      await payWithMomo();
    } catch (err: any) {
      kcToast.error(err?.message || 'Không tạo được đơn thanh toán MoMo');
    }
  };

  const handlePayVnpay = async (): Promise<void> => {
    try {
      await payWithVnpay();
    } catch (err: any) {
      kcToast.error(err?.message || 'Không tạo được đơn thanh toán VNPay');
    }
  };

  if (loading) {
    return (
      <S.PageWrap>
        <S.LoadingState>Đang tải chi tiết hóa đơn...</S.LoadingState>
      </S.PageWrap>
    );
  }

  if (error || !invoice) {
    return (
      <S.PageWrap>
        <S.BackLink href={`/${locale}/billing`}>
          <IconChevronLeft size={15} /> Quay lại danh sách hóa đơn
        </S.BackLink>
        <S.Card>
          <S.CardBody>{error || 'Không tìm thấy hóa đơn'}</S.CardBody>
        </S.Card>
      </S.PageWrap>
    );
  }

  const due = getDueStatus(invoice.dueDate, invoice.paymentStatus);
  const canPay = invoice.paymentStatus !== 'Paid' && invoice.totalAmount > 0;

  return (
    <S.PageWrap>
      <S.BackLink href={`/${locale}/billing`}>
        <IconChevronLeft size={15} /> Quay lại danh sách hóa đơn
      </S.BackLink>

      <S.Card>
        <S.CardHead>
          <div style={{ flex: 1 }}>
            <S.HeadTitle>
              {invoice.invoiceType === 'TUITION'
                ? `Học phí ${invoice.periodRange ?? formatBillingMonth(invoice.billingMonth)}`
                : `Hóa đơn ${formatBillingMonth(invoice.billingMonth)}`}
            </S.HeadTitle>
            <S.HeadSub>
              {due.label || (invoice.paymentStatus === 'Paid' ? 'Đã hoàn tất thanh toán' : 'Chưa có hạn đóng cụ thể')}
            </S.HeadSub>
          </div>
          <S.Badge $variant={statusBadgeVariant(invoice.paymentStatus)}>{statusLabel(invoice.paymentStatus)}</S.Badge>
        </S.CardHead>

        <S.CardBody>
          {invoice.tuitionFee > 0 && (
            <S.LineRow>
              <S.LineLabel>Học phí</S.LineLabel>
              <S.LineValue>{formatVND(invoice.tuitionFee)}</S.LineValue>
            </S.LineRow>
          )}
          {invoice.expectedMealFee > 0 && (
            <S.LineRow>
              <S.LineLabel>Tiền ăn</S.LineLabel>
              <S.LineValue>{formatVND(invoice.expectedMealFee)}</S.LineValue>
            </S.LineRow>
          )}
          {invoice.extracurricularFee > 0 && (
            <S.LineRow>
              <S.LineLabel>Ngoại khóa</S.LineLabel>
              <S.LineValue>{formatVND(invoice.extracurricularFee)}</S.LineValue>
            </S.LineRow>
          )}
          {invoice.surcharge > 0 && (
            <S.LineRow>
              <S.LineLabel>Phụ thu</S.LineLabel>
              <S.LineValue>{formatVND(invoice.surcharge)}</S.LineValue>
            </S.LineRow>
          )}
          {invoice.discountAmount > 0 && (
            <S.LineRow>
              <S.LineLabel>Chiết khấu</S.LineLabel>
              <S.LineValue $negative>-{formatVND(invoice.discountAmount)}</S.LineValue>
            </S.LineRow>
          )}
          {invoice.refundAmount > 0 && (
            <S.LineRow>
              <S.LineLabel>Hoàn tiền ăn tháng trước</S.LineLabel>
              <S.LineValue $negative>-{formatVND(invoice.refundAmount)}</S.LineValue>
            </S.LineRow>
          )}

          <S.TotalRow>
            <S.TotalLabel>Tổng cộng</S.TotalLabel>
            <S.TotalValue>{formatVND(invoice.totalAmount)}</S.TotalValue>
          </S.TotalRow>
        </S.CardBody>

        {canPay && (
          <S.PayActions>
            <S.Btn $variant="brand" onClick={handlePayMomo} disabled={payingMomo || payingVnpay}>
              <IconCreditCard size={17} /> {payingMomo ? 'Đang chuyển tới MoMo...' : 'Thanh toán qua MoMo'}
            </S.Btn>
            <S.Btn $variant="ghost" onClick={handlePayVnpay} disabled={payingMomo || payingVnpay}>
              <IconCreditCard size={17} /> {payingVnpay ? 'Đang chuyển tới VNPay...' : 'Thanh toán qua VNPay'}
            </S.Btn>
          </S.PayActions>
        )}
      </S.Card>

      <S.Card>
        <S.CardHead>
          <S.HeadTitle style={{ fontSize: 16 }}>Lịch sử giao dịch</S.HeadTitle>
        </S.CardHead>
        {invoice.transactions.length === 0 ? (
          <S.EmptyTx>Chưa có giao dịch nào cho hóa đơn này.</S.EmptyTx>
        ) : (
          <S.CardBody>
            <S.Timeline>
              {invoice.transactions.map(tx => (
                <S.TxRow key={tx.transactionId}>
                  <S.TxIcon $status={tx.status}>
                    <IconCheck size={16} />
                  </S.TxIcon>
                  <S.TxBody>
                    <S.TxMethod>{tx.paymentMethod}</S.TxMethod>
                    <S.TxMeta>
                      {formatUnixDateTime(tx.transactionDate)} · {txStatusLabel(tx.status)}
                      {tx.transactionCode ? ` · ${tx.transactionCode}` : ''}
                    </S.TxMeta>
                  </S.TxBody>
                  <S.TxAmount>{formatVND(tx.amountPaid)}</S.TxAmount>
                </S.TxRow>
              ))}
            </S.Timeline>
          </S.CardBody>
        )}
      </S.Card>

      {canPay && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12.5, color: '#9ca3af' }}>
          <IconShieldInfo size={14} /> Sau khi thanh toán qua MoMo hoặc VNPay, trang sẽ tự xác nhận lại trạng thái hóa đơn.
        </div>
      )}
    </S.PageWrap>
  );
}
