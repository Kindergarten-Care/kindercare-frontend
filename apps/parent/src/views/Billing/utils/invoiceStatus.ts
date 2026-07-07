import { formatBillingMonth } from '@/utils/Billing/format';
import { InvoiceDomainModel } from '@/config/types/invoice';

export type InvoiceBadgeVariant = 'unpaid' | 'partial' | 'paid' | 'cancelled';

/** An EXTRACURRICULAR invoice down to 0 means every item on it was cancelled (and refunded, when previously paid). */
export function isCancelledToZero(inv: InvoiceDomainModel): boolean {
  return inv.invoiceType === 'EXTRACURRICULAR' && inv.totalAmount === 0;
}

export function statusBadgeVariant(inv: InvoiceDomainModel): InvoiceBadgeVariant {
  if (isCancelledToZero(inv)) return 'cancelled';
  if (inv.paymentStatus === 'Paid') return 'paid';
  if (inv.paymentStatus === 'Partial') return 'partial';
  return 'unpaid';
}

export function statusLabel(inv: InvoiceDomainModel): string {
  if (isCancelledToZero(inv)) {
    return inv.paymentStatus === 'Paid' ? 'Đã hủy & hoàn tiền' : 'Đã hủy';
  }
  if (inv.paymentStatus === 'Paid') return 'Đã thanh toán';
  if (inv.paymentStatus === 'Partial') return 'Thanh toán 1 phần';
  return 'Chưa thanh toán';
}

export function invoiceTitle(inv: InvoiceDomainModel): string {
  if (inv.invoiceType === 'TUITION') {
    return `Học phí ${inv.periodRange ?? formatBillingMonth(inv.billingMonth)}`;
  }
  if (inv.invoiceType === 'EXTRACURRICULAR') {
    return `Ngoại khóa ${formatBillingMonth(inv.billingMonth)}`;
  }
  return `Hóa đơn tiền ăn ${formatBillingMonth(inv.billingMonth)}`;
}