export type MealStatus = 'ALL' | 'HALF' | 'NONE'; // Ăn hết, Ăn 1/2, Không ăn
export type NapStatus = 'GOOD' | 'POOR' | 'NONE'; // Ngủ tốt, Ngủ ít, Không ngủ
export type participationStatus = 'Hòa đồng' | 'Thụ động' | 'Năng động' | 'Không tham gia' | 'Bình thường' | 'ACTIVE' | 'NORMAL' | 'TIRED'; // New dropdown options + old ones

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
  participation: participationStatus;
  activityStatus?: string; // Tích hợp cột mới
  note?: string;
  photoUrl?: string;
}

export interface MenuOfTheDay {
  breakfastMenu: string;
  lunchMenu: string;
  afternoonSnackMenu: string;
}

// Real menu types from database
export interface MenuDetail {
  menuDetailId?: number;
  menuId?: number;
  dayOfWeek: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  mealType: 'Breakfast' | 'Lunch' | 'Snack';
  dishName: string;
  calories?: number;
  nutritionalDetails?: string;
}

export interface ClassMenu {
  menuId: number;
  classId: number;
  weekNumber: number;
  year: number;
  menuName?: string;
  details: MenuDetail[];
}

// Extended MenuOfTheDay with detailed dishes
export interface DetailedMenuOfTheDay extends MenuOfTheDay {
  breakfastDishes?: MenuDetail[];
  lunchDishes?: MenuDetail[];
  snackDishes?: MenuDetail[];
  menuName?: string;
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

export type DayOfWeek =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

export interface WeeklyMenuDay {
  dayOfWeek: DayOfWeek;
  breakfast: MenuDetail[];
  lunch: MenuDetail[];
  snack: MenuDetail[];
}

export interface WeeklyMenuResponse {
  menuName?: string;
  weekNumber?: number;
  year?: number;
  days: WeeklyMenuDay[];
}
