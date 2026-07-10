export interface MenuDetailApiDto {
  menuDetailId: number;
  dayOfWeek: string;
  mealType: string;
  dishName: string;
  calories: number | null;
  nutritionalDetails: string | null;
}

export interface MenuApiDto {
  menuId: number;
  classId: number;
  menuDate: number;
  weekNumber: number;
  year: number;
  menuName: string | null;
  details: MenuDetailApiDto[];
}

export interface MenuDetailDomainModel {
  menuDetailId: number;
  dayOfWeek: string;
  mealType: string;
  dishName: string;
  calories: number | null;
  nutritionalDetails: string | null;
}

export interface MenuDomainModel {
  menuId: number;
  classId: number;
  menuDate: bigint;
  weekNumber: number;
  year: number;
  menuName: string | null;
  details: MenuDetailDomainModel[];
}
