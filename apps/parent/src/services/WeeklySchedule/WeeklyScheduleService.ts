import { apiClient, ApiResponse, SERVER } from '@kindercare/core';
import { WeeklyScheduleApiDto, WeeklyScheduleDomainModel } from '@/config/types/weeklySchedule';
import { WeeklyScheduleMapper } from './WeeklyScheduleMapper';

class WeeklyScheduleService {
  async getWeeklyTimetable(studentId: number, date?: number): Promise<WeeklyScheduleDomainModel | null> {
    const url = SERVER.parent.getWeeklyTimetable.replace(':studentId', String(studentId));
    const { data: res } = await apiClient.get<ApiResponse<WeeklyScheduleApiDto | null>>(url, {
      params: date ? { date } : {}
    });
    if (!res.success) {
      throw new Error(res.message);
    }
    return res.data ? WeeklyScheduleMapper.toDomain(res.data) : null;
  }
}

export const weeklyScheduleService = new WeeklyScheduleService();
