import { DayOfWeek } from './scheduleApproval';

export type MealType = 'Breakfast' | 'Lunch' | 'Snack';

export interface MenuDto {
  id: number;
  classId: number;
  className: string;
  weekNumber: number;
  year: number;
  menuName: string;
  createdAt: number;
  updatedAt: number;
}

export interface MenuFilters {
  classId?: number;
  year?: number;
  weekNumber?: number;
}

export interface MenuDetailItemDto {
  id: number;
  menuId: number;
  dayOfWeek: DayOfWeek;
  mealType: MealType;
  dishName: string;
  calories: number | null;
  nutritionalDetails: string | null;
}

export interface MenuDetailDto extends MenuDto {
  menuDetails: MenuDetailItemDto[];
}

export interface ImportMenuFileResultDto {
  filename: string;
  success: boolean;
  menuId?: number;
  message?: string;
}
