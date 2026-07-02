export interface MenuDetailApiDto {
  menuDetailId: number;
  mealType: string;
  dishName: string;
  calories: number | null;
  nutritionalDetails: string | null;
}

export interface MenuApiDto {
  menuId: number;
  classId: number;
  menuDate: number;
  details: MenuDetailApiDto[];
}

export interface MenuDetailDomainModel {
  menuDetailId: number;
  mealType: string;
  dishName: string;
  calories: number | null;
  nutritionalDetails: string | null;
}

export interface MenuDomainModel {
  menuId: number;
  classId: number;
  menuDate: bigint;
  details: MenuDetailDomainModel[];
}
