'use client';

import React from 'react';
import {
  IconMealBreakfast, IconMealLunch, IconMealSnack,
  IconBook, IconAbc, IconNum, IconMusic, IconArt, IconRun, IconWorld,
  IconClock, IconBus, IconSleep, IconPlay, IconHome, IconWash, IconSun, IconMoon,
} from './icons';
import { WeeklyScheduleDetailDomainModel, WeeklyScheduleDomainModel } from '@/config/types/weeklySchedule';
import { DailyScheduleDomainModel } from '@/config/types/dailySchedule';
import { DailyLessonDomainModel } from '@/config/types/dailyLesson';
import { MenuDomainModel } from '@/config/types/menu';

export interface WeekDayData {
  date: Date;
  isToday: boolean;
  schedule: DailyScheduleDomainModel[];
  lessons: DailyLessonDomainModel[];
  menu: MenuDomainModel | null;
}

export const DOW_LABELS = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6'];
export const DAYS_OF_WEEK_ORDER = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export interface GridItem {
  type: 'header-corner' | 'header-day' | 'session' | 'time' | 'activity' | 'empty';
  label?: string;
  gridRow: string;
  gridCol: string;
  date?: Date;
  isToday?: boolean;
  icon?: string;
  c?: string;
  tint?: string;
  activity?: WeeklyScheduleDetailDomainModel;
}

export function getMealConfig(mealType: string) {
  const t = mealType.trim().toLowerCase();
  if (t.includes('breakfast') || t.includes('sáng')) {
    return { label: 'Bữa sáng', c: '#F97316', tint: '#FFEEDF', Icon: IconMealBreakfast };
  }
  if (t.includes('morningsnack') || t.includes('phụ sáng')) {
    return { label: 'Phụ sáng', c: '#0E8A7D', tint: '#D7F0EC', Icon: IconMealSnack };
  }
  if (t.includes('lunch') || t.includes('trưa')) {
    return { label: 'Bữa trưa', c: '#005A36', tint: '#E6F3ED', Icon: IconMealLunch };
  }
  if (t.includes('snack') || t.includes('xế') || t.includes('afternoonsnack')) {
    return { label: 'Bữa xế', c: '#DB2777', tint: '#FCE7F2', Icon: IconMealSnack };
  }
  return { label: mealType, c: '#6B7280', tint: '#F4F8F5', Icon: IconMealSnack };
}

export const getMealConfigByLabel = (label: string) => getMealConfig(label);

const LESSON_ICON_META: Record<string, { Icon: React.FC<{ size?: number; color?: string }>; c: string; tint: string }> = {
  math:     { Icon: IconNum,   c: '#0E8A7D', tint: '#D7F0EC' },
  science:  { Icon: IconWorld, c: '#005A36', tint: '#E6F3ED' },
  art:      { Icon: IconArt,   c: '#F97316', tint: '#FFEEDF' },
  music:    { Icon: IconMusic, c: '#DB2777', tint: '#FCE7F2' },
  language: { Icon: IconAbc,   c: '#8B5CF6', tint: '#F1ECFE' },
  english:  { Icon: IconAbc,   c: '#2563EB', tint: '#E3EDFD' },
  craft:    { Icon: IconArt,   c: '#8B5CF6', tint: '#F1ECFE' },
  sport:    { Icon: IconRun,   c: '#2563EB', tint: '#E3EDFD' },
};

export const getLessonMeta = (iconType: string) => LESSON_ICON_META[iconType] ?? { Icon: IconBook, c: '#6B7280', tint: '#F4F8F5' };

const TIMETABLE_ICON: Record<string, React.FC<{ size?: number; color?: string }>> = {
  bus: IconBus, meal: IconMealLunch, book: IconBook, play: IconPlay, run: IconRun,
  lunch: IconMealLunch, wash: IconWash, sleep: IconSleep, snack: IconMealSnack,
  art: IconArt, home: IconHome, sun: IconSun, moon: IconMoon,
};

export const getTimetableIcon = (key: string) => TIMETABLE_ICON[key] ?? IconClock;

export const getActivityColorMeta = (type: string) => {
  switch (type) {
    case 'pickup':
    case 'dropoff':
      return { c: '#0E8A7D', tint: '#D7F0EC', icon: 'bus' };
    case 'meal':
      return { c: '#005A36', tint: '#E6F3ED', icon: 'meal' };
    case 'study':
      return { c: '#8B5CF6', tint: '#F1ECFE', icon: 'book' };
    case 'nap':
      return { c: '#DB2777', tint: '#FCE7F2', icon: 'sleep' };
    case 'play':
      return { c: '#F97316', tint: '#FFEEDF', icon: 'play' };
    default:
      return { c: '#6B7280', tint: '#F4F8F5', icon: 'sun' };
  }
};

