import { apiClient, ApiResponse } from '@kindercare/core';
import { GradeDomainModel } from '@/config/types/grade';

class GradeService {
  async getGradesAndClasses(): Promise<GradeDomainModel[]> {
    const { data: res } = await apiClient.get<ApiResponse<GradeDomainModel[]>>(
      '/principal/grades-classes'
    );
    if (!res.success) {
      throw new Error(res.message);
    }
    return res.data;
  }

  async createGradeAndClasses(payload: { gradeName: string; classes?: string[] }): Promise<void> {
    const { data: res } = await apiClient.post<ApiResponse<any>>(
      '/principal/grades-classes',
      payload
    );
    if (!res.success) {
      throw new Error(res.message);
    }
  }
}

export const gradeService = new GradeService();
