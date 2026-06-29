import { apiClient, ApiResponse, SERVER } from '@kindercare/core';
import { DailyLessonApiDto, DailyLessonDomainModel } from '@/config/types/dailyLesson';
import { DailyLessonMapper } from './DailyLessonMapper';

class DailyLessonService {
  async getDailyLessons(studentId: number | string, date?: number): Promise<DailyLessonDomainModel[]> {
    let url = SERVER.parent.getDailyLessons.replace(':studentId', studentId.toString());
    if (date !== undefined) url += `?date=${date}`;
    const { data: res } = await apiClient.get<ApiResponse<DailyLessonApiDto[]>>(url);
    if (!res.success) throw new Error(res.message);
    return DailyLessonMapper.toDomainList(res.data);
  }
}

export const dailyLessonService = new DailyLessonService();
