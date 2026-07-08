export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
export type SchoolDay = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
export type ActivityType = 'pickup' | 'meal' | 'study' | 'nap' | 'play' | 'dropoff' | 'other';

export interface MonthlySchedule {
  monthlyScheduleId: number;
  classId: number;
  month: number;
  year: number;
  monthTheme: string;
  approvedStatus: number; // 0 = Draft, 1 = Approved
  isActive: boolean;
  createdAt?: number;
  updatedAt?: number;
  weeks?: WeeklySchedule[];
}

export interface WeeklySchedule {
  weeklyScheduleId: number;
  monthlyScheduleId: number;
  weekOrder: number;
  weekTheme: string;
  status: number; // 0 = Draft, 1 = Submitted, 2 = Approved
  createdAt?: number;
  updatedAt?: number;
  items: WeeklyScheduleDetail[];
}

export interface WeeklyScheduleDetail {
  scheduleDetailId?: number;
  dayOfWeek: DayOfWeek;
  startTime: string;
  endTime: string;
  activityName: string;
  activityType: ActivityType;
  details?: string | null;
  location?: string | null;
  orderIndex?: number;
}

export interface WeekInfo {
  order: number;
  startDate: Date;
  endDate: Date;
  label: string; // e.g. "Tuần 1: 01/07 - 04/07/2026"
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

export const STATUS_LABELS: Record<number, string> = {
  0: 'Nháp',
  1: 'Đã gửi duyệt',
  2: 'Đã duyệt',
};

export const STATUS_COLORS: Record<number, string> = {
  0: '#6B7280',
  1: '#F59E0B',
  2: '#10B981',
};
