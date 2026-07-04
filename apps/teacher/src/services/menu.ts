import { apiClient } from '@kindercare/core';

export interface MenuDetail {
  id?: number;
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

export class MenuService {
  /**
   * Fetch class menu for a specific date (which determines the week).
   * @param classId The ID of the class
   * @param timestamp The Unix timestamp in seconds for the target date
   */
  public static async getClassMenu(classId: number | string, timestamp: number): Promise<ClassMenu | null> {
    const res = await apiClient.get(`/teacher/classes/${classId}/menu`, {
      params: { date: timestamp }
    });
    return res.data?.data || null;
  }

  /**
   * Update the class menu details.
   */
  public static async updateClassMenu(
    classId: number | string,
    menuId: number,
    details: MenuDetail[]
  ): Promise<boolean> {
    await apiClient.put(`/teacher/classes/${classId}/menu`, {
      menuId,
      details,
    });
    return true;
  }
}
