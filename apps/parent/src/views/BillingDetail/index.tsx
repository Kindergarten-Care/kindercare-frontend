'use client';

import React, { useState } from 'react';
import { useLocale } from 'next-intl';
import { useParams } from 'next/navigation';
import { kcToast } from '@kindercare/ui';
import * as S from './styles';
import { useBillingDetail } from './hooks/useBillingDetail';
import { formatVND, formatBillingMonth, formatUnixDateTime, getDueStatus } from '@/utils/Billing/format';
import { IconChevronLeft, IconCheck, IconShieldInfo, IconClose } from '@/assets/icons/dashboard';
import { ExtracurricularInvoiceItemDomainModel, InvoiceDetailDomainModel } from '@/config/types/invoice';
import momoLogo from '@/assets/paymnent-icons/momo_logo.webp';
import vnpayLogo from '@/assets/paymnent-icons/logo_vnpay.webp';

type PaymentMethod = 'momo' | 'vnpay';

const PAYMENT_METHODS: { key: PaymentMethod; label: string; logo: string }[] = [
  { key: 'momo', label: 'Thanh toán bằng ví điện tử Momo', logo: momoLogo.src },
  { key: 'vnpay', label: 'Thanh toán bằng VNPay QR', logo: vnpayLogo.src },
];

/** An EXTRACURRICULAR invoice down to 0 means every item on it was cancelled (and refunded, when previously paid). */
function isCancelledToZero(invoice: InvoiceDetailDomainModel): boolean {
  return invoice.invoiceType === 'EXTRACURRICULAR' && invoice.totalAmount === 0;
}

/** With several items cancelled, a plain payment-status badge misrepresents the invoice — surface "Đã hủy" instead. */
function hasManyCancelledItems(invoice: InvoiceDetailDomainModel): boolean {
  if (!invoice.extracurricularItems) return false;
  const cancelledCount = invoice.extracurricularItems.filter(
    item => item.status === 'Cancelled' || item.status === 'Expired'
  ).length;
  return cancelledCount >= 2;
}

function statusBadgeVariant(invoice: InvoiceDetailDomainModel): 'unpaid' | 'partial' | 'paid' | 'cancelled' {
  if (isCancelledToZero(invoice) || hasManyCancelledItems(invoice)) return 'cancelled';
  if (invoice.paymentStatus === 'Paid') return 'paid';
  if (invoice.paymentStatus === 'Partial') return 'partial';
  return 'unpaid';
}

function statusLabel(invoice: InvoiceDetailDomainModel): string {
  if (isCancelledToZero(invoice)) return invoice.paymentStatus === 'Paid' ? 'Đã hủy & hoàn tiền' : 'Đã hủy';
  if (hasManyCancelledItems(invoice)) return 'Đã hủy';
  if (invoice.paymentStatus === 'Paid') return 'Đã thanh toán';
  if (invoice.paymentStatus === 'Partial') return 'Thanh toán 1 phần';
  return 'Chưa thanh toán';
}

function txStatusLabel(status: string): string {
  if (status === 'Success') return 'Thành công';
  if (status === 'Failed') return 'Thất bại';
  return 'Đang xử lý';
}

function itemBadgeVariant(item: ExtracurricularInvoiceItemDomainModel): 'pending' | 'active' | 'cancelled' | 'cancelled-warn' | 'expired' {
  if (item.status === 'Active') return 'active';
  if (item.status === 'Expired') return 'expired';
  if (item.status === 'Cancelled') {
    const wasEverActivated = !!item.activatedAt;
    if (!wasEverActivated) return 'cancelled';
    return item.feeRefunded ? 'cancelled' : 'cancelled-warn';
  }
  return 'pending';
}

function itemStatusLabel(item: ExtracurricularInvoiceItemDomainModel): string {
  if (item.status === 'Active') return 'Đang tham gia';
  if (item.status === 'Expired') return 'Đã hết hạn đăng ký';
  if (item.status === 'Cancelled') {
    const wasEverActivated = !!item.activatedAt;
    if (!wasEverActivated) return 'Đã hủy';
    return item.feeRefunded ? 'Đã hủy — đã hoàn phí' : 'Đã hủy — không hoàn phí';
  }
  return 'Đang chờ thanh toán';
}

