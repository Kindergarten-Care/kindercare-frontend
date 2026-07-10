export interface WeeklyScheduleDetailApiDto {
  scheduleDetailId: number;
  dayOfWeek: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  startTime: string;
  endTime: string;
  activityName: string;
  details: string | null;
  location: string | null;
  activityType: 'pickup' | 'meal' | 'study' | 'nap' | 'play' | 'dropoff' | 'other';
}

export interface WeeklyScheduleApiDto {
  monthlyScheduleId: number;
  month: number;
  year: number;
  monthTheme: string;
  weeklyScheduleId: number | null;
  weekOrder: number | null;
  weekTheme: string | null;
  details: WeeklyScheduleDetailApiDto[];
}

export interface WeeklyScheduleDetailDomainModel {
  scheduleDetailId: number;
  dayOfWeek: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  startTime: string;
  endTime: string;
  activityName: string;
  details: string | null;
  location: string | null;
  activityType: 'pickup' | 'meal' | 'study' | 'nap' | 'play' | 'dropoff' | 'other';
}

export interface WeeklyScheduleDomainModel {
  monthlyScheduleId: number;
  month: number;
  year: number;
  monthTheme: string;
  weeklyScheduleId: number | null;
  weekOrder: number | null;
  weekTheme: string | null;
  details: WeeklyScheduleDetailDomainModel[];
}
