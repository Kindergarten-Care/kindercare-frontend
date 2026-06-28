export type ActivityType = 'pickup' | 'meal' | 'study' | 'nap' | 'play' | 'dropoff' | 'other';
export type ActivityStatus = 'Chưa diễn ra' | 'Đang diễn ra' | 'Xong';

export interface DailyScheduleApiDto {
  dailyScheduleId: number;
  classId: number;
  scheduleDate: number;
  startTime: number;
  endTime: number;
  activityName: string;
  details: string | null;
  location: string | null;
  activityType: ActivityType;
  status: ActivityStatus;
}

export interface DailyScheduleDomainModel {
  dailyScheduleId: number;
  classId: number;
  scheduleDate: bigint;
  startTime: bigint;
  endTime: bigint;
  activityName: string;
  details: string | null;
  location: string | null;
  activityType: ActivityType;
  status: ActivityStatus;
}