export function BillingDetail() {
  const locale = useLocale();
  const params = useParams();
  const invoiceId = params?.invoiceId as string;
  const {
    invoice,
    loading,
    error,
    payingMomo,
    payWithMomo,
    payingVnpay,
    payWithVnpay,
    cancellingItemId,
    cancelExtracurricularItem,
  } = useBillingDetail(invoiceId);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('momo');

  const paying = payingMomo || payingVnpay;

  const handleSubmitPayment = async (): Promise<void> => {
    try {
      if (selectedMethod === 'momo') await payWithMomo();
      else await payWithVnpay();
    } catch (err: any) {
      kcToast.error(err?.message || `Không tạo được đơn thanh toán ${selectedMethod === 'momo' ? 'MoMo' : 'VNPay'}`);
    }
  };

  const handleCancelItem = async (enrollmentId: number): Promise<void> => {
    try {
      const result = await cancelExtracurricularItem(enrollmentId);
      if (!result?.activatedAt) {
        kcToast.success('Đã hủy đăng ký.');
      } else if (result.feeRefunded) {
        kcToast.success('Đã hủy, phí đã được hoàn.');
      } else {
        kcToast.success('Đã hủy, không hoàn phí (đã quá 48 giờ kể từ lúc thanh toán).');
      }
    } catch (err: any) {
      kcToast.error(err?.message || 'Hủy đăng ký thất bại');
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

      <S.Layout>
        <S.MainColumn>
          <S.Card>
            <S.CardHead>
              <div style={{ flex: 1 }}>
                <S.HeadTitle>
                  {invoice.invoiceType === 'TUITION'
                    ? `Học phí ${invoice.periodRange ?? formatBillingMonth(invoice.billingMonth)}`
                    : invoice.invoiceType === 'EXTRACURRICULAR'
                    ? `Ngoại khóa ${formatBillingMonth(invoice.billingMonth)}`
                    : `Hóa đơn tiền ăn ${formatBillingMonth(invoice.billingMonth)}`}
                </S.HeadTitle>
                <S.HeadSub>
                  {due.label || (invoice.paymentStatus === 'Paid' ? 'Đã hoàn tất thanh toán' : 'Chưa có hạn đóng cụ thể')}
                </S.HeadSub>
              </div>
              <S.Badge $variant={statusBadgeVariant(invoice)}>{statusLabel(invoice)}</S.Badge>
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
              {invoice.invoiceType === 'EXTRACURRICULAR' && invoice.extracurricularItems ? (
                invoice.extracurricularItems.map(item => {
                  const struck = item.status === 'Cancelled' || item.status === 'Expired';
                  const canCancelItem = item.status === 'Pending';
                  return (
                    <S.ItemRow key={item.enrollmentId} $struck={struck}>
                      <S.ItemInfo>
                        <S.ItemName $struck={struck}>{item.activityName}</S.ItemName>
                        <S.ItemBadge $variant={itemBadgeVariant(item)}>{itemStatusLabel(item)}</S.ItemBadge>
                      </S.ItemInfo>
                      <S.ItemRight>
                        <S.ItemFee $struck={struck}>{formatVND(item.monthlyFee)}</S.ItemFee>
                        {canCancelItem && (
                          <S.ItemCancelBtn
                            onClick={() => handleCancelItem(item.enrollmentId)}
                            disabled={cancellingItemId === item.enrollmentId}
                          >
                            <IconClose size={12} /> Hủy
                          </S.ItemCancelBtn>
                        )}
                      </S.ItemRight>
                    </S.ItemRow>
                  );
                })
              ) : (
                invoice.extracurricularFee > 0 && (
                  <S.LineRow>
                    <S.LineLabel>Ngoại khóa</S.LineLabel>
                    <S.LineValue>{formatVND(invoice.extracurricularFee)}</S.LineValue>
                  </S.LineRow>
                )
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
        </S.MainColumn>

        {canPay && (
          <S.SideColumn>
            <S.Card>
              <S.CardHead>
                <S.HeadTitle style={{ fontSize: 16 }}>Chọn phương thức thanh toán</S.HeadTitle>
              </S.CardHead>

              <S.PaymentAmountRow>
                <S.PaymentAmountLabel>Số tiền cần thanh toán</S.PaymentAmountLabel>
                <S.PaymentAmountValue>{formatVND(invoice.totalAmount)}</S.PaymentAmountValue>
              </S.PaymentAmountRow>

              <S.MethodList role="radiogroup" aria-label="Phương thức thanh toán">
                {PAYMENT_METHODS.map(method => (
                  <S.MethodOption key={method.key} $active={selectedMethod === method.key} $disabled={paying}>
                    <S.MethodRadio
                      type="radio"
                      name="payment-method"
                      value={method.key}
                      checked={selectedMethod === method.key}
                      disabled={paying}
                      onChange={() => setSelectedMethod(method.key)}
                    />
                    <S.MethodLogo src={method.logo} alt={method.label} />
                    <S.MethodName>{method.label}</S.MethodName>
                  </S.MethodOption>
                ))}
              </S.MethodList>

              <S.SecurityNote>
                <IconShieldInfo size={14} /> Trang sẽ tự xác nhận lại trạng thái hóa đơn sau khi thanh toán.
              </S.SecurityNote>

              <S.SubmitPayBtn onClick={handleSubmitPayment} disabled={paying}>
                {paying
                  ? `Đang chuyển tới ${selectedMethod === 'momo' ? 'MoMo' : 'VNPay'}...`
                  : 'Tiến hành thanh toán'}
              </S.SubmitPayBtn>
            </S.Card>
          </S.SideColumn>
        )}
      </S.Layout>
    </S.PageWrap>
  );
}
