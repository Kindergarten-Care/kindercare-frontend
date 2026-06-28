import { apiClient, ApiResponse, SERVER } from '@kindercare/core';
import { ScheduleApiDto, ScheduleDomainModel } from '@/config/types/schedule';
import { ScheduleMapper } from './ScheduleMapper';

class ScheduleService {
  /**
   * Fetch schedule for a given class and date
   * @param classId The class ID
   * @param dateSeconds Unix timestamp (seconds)
   */
  async getSchedule(classId: number | string, dateSeconds?: number): Promise<ScheduleDomainModel[]> {
    const endpoint = SERVER.teacher.getSchedule.replace(':classId', classId.toString());
    const params = dateSeconds ? { date: dateSeconds } : {};
    
    const res = await apiClient.get<ApiResponse<ScheduleApiDto[]>>(endpoint, { params });
    
    if (!res.data?.success) {
      throw new Error(res.data?.message || 'Failed to fetch schedule');
    }
    
    return ScheduleMapper.toDomainList(res.data.data);
  }

  /**
   * Update the status of a specific daily schedule
   * @param classId The class ID
   * @param scheduleId The schedule ID
   * @param completed Whether the schedule is completed
   */
  async updateScheduleStatus(classId: number | string, scheduleId: number | string, completed: boolean): Promise<boolean> {
    const endpoint = `/teacher/classes/${classId}/schedule/${scheduleId}/status`;
    const res = await apiClient.put<ApiResponse<any>>(endpoint, { completed });
    
    return res.data?.success || false;
  }
}


export const scheduleService = new ScheduleService();
