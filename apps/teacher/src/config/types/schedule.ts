export interface ScheduleApiDto {
  dailyScheduleId: number;
  classId: number;
  scheduleDate: number; // Unix timestamp seconds
  startTime: string; // Time string e.g., "08:00:00"
  endTime: string;
  activityName: string;
  details: string;
  location: string;
  activityType: string;
  status: string;
}

export interface ScheduleDomainModel {
  dailyScheduleId: number;
  classId: number;
  scheduleDate: bigint;
  startTime: string; // Keep as "HH:mm" for UI display
  endTime: string;
  activityName: string;
  details: string;
  location: string;
  activityType: string;
  status: string;
}
