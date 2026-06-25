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
}

export const scheduleService = new ScheduleService();
