export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export type ScheduleActivityType = 'pickup' | 'meal' | 'study' | 'nap' | 'play' | 'dropoff' | 'other';

export interface MonthlyScheduleDto {
  id: number;
  classId: number;
  className: string;
  gradeName: string;
  month: number;
  year: number;
  monthTheme: string;
  approvedStatus: 0 | 1;
  isActive: 0 | 1;
  createdAt: number;
  updatedAt: number;
}

export interface MonthlyScheduleFilters {
  year?: number;
  month?: number;
  approvedStatus?: 0 | 1;
  classId?: number;
}

export interface WeeklyScheduleItemDto {
  scheduleDetailId: number;
  weeklyScheduleId: number;
  dayOfWeek: DayOfWeek;
  startTime: string;
  endTime: string;
  activityName: string;
  details: string | null;
  location: string | null;
  activityType: ScheduleActivityType;
}

export interface WeeklyScheduleDto {
  weeklyScheduleId: number;
  monthlyScheduleId: number;
  weekOrder: number;
  weekTheme: string;
  createdAt: number;
  updatedAt: number;
  items: WeeklyScheduleItemDto[];
}

export interface MonthlyScheduleDetailDto extends MonthlyScheduleDto {
  weeks: WeeklyScheduleDto[];
}

export interface ApproveMonthlySchedulePayload {
  approvedStatus: 0 | 1;
}
