import { useCallback, useEffect, useMemo, useState } from 'react';
import { financeService } from '@/services/Principal/FinanceService';
import { InvoiceDto } from '@/config/types/finance';
import { currentBillingMonth } from '../utils/billingMonth';

export type ReviewStatusTab = 'draft' | 'published' | 'all';

export function useInvoiceReview() {
  const [billingMonth, setBillingMonth] = useState(currentBillingMonth());
  const [statusTab, setStatusTab] = useState<ReviewStatusTab>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'TUITION' | 'MONTHLY'>('all');

  const [invoices, setInvoices] = useState<InvoiceDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInvoices = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await financeService.getInvoices({
        billingMonth,
        ...(statusTab === 'all' ? {} : { published: statusTab === 'draft' ? '0' : '1' }),
      });
      // EXTRACURRICULAR không thuộc quy trình duyệt/công khai — loại khỏi màn hình này.
      setInvoices(data.filter(inv => inv.invoiceType !== 'EXTRACURRICULAR'));
    } catch (err: any) {
      setError(err.message || 'Lỗi khi tải danh sách hóa đơn');
    } finally {
      setLoading(false);
    }
  }, [billingMonth, statusTab]);

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  const filteredInvoices = useMemo(() => {
    if (typeFilter === 'all') return invoices;
    return invoices.filter(inv => inv.invoiceType === typeFilter);
  }, [invoices, typeFilter]);

  return {
    billingMonth,
    setBillingMonth,
    statusTab,
    setStatusTab,
    typeFilter,
    setTypeFilter,
    invoices: filteredInvoices,
    loading,
    error,
    refetch: fetchInvoices,
  };
}
