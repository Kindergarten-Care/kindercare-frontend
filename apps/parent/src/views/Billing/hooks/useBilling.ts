'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useStudent } from '@/contexts/StudentContext';
import { invoiceService } from '@/services/Invoice/InvoiceService';
import { InvoiceDomainModel, InvoiceType, PaymentStatus } from '@/config/types/invoice';

export type TypeFilter = 'ALL' | InvoiceType;
export type StatusFilter = 'ALL' | PaymentStatus;
export type MonthFilter = 'ALL' | string;

export interface InvoiceMonthGroup {
  billingMonth: string;
  invoices: InvoiceDomainModel[];
}

/** 'MM-YYYY' -> sortable 'YYYY-MM' key */
function monthSortKey(billingMonth: string): string {
  const [month, year] = billingMonth.split('-');
  return `${year}-${month}`;
}

export function useBilling() {
  const { activeStudent, loading: studentLoading } = useStudent();

  const [invoices, setInvoices] = useState<InvoiceDomainModel[]>([]);
  const [apiLoading, setApiLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('ALL');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('ALL');
  const [monthFilter, setMonthFilter] = useState<MonthFilter>('ALL');

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

  const availableMonths = useMemo(() => {
    const months = Array.from(new Set(invoices.map(inv => inv.billingMonth)));
    return months.sort((a, b) => monthSortKey(b).localeCompare(monthSortKey(a)));
  }, [invoices]);

  const filteredInvoices = useMemo(() => {
    return invoices.filter(inv => {
      if (typeFilter !== 'ALL' && inv.invoiceType !== typeFilter) return false;
      if (statusFilter !== 'ALL' && inv.paymentStatus !== statusFilter) return false;
      if (monthFilter !== 'ALL' && inv.billingMonth !== monthFilter) return false;
      return true;
    });
  }, [invoices, typeFilter, statusFilter, monthFilter]);

  const groupedInvoices = useMemo((): InvoiceMonthGroup[] => {
    const groups = new Map<string, InvoiceDomainModel[]>();
    for (const inv of filteredInvoices) {
      const list = groups.get(inv.billingMonth);
      if (list) list.push(inv);
      else groups.set(inv.billingMonth, [inv]);
    }
    return Array.from(groups.entries())
      .map(([billingMonth, list]) => ({ billingMonth, invoices: list }))
      .sort((a, b) => monthSortKey(b.billingMonth).localeCompare(monthSortKey(a.billingMonth)));
  }, [filteredInvoices]);

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
    groupedInvoices,
    availableMonths,
    summary,
    typeFilter,
    setTypeFilter,
    statusFilter,
    setStatusFilter,
    monthFilter,
    setMonthFilter,
    refetch: fetchInvoices,
  };
}
