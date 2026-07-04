const PENDING_DEADLINE_SECONDS = 48 * 60 * 60;

export interface PendingDeadline {
  expired: boolean;
  label: string;
}

/** Enrollments left `Pending` for 48h past creation are auto-cancelled by a BE cron. */
export function getPendingDeadline(createdAt: number): PendingDeadline {
  const deadline = createdAt + PENDING_DEADLINE_SECONDS;
  const now = Math.floor(Date.now() / 1000);
  const remaining = deadline - now;

  if (remaining <= 0) {
    return { expired: true, label: 'Có thể đã bị hủy tự động (quá 48 giờ chưa thanh toán)' };
  }

  const hours = Math.floor(remaining / 3600);
  const minutes = Math.floor((remaining % 3600) / 60);
  if (hours >= 1) {
    return { expired: false, label: `Thanh toán trong ${hours} giờ ${minutes} phút để giữ đăng ký` };
  }
  return { expired: false, label: `Thanh toán trong ${minutes} phút để giữ đăng ký` };
}
