import type { DayMeta, SubjectMeta } from '@/config/types/lessonPlan';

// ===== Subjects — dùng cho cả 2 loại types (FE cũ & API) =====
export const SUBJECT_META: Record<string, SubjectMeta> = {
  lang:  { label: 'Làm quen chữ', icon: '🔤', color: '#2563EB', tint: '#E3EDFD' },
  math:  { label: 'Làm quen Toán', icon: '🔢', color: '#0F766E', tint: '#D9F2EC' },
  art:   { label: 'Tạo hình', icon: '🎨', color: '#F97316', tint: '#FFEEDF' },
  music: { label: 'Âm nhạc', icon: '🎵', color: '#8B5CF6', tint: '#F1ECFE' },
  world: { label: 'Khám phá', icon: '🌱', color: '#059669', tint: '#E6F3ED' },
  phys:  { label: 'Vận động', icon: '🤸', color: '#DC2626', tint: '#FEE2E2' },
  other: { label: 'Khác', icon: '📌', color: '#6B7280', tint: '#F3F4F6' },
};

// Alias để giữ tương thích code cũ dùng tên SUBJECTS
export const SUBJECTS = SUBJECT_META;

// ===== Days — mapping day key (FE cũ) <-> DayOfWeek (API) =====
// key: FE cũ (mon/tue/...) | apiDay: API enum (Monday/Tuesday/...)
export const DAYS: Array<DayMeta & { apiDay: string }> = [
  { key: 'mon', apiDay: 'Monday',    name: 'Thứ Hai', short: 'T2' },
  { key: 'tue', apiDay: 'Tuesday',   name: 'Thứ Ba',  short: 'T3' },
  { key: 'wed', apiDay: 'Wednesday', name: 'Thứ Tư',  short: 'T4' },
  { key: 'thu', apiDay: 'Thursday',  name: 'Thứ Năm', short: 'T5' },
  { key: 'fri', apiDay: 'Friday',    name: 'Thứ Sáu', short: 'T6' },
];

export function feKeyToApiDay(key: string): string {
  return DAYS.find((d) => d.key === key)?.apiDay ?? 'Monday';
}

export function apiDayToFeKey(apiDay: string): string {
  return DAYS.find((d) => d.apiDay === apiDay)?.key ?? 'mon';
}

// Helper: lấy meta theo tên subject (fallback về 'other')
export function getSubjectMeta(subject: string): SubjectMeta {
  return SUBJECT_META[subject] ?? SUBJECT_META.other;
}