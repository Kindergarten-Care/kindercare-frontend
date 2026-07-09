export function formatVND(amount: number): string {
  return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
}

/** "08-2026" -> "Tháng 8/2026" */
export function formatBillingMonth(billingMonth: string): string {
  const [month, year] = billingMonth.split('-');
  return `Tháng ${parseInt(month, 10)}/${year}`;
}

export function formatUnixDate(ts: number | null | undefined): string {
  if (!ts) return '--';
  return new Date(ts * 1000).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export function formatUnixDateTime(ts: number | null | undefined): string {
  if (!ts) return '--';
  return new Date(ts * 1000).toLocaleString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export interface DueStatus {
  label: string;
  variant: 'ok' | 'soon' | 'overdue' | 'none';
}

/** Computes a human-readable due-date badge, independent of push reminders. */
export function getDueStatus(dueDate: number | null, paymentStatus: string): DueStatus {
  if (paymentStatus === 'Paid') return { label: '', variant: 'none' };
  if (!dueDate) return { label: '', variant: 'none' };

  const now = Math.floor(Date.now() / 1000);
  const diffDays = Math.ceil((dueDate - now) / 86400);

  if (diffDays < 0) return { label: `Quá hạn ${Math.abs(diffDays)} ngày`, variant: 'overdue' };
  if (diffDays === 0) return { label: 'Hạn đóng: hôm nay', variant: 'soon' };
  if (diffDays <= 3) return { label: `Còn ${diffDays} ngày`, variant: 'soon' };
  return { label: `Hạn: ${formatUnixDate(dueDate)}`, variant: 'ok' };
}
