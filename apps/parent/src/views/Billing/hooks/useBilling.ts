'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useStudent } from '@/contexts/StudentContext';
import { invoiceService } from '@/services/Invoice/InvoiceService';
import { InvoiceDomainModel, InvoiceType, PaymentStatus } from '@/config/types/invoice';

export type TypeFilter = 'ALL' | InvoiceType;
export type StatusFilter = 'ALL' | PaymentStatus;

export function useBilling() {
  const { activeStudent, loading: studentLoading } = useStudent();

  const [invoices, setInvoices] = useState<InvoiceDomainModel[]>([]);
  const [apiLoading, setApiLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('ALL');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('ALL');

  const fetchInvoices = useCallback(() => {
    if (!activeStudent?.studentId) return;
    setApiLoading(true);
    setError(null);
    invoiceService
      .getInvoices(activeStudent.studentId)
      .then(setInvoices)
      .catch((err: any) => {
        console.error('Failed to fetch invoices:', err);
        setError(err.message || 'Không tải được danh sách hóa đơn');
      })
      .finally(() => setApiLoading(false));
  }, [activeStudent?.studentId]);

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  const filteredInvoices = useMemo(() => {
    return invoices.filter(inv => {
      if (typeFilter !== 'ALL' && inv.invoiceType !== typeFilter) return false;
      if (statusFilter !== 'ALL' && inv.paymentStatus !== statusFilter) return false;
      return true;
    });
  }, [invoices, typeFilter, statusFilter]);

  const summary = useMemo(() => {
    const unpaidTotal = invoices
      .filter(inv => inv.paymentStatus !== 'Paid')
      .reduce((sum, inv) => sum + inv.totalAmount, 0);
    const overdueCount = invoices.filter(inv => {
      if (inv.paymentStatus === 'Paid' || !inv.dueDate) return false;
      return inv.dueDate < Math.floor(Date.now() / 1000);
    }).length;
    return { unpaidTotal, overdueCount, totalCount: invoices.length };
  }, [invoices]);

  return {
    loading: studentLoading || apiLoading,
    error,
    activeStudent,
    invoices: filteredInvoices,
    summary,
    typeFilter,
    setTypeFilter,
    statusFilter,
    setStatusFilter,
    refetch: fetchInvoices,
  };
}
