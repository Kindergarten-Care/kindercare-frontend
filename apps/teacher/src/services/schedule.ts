import { apiClient } from '@kindercare/core';

export interface DailyScheduleItem {
  id: number;
  startTime: number;
  endTime: number;
  activityName: string;
  details?: string;
  location?: string;
  activityType: 'pickup' | 'meal' | 'study' | 'nap' | 'play' | 'dropoff' | 'other';
  status: 'Chưa diễn ra' | 'Đang diễn ra' | 'Xong';
}

export interface WeeklyScheduleDetail {
  id: number;
  dayOfWeek: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  startTime: string; // HH:mm
  endTime: string;   // HH:mm
  activityName: string;
  details?: string;
  location?: string;
  activityType: 'pickup' | 'meal' | 'study' | 'nap' | 'play' | 'dropoff' | 'other';
}

export interface WeeklySchedule {
  id: number;
  weekOrder: number;
  weekTheme: string;
  monthTheme: string;
  details: WeeklyScheduleDetail[];
}

export class ScheduleService {
  /**
   * Fetch daily schedule for a class on a specific date.
   */
  public static async getDailySchedule(classId: number | string, timestamp: number): Promise<DailyScheduleItem[]> {
    const res = await apiClient.get(`/teacher/classes/${classId}/schedule`, {
      params: { date: timestamp }
    });
    return res.data?.data || [];
  }

  /**
   * Update the status of a specific daily schedule item.
   */
  public static async updateScheduleStatus(classId: number | string, scheduleId: number | string, status: string): Promise<boolean> {
    await apiClient.put(`/teacher/classes/${classId}/schedule/${scheduleId}/status`, {
      status
    });
    return true;
  }

  /**
   * Fetch weekly schedule for a class on a specific date.
   */
  public static async getWeeklySchedule(classId: number | string, timestamp: number): Promise<WeeklySchedule | null> {
    const res = await apiClient.get(`/teacher/classes/${classId}/schedule/weekly`, {
      params: { date: timestamp }
    });
    return res.data?.data || null;
  }
}