export function computeGridItems(weeklyTimetable: WeeklyScheduleDomainModel | null, days: WeekDayData[]): GridItem[] {
  if (!weeklyTimetable?.details || weeklyTimetable.details.length === 0) {
    return [];
  }

  // 1. Get unique time boundaries
  const timeBoundaries = Array.from(new Set([
    ...weeklyTimetable.details.map(d => d.startTime),
    ...weeklyTimetable.details.map(d => d.endTime)
  ])).sort();

  // 2. Generate all consecutive intervals
  const intervals: { start: string; end: string }[] = [];
  for (let i = 0; i < timeBoundaries.length - 1; i++) {
    intervals.push({
      start: timeBoundaries[i],
      end: timeBoundaries[i+1]
    });
  }

  const items: GridItem[] = [];

  // Header cells
  items.push({
    type: 'header-corner',
    label: 'Khung giờ',
    gridRow: '1',
    gridCol: '1'
  });

  DAYS_OF_WEEK_ORDER.forEach((day, idx) => {
    items.push({
      type: 'header-day',
      label: DOW_LABELS[idx],
      date: days[idx]?.date,
      isToday: days[idx]?.isToday,
      gridRow: '1',
      gridCol: String(idx + 2)
    });
  });

  let currentGridRow = 2;

  // Group intervals into sessions
  const sessions = [
    {
      label: 'Buổi sáng',
      icon: 'sun',
      c: '#92400E',
      tint: '#FEF3C7',
      filter: (start: string) => start < '11:00:00'
    },
    {
      label: 'Buổi trưa',
      icon: 'meal',
      c: '#9A3412',
      tint: '#FFEDD5',
      filter: (start: string) => start >= '11:00:00' && start < '14:00:00'
    },
    {
      label: 'Buổi chiều',
      icon: 'moon',
      c: '#1E40AF',
      tint: '#EFF6FF',
      filter: (start: string) => start >= '14:00:00'
    }
  ];

  sessions.forEach(session => {
    const sessionIntervals = intervals.filter(int => session.filter(int.start));
    if (sessionIntervals.length === 0) return;

    // Add session banner
    items.push({
      type: 'session',
      label: session.label,
      icon: session.icon,
      c: session.c,
      tint: session.tint,
      gridRow: String(currentGridRow),
      gridCol: '1 / -1'
    });

    const sessionStartRow = currentGridRow + 1;
    currentGridRow = sessionStartRow + sessionIntervals.length;

    // Add time cells for each interval in the session
    const formatTime = (t: string) => t.substring(0, 5);
    sessionIntervals.forEach((int, idx) => {
      items.push({
        type: 'time',
        label: `${formatTime(int.start)} - ${formatTime(int.end)}`,
        gridRow: String(sessionStartRow + idx),
        gridCol: '1'
      });
    });

    // Add activities
    weeklyTimetable.details.forEach(act => {
      // Check if this activity belongs to this session
      if (!session.filter(act.startTime)) return;

      const startIdx = sessionIntervals.findIndex(int => int.start === act.startTime);
      const endIdx = sessionIntervals.findIndex(int => int.end === act.endTime);
      const colIdx = DAYS_OF_WEEK_ORDER.indexOf(act.dayOfWeek);

      if (startIdx !== -1 && endIdx !== -1 && colIdx !== -1) {
        items.push({
          type: 'activity',
          activity: act,
          gridRow: `${sessionStartRow + startIdx} / ${sessionStartRow + endIdx + 1}`,
          gridCol: String(colIdx + 2)
        });
      }
    });

    // Fill in empty cells for this session
    DAYS_OF_WEEK_ORDER.forEach((day, colIdx) => {
      sessionIntervals.forEach((int, rowIdx) => {
        // Check if there is an activity on this day that covers this interval
        const hasActivity = weeklyTimetable.details.some(act => 
          act.dayOfWeek === day && 
          act.startTime <= int.start && 
          act.endTime >= int.end
        );

        if (!hasActivity) {
          items.push({
            type: 'empty',
            gridRow: String(sessionStartRow + rowIdx),
            gridCol: String(colIdx + 2)
          });
        }
      });
    });
  });

  return items;
}

export async function exportTimetableToPDF(studentName: string, weekLabel: string) {
  const printContent = document.getElementById('timetable-pdf-area');
  if (!printContent) return;

  const html2pdf = (await import('html2pdf.js')).default;
  const fileName = `Thoi_Khoa_Bieu_${studentName.replace(/\s+/g, '_')}.pdf`;

  const element = printContent.cloneNode(true) as HTMLElement;
  
  const titleBanner = document.createElement('div');
  titleBanner.innerHTML = `
    <div style="margin-bottom: 20px; text-align: center;">
      <h2 style="margin: 0; font-size: 20px; color: #005A36;">LỊCH SINH HOẠT TUẦN</h2>
      <p style="margin: 5px 0 0; font-size: 14px; color: #4B5563;">Học sinh: ${studentName} - Tuần: ${weekLabel}</p>
    </div>
  `;
  element.insertBefore(titleBanner, element.firstChild);

  const opt = {
    margin:       10,
    filename:     fileName,
    image:        { type: 'jpeg' as const, quality: 0.98 },
    html2canvas:  { scale: 2.5, useCORS: true, logging: false },
    jsPDF:        { unit: 'mm', format: 'a4', orientation: 'landscape' as const }
  };

  html2pdf().from(element).set(opt).save();
}
