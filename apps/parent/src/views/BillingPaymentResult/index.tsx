'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from '@/i18n/routing';
import * as S from './styles';
import { invoiceService } from '@/services/Invoice/InvoiceService';
import { InvoiceDetailDomainModel } from '@/config/types/invoice';
import { formatVND, formatBillingMonth, formatUnixDateTime } from '@/utils/Billing/format';
import { IconCheck, IconClose, IconSchedule } from '@/assets/icons/dashboard';

const MAX_POLL_ATTEMPTS = 5;
const POLL_INTERVAL_MS = 2000;

type ResultState = 'checking' | 'success' | 'failed' | 'pending';

function invoiceTitle(invoice: InvoiceDetailDomainModel): string {
  if (invoice.invoiceType === 'TUITION') {
    return `Học phí ${invoice.periodRange ?? formatBillingMonth(invoice.billingMonth)}`;
  }
  if (invoice.invoiceType === 'EXTRACURRICULAR') {
    return `Ngoại khóa ${formatBillingMonth(invoice.billingMonth)}`;
  }
  return `Hóa đơn tiền ăn ${formatBillingMonth(invoice.billingMonth)}`;
}

export function BillingPaymentResult() {
  const router = useRouter();
  const [state, setState] = useState<ResultState>('checking');
  const [invoice, setInvoice] = useState<InvoiceDetailDomainModel | null>(null);
  const attemptsRef = useRef(0);
  const [invoiceId, setInvoiceId] = useState<string | null>(null);

  useEffect(() => {
    setInvoiceId(sessionStorage.getItem('momo_pending_invoice'));
  }, []);

  useEffect(() => {
    if (!invoiceId) {
      setState('pending');
      return;
    }

    let cancelled = false;

    const poll = async (): Promise<void> => {
      try {
        const detail = await invoiceService.getInvoiceDetail(invoiceId);
        if (cancelled) return;
        setInvoice(detail);

        if (detail.paymentStatus === 'Paid') {
          setState('success');
          sessionStorage.removeItem('momo_pending_invoice');
          sessionStorage.removeItem('momo_pending_order');
          return;
        }

        const lastTx = detail.transactions[0];
        if (lastTx?.status === 'Failed') {
          setState('failed');
          return;
        }

        attemptsRef.current += 1;
        if (attemptsRef.current >= MAX_POLL_ATTEMPTS) {
          setState('pending');
          return;
        }
        setTimeout(poll, POLL_INTERVAL_MS);
      } catch {
        if (!cancelled) setState('pending');
      }
    };

    poll();
    return () => {
      cancelled = true;
    };
  }, [invoiceId]);

  const goToInvoice = (): void => {
    if (invoiceId) router.push(`/billing/${invoiceId}`);
    else router.push('/billing');
  };

  if (state === 'checking') {
    return (
      <S.PageWrap>
        <S.Card>
          <S.Spinner />
          <S.Title>Đang xác nhận thanh toán...</S.Title>
          <S.Desc>Vui lòng đợi trong giây lát, chúng tôi đang kiểm tra kết quả giao dịch từ MoMo.</S.Desc>
        </S.Card>
      </S.PageWrap>
    );
  }

  if (state === 'success') {
    const lastTx = invoice?.transactions[0];
    return (
      <S.PageWrap>
        <S.Card $wide={!!invoice}>
          <S.Icon $variant="success">
            <IconCheck size={30} />
          </S.Icon>
          <S.Title>Thanh toán thành công!</S.Title>
          <S.Desc>
            {invoice ? `Đã ghi nhận thanh toán ${formatVND(invoice.totalAmount)}.` : 'Hóa đơn của bạn đã được ghi nhận thanh toán đầy đủ.'}
          </S.Desc>

          {invoice && (
            <S.InfoPanel>
              <S.InfoRow>
                <S.InfoLabel>Hóa đơn</S.InfoLabel>
                <S.InfoValue>{invoiceTitle(invoice)}</S.InfoValue>
              </S.InfoRow>
              {lastTx?.transactionCode && (
                <S.InfoRow>
                  <S.InfoLabel>Mã giao dịch</S.InfoLabel>
                  <S.InfoValue>{lastTx.transactionCode}</S.InfoValue>
                </S.InfoRow>
              )}
              {lastTx && (
                <S.InfoRow>
                  <S.InfoLabel>Thời gian thanh toán</S.InfoLabel>
                  <S.InfoValue>{formatUnixDateTime(lastTx.transactionDate)}</S.InfoValue>
                </S.InfoRow>
              )}
            </S.InfoPanel>
          )}

          <S.Actions>
            <S.Btn $variant="brand" onClick={goToInvoice}>Xem hóa đơn</S.Btn>
          </S.Actions>
        </S.Card>
      </S.PageWrap>
    );
  }

  if (state === 'failed') {
    return (
      <S.PageWrap>
        <S.Card>
          <S.Icon $variant="fail">
            <IconClose size={30} />
          </S.Icon>
          <S.Title>Thanh toán không thành công</S.Title>
          <S.Desc>Giao dịch đã bị hủy hoặc thất bại. Bạn có thể thử thanh toán lại.</S.Desc>
          <S.Actions>
            <S.Btn $variant="ghost" onClick={() => router.push('/billing')}>Về danh sách</S.Btn>
            <S.Btn $variant="brand" onClick={goToInvoice}>Thử lại</S.Btn>
          </S.Actions>
        </S.Card>
      </S.PageWrap>
    );
  }

  return (
    <S.PageWrap>
      <S.Card>
        <S.Icon $variant="pending">
          <IconSchedule size={28} />
        </S.Icon>
        <S.Title>Chưa xác nhận được thanh toán</S.Title>
        <S.Desc>
          Giao dịch có thể đang được xử lý. Vui lòng kiểm tra lại sau ít phút hoặc làm mới trang.
        </S.Desc>
        <S.Actions>
          <S.Btn $variant="ghost" onClick={() => router.push('/billing')}>Về danh sách</S.Btn>
          <S.Btn $variant="brand" onClick={goToInvoice}>Kiểm tra lại</S.Btn>
        </S.Actions>
      </S.Card>
    </S.PageWrap>
  );
}
