'use client';

import { useState, useEffect, useCallback } from 'react';
import { invoiceService } from '@/services/Invoice/InvoiceService';
import { extracurricularService } from '@/services/Extracurricular/ExtracurricularService';
import { InvoiceDetailDomainModel } from '@/config/types/invoice';

export function useBillingDetail(invoiceId: number | string | undefined) {
  const [invoice, setInvoice] = useState<InvoiceDetailDomainModel | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [payingMomo, setPayingMomo] = useState(false);
  const [payingVnpay, setPayingVnpay] = useState(false);
  const [cancellingItemId, setCancellingItemId] = useState<number | null>(null);

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

  const payWithVnpay = useCallback(async (): Promise<void> => {
    if (!invoiceId) return;
    setPayingVnpay(true);
    try {
      const { payUrl, txnRef } = await invoiceService.payInvoiceVnpay(invoiceId);
      sessionStorage.setItem('momo_pending_invoice', String(invoiceId));
      sessionStorage.setItem('vnpay_pending_txn', txnRef);
      window.location.href = payUrl;
    } catch (err) {
      setPayingVnpay(false);
      throw err;
    }
  }, [invoiceId]);

  const cancelExtracurricularItem = useCallback(
    async (enrollmentId: number) => {
      if (!invoice) return null;
      setCancellingItemId(enrollmentId);
      try {
        const result = await extracurricularService.cancelEnrollment(invoice.studentId, enrollmentId);
        fetchDetail();
        return result;
      } finally {
        setCancellingItemId(null);
      }
    },
    [invoice, fetchDetail]
  );

  return {
    invoice,
    loading,
    error,
    payingMomo,
    payWithMomo,
    payingVnpay,
    payWithVnpay,
    cancellingItemId,
    cancelExtracurricularItem,
    refetch: fetchDetail,
  };
}
