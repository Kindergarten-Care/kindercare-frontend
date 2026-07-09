import { DAYS, SUBJECTS } from './constants';
import type { DayKey, LessonPlanItem } from '@/config/types/lessonPlan';

const DAY_INDEX: Record<DayKey, number> = {
  mon: 1,
  tue: 2,
  wed: 3,
  thu: 4,
  fri: 5,
};

export function getTodayKey(): DayKey {
  const dow = new Date().getDay();
  if (dow === 0 || dow === 6) return 'fri';
  const keys: DayKey[] = ['mon', 'tue', 'wed', 'thu', 'fri'];
  return keys[dow - 1];
}

export function getWeekLabel(weekOffset: number): string {
  if (weekOffset === 0) return 'Tuần này';
  if (weekOffset === 1) return 'Tuần sau';
  if (weekOffset === -1) return 'Tuần trước';
  return `Tuần ${weekOffset > 0 ? '+' : ''}${weekOffset}`;
}

export function getWeekStartDate(weekOffset: number): Date {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const currentDow = today.getDay();
  const diffToMonday = currentDow === 0 ? -6 : 1 - currentDow;
  const monday = new Date(today);
  monday.setDate(today.getDate() + diffToMonday + weekOffset * 7);
  return monday;
}

export function getWeekDates(weekOffset: number): string[] {
  const start = getWeekStartDate(weekOffset);
  return DAYS.map((_, i) => {
    const dt = new Date(start);
    dt.setDate(start.getDate() + i);
    const day = String(dt.getDate()).padStart(2, '0');
    const month = String(dt.getMonth() + 1).padStart(2, '0');
    return `${day}/${month}`;
  });
}

export function exportLessonPlanCsv(lessons: LessonPlanItem[], className: string): void {
  const rows: string[][] = [['Ngày', 'Giờ', 'Lĩnh vực', 'Bài học', 'Trạng thái', 'Ghi chú']];
  const dayName = Object.fromEntries(DAYS.map((d) => [d.key, d.name])) as Record<DayKey, string>;

  [...lessons]
    .sort((a, b) => DAY_INDEX[a.day] - DAY_INDEX[b.day] || a.time.localeCompare(b.time))
    .forEach((lesson) => {
      rows.push([
        dayName[lesson.day],
        lesson.time,
        SUBJECTS[lesson.subject].label,
        lesson.title,
        lesson.done ? 'Đã soạn' : 'Đang soạn',
        lesson.note,
      ]);
    });

  const csv = '\ufeff' + rows.map((row) => row.map((cell) => `"${cell || ''}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `giao-an-tuan-${className.replace(/\s+/g, '-').toLowerCase()}.csv`;
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}
