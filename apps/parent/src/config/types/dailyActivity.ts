export interface DailyActivityApiDto {
  activityId: number;
  studentId: number;
  logDate: string;
  breakfastStatus: string | null;
  lunchStatus: string | null;
  napStatus: string | null;
  snackStatus: string | null;
  hygieneStatus: string | null;
  teacherNote: string | null;
  activityStatus: string | null;
  recordedBy: number | null;
  updatedAt: number;
  teacherName: string | null;
}

export interface DailyActivityDomainModel {
  activityId: number;
  studentId: number;
  logDate: string;
  breakfastStatus: string | null;
  lunchStatus: string | null;
  napStatus: string | null;
  snackStatus: string | null;
  hygieneStatus: string | null;
  teacherNote: string | null;
  activityStatus: string | null;
  recordedBy: number | null;
  updatedAt: bigint;
  teacherName: string | null;
}
