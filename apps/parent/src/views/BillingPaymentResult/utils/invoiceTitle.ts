import { InvoiceDetailDomainModel } from '@/config/types/invoice';
import { formatBillingMonth } from '@/utils/Billing/format';

export function invoiceTitle(invoice: InvoiceDetailDomainModel): string {
  if (invoice.invoiceType === 'TUITION') {
    return `Học phí ${invoice.periodRange ?? formatBillingMonth(invoice.billingMonth)}`;
  }
  if (invoice.invoiceType === 'EXTRACURRICULAR') {
    return `Ngoại khóa ${formatBillingMonth(invoice.billingMonth)}`;
  }
  return `Hóa đơn tiền ăn ${formatBillingMonth(invoice.billingMonth)}`;
}