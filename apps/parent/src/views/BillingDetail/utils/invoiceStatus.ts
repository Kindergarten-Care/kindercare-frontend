import {
  ExtracurricularInvoiceItemDomainModel,
  InvoiceDetailDomainModel,
} from '@/config/types/invoice';

export type BadgeVariant =
  | 'unpaid'
  | 'partial'
  | 'paid'
  | 'cancelled'
  | 'pending'
  | 'active'
  | 'cancelled-warn'
  | 'expired';

/** An EXTRACURRICULAR invoice down to 0 means every item on it was cancelled (and refunded, when previously paid). */
export function isCancelledToZero(invoice: InvoiceDetailDomainModel): boolean {
  return invoice.invoiceType === 'EXTRACURRICULAR' && invoice.totalAmount === 0;
}

/** With several items cancelled, a plain payment-status badge misrepresents the invoice — surface "Đã hủy" instead. */
export function hasManyCancelledItems(invoice: InvoiceDetailDomainModel): boolean {
  if (!invoice.extracurricularItems) return false;
  const cancelledCount = invoice.extracurricularItems.filter(
    item => item.status === 'Cancelled' || item.status === 'Expired'
  ).length;
  return cancelledCount >= 2;
}

export function statusBadgeVariant(
  invoice: InvoiceDetailDomainModel
): 'unpaid' | 'partial' | 'paid' | 'cancelled' {
  if (isCancelledToZero(invoice) || hasManyCancelledItems(invoice)) return 'cancelled';

  if (invoice.invoiceType === 'EXTRACURRICULAR' && invoice.extracurricularItems) {
    const activeItems = invoice.extracurricularItems.filter(
      item => item.status === 'Active' || item.status === 'Pending'
    );
    if (activeItems.length > 0) {
      const allPending = activeItems.every(item => item.status === 'Pending');
      if (allPending) return 'unpaid';
      const allActive = activeItems.every(item => item.status === 'Active');
      if (allActive) return 'paid';
    }
  }

  if (invoice.paymentStatus === 'Paid') return 'paid';
  if (invoice.paymentStatus === 'Partial') return 'partial';
  return 'unpaid';
}

export function statusLabel(invoice: InvoiceDetailDomainModel): string {
  if (isCancelledToZero(invoice)) {
    return invoice.paymentStatus === 'Paid' ? 'Đã hủy & hoàn tiền' : 'Đã hủy';
  }
  if (hasManyCancelledItems(invoice)) return 'Đã hủy';

  if (invoice.invoiceType === 'EXTRACURRICULAR' && invoice.extracurricularItems) {
    const activeItems = invoice.extracurricularItems.filter(
      item => item.status === 'Active' || item.status === 'Pending'
    );
    if (activeItems.length > 0) {
      const allPending = activeItems.every(item => item.status === 'Pending');
      if (allPending) return 'Chưa thanh toán';
      const allActive = activeItems.every(item => item.status === 'Active');
      if (allActive) return 'Đã thanh toán';
    }
  }

  if (invoice.paymentStatus === 'Paid') return 'Đã thanh toán';
  if (invoice.paymentStatus === 'Partial') return 'Thanh toán 1 phần';
  return 'Chưa thanh toán';
}

export function txStatusLabel(status: string): string {
  if (status === 'Success') return 'Thành công';
  if (status === 'Failed') return 'Thất bại';
  return 'Đang xử lý';
}

export function itemBadgeVariant(
  item: ExtracurricularInvoiceItemDomainModel
): 'pending' | 'active' | 'cancelled' | 'cancelled-warn' | 'expired' {
  if (item.status === 'Active') return 'active';
  if (item.status === 'Expired') return 'expired';
  if (item.status === 'Cancelled') {
    const wasEverActivated = !!item.activatedAt;
    if (!wasEverActivated) return 'cancelled';
    return item.feeRefunded ? 'cancelled' : 'cancelled-warn';
  }
  return 'pending';
}

export function itemStatusLabel(item: ExtracurricularInvoiceItemDomainModel): string {
  if (item.status === 'Active') return 'Đang tham gia';
  if (item.status === 'Expired') return 'Đã hết hạn đăng ký';
  if (item.status === 'Cancelled') {
    const wasEverActivated = !!item.activatedAt;
    if (!wasEverActivated) return 'Đã hủy';
    return item.feeRefunded ? 'Đã hủy — đã hoàn phí' : 'Đã hủy — không hoàn phí';
  }
  return 'Đang chờ thanh toán';
}