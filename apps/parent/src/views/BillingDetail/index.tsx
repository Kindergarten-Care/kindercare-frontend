'use client';

import React, { useState } from 'react';
import { useLocale } from 'next-intl';
import { useParams } from 'next/navigation';
import { kcToast } from '@kindercare/ui';
import * as S from './styles';
import { useBillingDetail } from './hooks/useBillingDetail';
import { IconChevronLeft } from '@/assets/icons/dashboard';
import { InvoiceSummary } from './components/InvoiceSummary';
import { TransactionList } from './components/TransactionList';
import { PaymentSidebar } from './components/PaymentSidebar';
import { PaymentMethod } from './utils/paymentMethods';

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
        <S.CardBody>{error || 'Không tìm thấy hóa đơn'}</S.CardBody>
      </S.PageWrap>
    );
  }

  const canPay = invoice.paymentStatus !== 'Paid' && invoice.totalAmount > 0;

  return (
    <S.PageWrap>
      <S.BackLink href={`/${locale}/billing`}>
        <IconChevronLeft size={15} /> Quay lại danh sách hóa đơn
      </S.BackLink>

      <S.Layout>
        <S.MainColumn>
          <InvoiceSummary
            invoice={invoice}
            cancellingItemId={cancellingItemId}
            onCancelItem={handleCancelItem}
          />
          <TransactionList transactions={invoice.transactions} />
        </S.MainColumn>

        {canPay && (
          <S.SideColumn>
            <PaymentSidebar
              totalAmount={invoice.totalAmount}
              paying={paying}
              selectedMethod={selectedMethod}
              onSelectMethod={setSelectedMethod}
              onSubmit={handleSubmitPayment}
            />
          </S.SideColumn>
        )}
      </S.Layout>
    </S.PageWrap>
  );
}