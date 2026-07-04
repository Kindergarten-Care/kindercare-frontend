'use client';

import { useState, useEffect, useCallback } from 'react';
import { invoiceService } from '@/services/Invoice/InvoiceService';
import { InvoiceDetailDomainModel } from '@/config/types/invoice';

export function useBillingDetail(invoiceId: number | string | undefined) {
  const [invoice, setInvoice] = useState<InvoiceDetailDomainModel | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [payingMomo, setPayingMomo] = useState(false);

  const fetchDetail = useCallback(() => {
    if (!invoiceId) return;
    setLoading(true);
    setError(null);
    invoiceService
      .getInvoiceDetail(invoiceId)
      .then(setInvoice)
      .catch((err: any) => {
        console.error('Failed to fetch invoice detail:', err);
        setError(err.message || 'Không tải được chi tiết hóa đơn');
      })
      .finally(() => setLoading(false));
  }, [invoiceId]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  const payWithMomo = useCallback(async (): Promise<void> => {
    if (!invoiceId) return;
    setPayingMomo(true);
    try {
      const { payUrl, orderId } = await invoiceService.payInvoiceMomo(invoiceId);
      sessionStorage.setItem('momo_pending_invoice', String(invoiceId));
      sessionStorage.setItem('momo_pending_order', orderId);
      window.location.href = payUrl;
    } catch (err) {
      setPayingMomo(false);
      throw err;
    }
  }, [invoiceId]);

  return {
    invoice,
    loading,
    error,
    payingMomo,
    payWithMomo,
    refetch: fetchDetail,
  };
}
