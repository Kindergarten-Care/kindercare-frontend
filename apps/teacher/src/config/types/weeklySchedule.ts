export type SchoolDay = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
export type DayOfWeek = SchoolDay | 'Saturday' | 'Sunday';

export type ActivityType = 'pickup' | 'meal' | 'study' | 'nap' | 'play' | 'dropoff' | 'other';

/**
 * WeeklyScheduleDetail (WSD) - 1 row in WeeklyScheduleDetails table.
 * Maps directly to: DayOfWeek, StartTime, EndTime, ActivityName, Details, Location, ActivityType
 */
export interface WeeklyScheduleDetail {
  scheduleDetailId?: number;
  weeklyScheduleId?: number;
  dayOfWeek: SchoolDay;
  startTime: string; // HH:MM or HH:MM:SS
  endTime: string;
  activityName: string;
  activityType: ActivityType;
  details?: string | null;
  location?: string | null;
}

/**
 * WeeklySchedule (WS) - 1 row in WeeklySchedules table.
 */
export interface WeeklySchedule {
  weeklyScheduleId?: number;
  monthlyScheduleId: number;
  weekOrder: number;
  weekTheme: string;
  createdAt?: number;
  updatedAt?: number;
  items: WeeklyScheduleDetail[];
}

/**
 * MonthlySchedule (MS) - 1 row in MonthlySchedules table.
 */
export interface MonthlySchedule {
  monthlyScheduleId?: number;
  classId: number;
  month: number;
  year: number;
  monthTheme: string;
  createdAt?: number;
  updatedAt?: number;
}

export interface WeekInMonth {
  weekOrder: number;
  startDate: string; // DD/MM
  endDate: string; // DD/MM
  label: string; // "Tuần 1 (01/07 - 05/07)"
}

export interface MonthlyScheduleResponse {
  monthlySchedule: MonthlySchedule | null;
  weeks: WeeklySchedule[];
  weeksInMonth: WeekInMonth[];
}

export interface CSVPreviewResult {
  items: (WeeklyScheduleDetail & { weekOrder: number })[];
  errors: string[];
  byWeek: Record<number, (WeeklyScheduleDetail & { weekOrder: number })[]>;
  totalRows: number;
}

export interface CSVImportResult {
  success: number;
  failed: number;
  errors: string[];
}

export const ACTIVITY_TYPE_LABELS: Record<ActivityType, string> = {
  pickup: 'Đón bé',
  meal: 'Ăn uống',
  study: 'Học tập',
  nap: 'Ngủ trưa',
  play: 'Vui chơi',
  dropoff: 'Trả trẻ',
  other: 'Khác',
};

export const ACTIVITY_TYPE_COLORS: Record<ActivityType, string> = {
  pickup: '#3B82F6',
  meal: '#F59E0B',
  study: '#10B981',
  nap: '#8B5CF6',
  play: '#EC4899',
  dropoff: '#6366F1',
  other: '#6B7280',
};

export const DAY_LABELS: Record<DayOfWeek, string> = {
  Monday: 'Thứ 2',
  Tuesday: 'Thứ 3',
  Wednesday: 'Thứ 4',
  Thursday: 'Thứ 5',
  Friday: 'Thứ 6',
  Saturday: 'Thứ 7',
  Sunday: 'Chủ nhật',
};

export const SCHOOL_DAYS: { key: SchoolDay; label: string; short: string }[] = [
  { key: 'Monday', label: 'Thứ 2', short: 'T2' },
  { key: 'Tuesday', label: 'Thứ 3', short: 'T3' },
  { key: 'Wednesday', label: 'Thứ 4', short: 'T4' },
  { key: 'Thursday', label: 'Thứ 5', short: 'T5' },
  { key: 'Friday', label: 'Thứ 6', short: 'T6' },
];