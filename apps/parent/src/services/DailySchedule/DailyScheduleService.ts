import { apiClient, ApiResponse, SERVER } from '@kindercare/core';
import { DailyScheduleApiDto, DailyScheduleDomainModel } from '@/config/types/dailySchedule';
import { DailyScheduleMapper } from './DailyScheduleMapper';

class DailyScheduleService {
  async getDailySchedule(studentId: number | string, date?: number): Promise<DailyScheduleDomainModel[]> {
    let url = SERVER.parent.getDailySchedule.replace(':studentId', studentId.toString());
    if (date !== undefined) url += `?date=${date}`;
    const { data: res } = await apiClient.get<ApiResponse<DailyScheduleApiDto[]>>(url);
    if (!res.success) throw new Error(res.message);
    return DailyScheduleMapper.toDomainList(res.data ?? []);
  }
}

export const dailyScheduleService = new DailyScheduleService();
