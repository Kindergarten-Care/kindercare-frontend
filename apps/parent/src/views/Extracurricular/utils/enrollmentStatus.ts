import { ExtracurricularEnrollmentDomainModel } from '@/config/types/extracurricular';

export type EnrollmentBadgeVariant =
  | 'pending'
  | 'active'
  | 'cancelled'
  | 'cancelled-warn'
  | 'expired';

export function statusBadgeVariant(en: ExtracurricularEnrollmentDomainModel): EnrollmentBadgeVariant {
  if (en.status === 'Active') return 'active';
  if (en.status === 'Expired') return 'expired';
  if (en.status === 'Cancelled') {
    const wasEverActivated = !!en.activatedAt;
    if (!wasEverActivated) return 'cancelled';
    return en.feeRefunded ? 'cancelled' : 'cancelled-warn';
  }
  return 'pending';
}

export function statusLabel(en: ExtracurricularEnrollmentDomainModel): string {
  if (en.status === 'Active') return 'Đang tham gia';
  if (en.status === 'Expired') return 'Đã hết hạn đăng ký';
  if (en.status === 'Cancelled') {
    const wasEverActivated = !!en.activatedAt;
    if (!wasEverActivated) return 'Đã hủy';
    return en.feeRefunded ? 'Đã hủy — đã hoàn phí' : 'Đã hủy — không hoàn phí';
  }
  return 'Chờ thanh toán';
}