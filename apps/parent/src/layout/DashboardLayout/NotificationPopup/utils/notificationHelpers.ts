export const TYPE_LABEL: Record<string, string> = {
  ATTENDANCE:         'Điểm danh',
  CHECKIN:            'Điểm danh',
  CHECKOUT:           'Điểm danh',
  LEAVE_REQUEST:      'Đơn nghỉ',
  HEALTH_ALERT:       'Sức khỏe',
  MEDICATION:         'Dặn thuốc',
  MEDICATION_REQUEST: 'Dặn thuốc',
  MEDICAL_REQUEST:    'Dặn thuốc',
  MEDICINE:           'Dặn thuốc',
  MEDICINE_REQUEST:   'Dặn thuốc',
};

export function relativeTime(ts: number, isVi: boolean): string {
  const diff = Math.floor(Date.now() / 1000) - ts;
  if (diff < 60)    return isVi ? 'Vừa xong'                          : 'Just now';
  if (diff < 3600)  return isVi ? `${Math.floor(diff / 60)} phút trước`  : `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return isVi ? `${Math.floor(diff / 3600)} giờ trước` : `${Math.floor(diff / 3600)}h ago`;
  return               isVi ? `${Math.floor(diff / 86400)} ngày trước` : `${Math.floor(diff / 86400)}d ago`;
}

export const NOTIF_TABS = [
  { id: 'all',        labelVi: 'Tất cả',    labelEn: 'All' },
  { id: 'attendance', labelVi: 'Điểm danh', labelEn: 'Attendance' },
  { id: 'requests',   labelVi: 'Đơn từ',    labelEn: 'Requests' },
  { id: 'others',     labelVi: 'Khác',      labelEn: 'Others' },
] as const;

export type NotifTab = typeof NOTIF_TABS[number]['id'];

const ATTENDANCE_TYPES = ['ATTENDANCE', 'CHECKIN', 'CHECKOUT'];
const REQUEST_TYPES    = ['LEAVE_REQUEST', 'MEDICATION', 'MEDICATION_REQUEST', 'MEDICAL_REQUEST', 'MEDICINE', 'MEDICINE_REQUEST'];

export function filterByTab<T extends { type: string }>(items: T[], tab: NotifTab): T[] {
  if (tab === 'all')        return items;
  if (tab === 'attendance') return items.filter(i => ATTENDANCE_TYPES.includes(i.type));
  if (tab === 'requests')   return items.filter(i => REQUEST_TYPES.includes(i.type));
  if (tab === 'others')     return items.filter(i => !ATTENDANCE_TYPES.includes(i.type) && !REQUEST_TYPES.includes(i.type));
  return items;
}
