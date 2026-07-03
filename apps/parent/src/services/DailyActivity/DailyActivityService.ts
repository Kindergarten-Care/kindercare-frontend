import { apiClient, ApiResponse, SERVER } from '@kindercare/core';
import { DailyActivityApiDto, DailyActivityDomainModel } from '@/config/types/dailyActivity';

class DailyActivityService {
  async getDailyActivities(studentId: number, date?: number): Promise<DailyActivityDomainModel | null> {
    let url = SERVER.parent.getDailyActivities.replace(':studentId', studentId.toString());
    if (date !== undefined) url += `?date=${date}`;
    const { data: res } = await apiClient.get<ApiResponse<DailyActivityApiDto | null>>(url);
    if (!res.success) throw new Error(res.message);
    if (!res.data) return null;
    return {
      ...res.data,
      updatedAt: BigInt(res.data.updatedAt)
    };
  }
}

export const dailyActivityService = new DailyActivityService();
