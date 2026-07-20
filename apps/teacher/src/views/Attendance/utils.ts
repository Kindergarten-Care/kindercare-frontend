import { Student } from '../../config/types/attendance';
import { GRADS, ST, StatusKey } from './constants';

export const getAvatarGrad = (name: string) => {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return GRADS[h % GRADS.length];
};

export const getStatusKey = (s: Student): StatusKey => {
  if (s.attendanceStatus === 'PRESENT') return 'present';
  if (s.attendanceStatus === 'PERMISSION_ABSENCE') return 'excused';
  if (s.attendanceStatus === 'UNEXCUSED_ABSENCE') return 'unexcused';
  return 'absent';
};

export const formatDateStr = (ms: number) => {
  const d = new Date(ms);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

export const exportAttendanceCSV = (students: Student[], className: string) => {
  const rows = [['Mã HS', 'Học sinh', 'Trạng thái', 'Giờ đến', 'Ghi chú']];
  students.forEach(s => {
    const key = getStatusKey(s);
    rows.push([
      s.id.substring(0, 8),
      s.name,
      ST[key].label,
      s.arrivalTime && s.arrivalTime !== '--:--' ? s.arrivalTime : '',
      s.healthNote || s.leaveRequestReason || '',
    ]);
  });
  const csv = '﻿' + rows.map(r => r.map(c => '"' + String(c ?? '').replace(/"/g, '""') + '"').join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `diem-danh-lop-${className || 'lop'}.csv`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
};

export const buildWeekTrend = (rate: number) => {
  const todayDow = new Date().getDay();
  const weekRaw = [
    { dow: 'T2', pct: todayDow === 1 ? rate : 95, off: false },
    { dow: 'T3', pct: todayDow === 2 ? rate : 90, off: false },
    { dow: 'T4', pct: todayDow === 3 ? rate : 100, off: false },
    { dow: 'T5', pct: todayDow === 4 ? rate : 85, off: false },
    { dow: 'T6', pct: todayDow === 5 ? rate : 92, off: false },
    { dow: 'T7', pct: 0, off: true },
    { dow: 'CN', pct: 0, off: true },
  ];

  return weekRaw.map((w, i) => {
    const activeDay = i === (todayDow === 0 ? 6 : todayDow - 1);
    const isOff = w.off;
    const h = isOff ? 6 : Math.max(10, (w.pct / 100) * 88);
    const barBg = isOff ? '#EEF4F0' : (activeDay ? 'linear-gradient(180deg, #00794A, #005A36)' : '#A7C9B6');
    return { ...w, pctText: isOff ? '–' : `${w.pct}%`, h, barBg, activeDay };
  });
};

export type CalendarCell = {
  day: number;
  weekend: boolean;
  isToday: boolean;
  isFuture: boolean;
  kind: 'none' | 'full' | 'some' | 'high';
} | null;

export const buildCalendarCells = (year: number, month: number): CalendarCell[] => {
  const first = new Date(year, month, 1);
  const startDow = (first.getDay() + 6) % 7;
  const days = new Date(year, month + 1, 0).getDate();
  const todayZero = new Date();
  todayZero.setHours(0, 0, 0, 0);

  const cells: CalendarCell[] = [];
  for (let i = 0; i < startDow; i++) cells.push(null);
  for (let d = 1; d <= days; d++) {
    const date = new Date(year, month, d);
    const dow = (date.getDay() + 6) % 7;
    const weekend = dow >= 5;
    const isToday = date.getTime() === todayZero.getTime();
    const isFuture = date.getTime() > todayZero.getTime();

    let kind: 'none' | 'full' | 'some' | 'high' = 'none';
    if (!weekend && !isFuture) {
      const r = (d * 13 + month * 7) % 100;
      if (r < 8) kind = 'high';
      else if (r < 26) kind = 'some';
      else kind = 'full';
    }
    cells.push({ day: d, weekend, isToday, isFuture, kind });
  }
  return cells;
};

export const calKindColor = { full: '#005A36', some: '#D97706', high: '#DC2626', none: 'transparent' };
