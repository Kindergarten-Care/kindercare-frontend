export type MealStatus = 'ALL' | 'HALF' | 'NONE'; // Ăn hết, Ăn 1/2, Không ăn
export type NapStatus = 'GOOD' | 'POOR' | 'NONE'; // Ngủ tốt, Ngủ ít, Không ngủ
export type ParticipationStatus = 'ACTIVE' | 'NORMAL' | 'TIRED'; // Năng nổ, Bình thường, Mệt mỏi

export interface StudentMealRecord {
  studentId: string;
  studentName: string;
  studentAvatar?: string;
  breakfast: MealStatus;
  lunch: MealStatus;
  afternoonSnack: MealStatus;
  note?: string;
  photoUrl?: string;
}

export interface StudentActivityRecord {
  studentId: string;
  studentName: string;
  studentAvatar?: string;
  nap: NapStatus;
  participation: ParticipationStatus;
  note?: string;
  photoUrl?: string;
}

export interface MenuOfTheDay {
  breakfastMenu: string;
  lunchMenu: string;
  afternoonSnackMenu: string;
}

export interface ScheduleItem {
  id: string;
  timeSlot: string;
  activityName: string;
  completed: boolean;
  classPhoto?: string;
}

export interface WeeklyScheduleDetail {
  id: string;
  dayOfWeek: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  startTime: string; // "HH:mm:ss"
  endTime: string;   // "HH:mm:ss"
  activityName: string;
  details?: string;
  location?: string;
  activityType: 'pickup' | 'meal' | 'study' | 'nap' | 'play' | 'dropoff' | 'other';
}

export interface WeeklyScheduleResponse {
  monthTheme: string;
  weekTheme: string;
  details: WeeklyScheduleDetail[];
}
