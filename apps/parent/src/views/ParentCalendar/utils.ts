import React from 'react';
import { EventDomainModel, EventType, HolidayDomainModel } from '@/config/types/event';
import {
  IconStar,
  IconFlag,
  IconUsers,
  IconCake,
} from './icons';

// ─── Types ──────────────────────────────────────────────────────────────────

/** View-side category, one per backend `eventType`. */
export type EventCategory = 'school' | 'holiday' | 'class' | 'student';

export interface CalendarEventModel {
  eventId: string;
  title: string;
  category: EventCategory;
  /** Day-level start date. */
  startDate: Date;
  /** Inclusive day-level end date for multi-day events. */
  endDate?: Date;
  /** Display time range, e.g. "08:00 - 10:00". Absent for all-day events. */
  time?: string;
  location?: string;
  description?: string;
}

/** From the Holidays table (billing's source of truth) — independent from CalendarEventModel of category 'holiday'. */
export interface CalendarHolidayModel {
  holidayId: string;
  holidayName: string | null;
  date: Date;
}

export interface CalendarCellData {
  date: Date;
  inMonth: boolean;
  isToday: boolean;
  isWeekend: boolean;
  events: CalendarEventModel[];
  holidays: CalendarHolidayModel[];
}

// ─── Category meta (color + icon + label) ───────────────────────────────────

interface CategoryMeta {
  label: string;
  c: string;
  tint: string;
  Icon: React.FC<{ size?: number; color?: string }>;
}

export const EVENT_CATEGORIES: Record<EventCategory, CategoryMeta> = {
  'school': { label: 'Sự kiện trường', c: '#005A36', tint: '#E6F3ED', Icon: IconStar },
  'holiday': { label: 'Nghỉ lễ', c: '#DC2626', tint: '#FEE2E2', Icon: IconFlag },
  'class': { label: 'Sự kiện lớp', c: '#2563EB', tint: '#DBEAFE', Icon: IconUsers },
  'student': { label: 'Sự kiện của bé', c: '#DB2777', tint: '#FCE7F3', Icon: IconCake },
};

export const CATEGORY_ORDER: EventCategory[] = ['school', 'holiday', 'class', 'student'];

export const getCategoryMeta = (category: EventCategory): CategoryMeta =>
  EVENT_CATEGORIES[category] ?? EVENT_CATEGORIES['school'];

const CATEGORY_BY_EVENT_TYPE: Record<EventType, EventCategory> = {
  School: 'school',
  Holiday: 'holiday',
  Class: 'class',
  Student: 'student',
};

// ─── Date helpers ───────────────────────────────────────────────────────────

export const WEEKDAY_LABELS = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

export const DOW_FULL_LABELS = [
  'Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy',
];

export const MS_PER_DAY = 24 * 3600 * 1000;

export const startOfDay = (d: Date): Date =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate());

/** Whole days from today to `date`: 0 for today, negative for the past. */
export const daysFromToday = (date: Date): number =>
  Math.round((startOfDay(date).getTime() - startOfDay(new Date()).getTime()) / MS_PER_DAY);

export const sameDay = (a: Date, b: Date): boolean =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

export const pad = (n: number): string => String(n).padStart(2, '0');

export const formatDayMonth = (d: Date): string =>
  `${pad(d.getDate())}/${pad(d.getMonth() + 1)}`;

/** YYYY-MM-DD (local) for API query params. */
export const toDateParam = (d: Date): string =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

export const formatFullDate = (d: Date): string =>
  `${DOW_FULL_LABELS[d.getDay()]}, ${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;

const formatTime = (d: Date): string => `${pad(d.getHours())}:${pad(d.getMinutes())}`;

/** Convert an API event into the calendar's view model. */
export const toCalendarEvent = (e: EventDomainModel): CalendarEventModel => {
  const multiDay = !sameDay(e.startTime, e.endTime);
  // Midnight starts (and multi-day spans) read as all-day events — no time row.
  const allDay = multiDay || (e.startTime.getHours() === 0 && e.startTime.getMinutes() === 0);

  let time: string | undefined;
  if (!allDay) {
    const start = formatTime(e.startTime);
    const end = formatTime(e.endTime);
    time = start === end ? start : `${start} - ${end}`;
  }

  return {
    eventId: String(e.eventId),
    title: e.title,
    category: CATEGORY_BY_EVENT_TYPE[e.eventType] ?? 'school',
    startDate: startOfDay(e.startTime),
    endDate: multiDay ? startOfDay(e.endTime) : undefined,
    time,
    location: e.location ?? undefined,
    description: e.description ?? undefined,
  };
};

/** Convert an API holiday (single-day marker, no time range) into the calendar's view model. */
export const toCalendarHoliday = (h: HolidayDomainModel): CalendarHolidayModel => ({
  holidayId: String(h.holidayId),
  holidayName: h.holidayName,
  date: startOfDay(h.holidayDate),
});

/** Whether `day` is the holiday's date. */
export const holidayCoversDay = (holiday: CalendarHolidayModel, day: Date): boolean =>
  sameDay(holiday.date, day);

/** Number of days an event spans, inclusive of both ends. */
export const eventDaySpan = (event: CalendarEventModel): number =>
  Math.round(
    (startOfDay(event.endDate ?? event.startDate).getTime() - startOfDay(event.startDate).getTime()) / MS_PER_DAY,
  ) + 1;

/** Whether `day` falls within the event's [startDate, endDate] day range. */
export const eventCoversDay = (event: CalendarEventModel, day: Date): boolean => {
  const start = startOfDay(event.startDate).getTime();
  const end = startOfDay(event.endDate ?? event.startDate).getTime();
  const t = startOfDay(day).getTime();
  return t >= start && t <= end;
};

/** Display date range of an event, e.g. "05/07" or "05/07 - 07/07". */
export const formatEventRange = (event: CalendarEventModel): string => {
  if (!event.endDate || sameDay(event.startDate, event.endDate)) {
    return formatDayMonth(event.startDate);
  }
  return `${formatDayMonth(event.startDate)} - ${formatDayMonth(event.endDate)}`;
};

/**
 * Full Monday-first grid of the month view: leading days from the previous
 * month and trailing days from the next month to fill complete weeks.
 */
export const getMonthGridDates = (year: number, month: number): { date: Date; inMonth: boolean }[] => {
  const firstOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prefix = (firstOfMonth.getDay() + 6) % 7; // Monday-first offset

  const cells: { date: Date; inMonth: boolean }[] = [];
  for (let i = prefix; i > 0; i--) {
    cells.push({ date: new Date(year, month, 1 - i), inMonth: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ date: new Date(year, month, d), inMonth: true });
  }
  while (cells.length % 7 !== 0) {
    const last = cells[cells.length - 1].date;
    cells.push({ date: new Date(last.getFullYear(), last.getMonth(), last.getDate() + 1), inMonth: false });
  }
  return cells;
};
