import { useEffect, useMemo, useState } from 'react';
import { financeService } from '@/services/Principal/FinanceService';
import { InvoiceDto } from '@/config/types/finance';

const ITEMS_PER_PAGE = 10;

function toNumber(value: unknown): number {
  const n = typeof value === 'number' ? value : parseFloat(String(value));
  return Number.isFinite(n) ? n : 0;
}

export function useInvoiceStats() {
  const [invoices, setInvoices] = useState<InvoiceDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await financeService.getInvoices();
      setInvoices(data);
    } catch (err: any) {
      setError(err.message || 'Lỗi khi tải danh sách hóa đơn');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const invoiceStatuses = useMemo(
    () => Array.from(new Set(invoices.map(i => i.paymentStatus).filter(Boolean))),
    [invoices]
  );
  const invoiceTypes = useMemo(
    () => Array.from(new Set(invoices.map(i => i.invoiceType).filter(Boolean))),
    [invoices]
  );

  const filteredInvoices = useMemo(() => {
    return invoices.filter(inv => {
      if (statusFilter !== 'all' && inv.paymentStatus !== statusFilter) return false;
      if (typeFilter !== 'all' && inv.invoiceType !== typeFilter) return false;
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        const name = inv.studentFullName?.toLowerCase() || '';
        const id = String(inv.id);
        return name.includes(term) || id.includes(term);
      }
      return true;
    });
  }, [invoices, statusFilter, typeFilter, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredInvoices.length / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = filteredInvoices.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, typeFilter]);

  const kpis = useMemo(() => {
    const paidInvoices = invoices.filter(i => i.paymentStatus === 'Paid');
    const unpaidInvoices = invoices.filter(i => i.paymentStatus !== 'Paid');
    const totalRevenue = invoices.reduce((sum, i) => sum + toNumber(i.totalAmount), 0);
    const paidRevenue = paidInvoices.reduce((sum, i) => sum + toNumber(i.totalAmount), 0);
    const unpaidRevenue = unpaidInvoices.reduce((sum, i) => sum + toNumber(i.totalAmount), 0);
    const unpaidCount = unpaidInvoices.length;
    return { totalRevenue, paidRevenue, unpaidRevenue, unpaidCount };
  }, [invoices]);

  return {
    invoices,
    loading,
    error,
    refetch: fetchInvoices,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    typeFilter,
    setTypeFilter,
    invoiceStatuses,
    invoiceTypes,
    filteredInvoices,
    currentData,
    currentPage,
    setCurrentPage,
    totalPages,
    startIndex,
    itemsPerPage: ITEMS_PER_PAGE,
    kpis,
  };
}
