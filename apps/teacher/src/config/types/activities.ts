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
}

export interface StudentActivityRecord {
  studentId: string;
  studentName: string;
  studentAvatar?: string;
  nap: NapStatus;
  participation: ParticipationStatus;
  note?: string;
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
