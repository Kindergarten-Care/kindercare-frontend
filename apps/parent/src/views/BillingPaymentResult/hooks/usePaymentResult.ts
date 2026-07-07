'use client';

import { useEffect, useRef, useState } from 'react';
import { invoiceService } from '@/services/Invoice/InvoiceService';
import { InvoiceDetailDomainModel } from '@/config/types/invoice';

const MAX_POLL_ATTEMPTS = 5;
const POLL_INTERVAL_MS = 2000;

export type PaymentResultState = 'checking' | 'success' | 'failed' | 'pending';

export interface UsePaymentResultResult {
  state: PaymentResultState;
  invoice: InvoiceDetailDomainModel | null;
  invoiceId: string | null;
}

const PENDING_INVOICE_KEY = 'momo_pending_invoice';
const PENDING_ORDER_KEY = 'momo_pending_order';

export function usePaymentResult(): UsePaymentResultResult {
  const [state, setState] = useState<PaymentResultState>('checking');
  const [invoice, setInvoice] = useState<InvoiceDetailDomainModel | null>(null);
  const [invoiceId, setInvoiceId] = useState<string | null>(null);
  const attemptsRef = useRef(0);

  useEffect(() => {
    setInvoiceId(sessionStorage.getItem(PENDING_INVOICE_KEY));
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
          sessionStorage.removeItem(PENDING_INVOICE_KEY);
          sessionStorage.removeItem(PENDING_ORDER_KEY);
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

  return { state, invoice, invoiceId };
}