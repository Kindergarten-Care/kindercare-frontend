import { apiClient, ApiResponse, SERVER } from '@kindercare/core';
import { AssessmentApiDto, AssessmentDomainModel } from '@/config/types/assessment';
import { AssessmentMapper } from './AssessmentMapper';

class AssessmentService {
  async getAssessments(studentId: number | string, month?: string): Promise<AssessmentDomainModel[]> {
    let url = SERVER.parent.getAssessments.replace(':studentId', studentId.toString());
    if (month !== undefined) url += `?month=${month}`;
    const { data: res } = await apiClient.get<ApiResponse<AssessmentApiDto[]>>(url);
    if (!res.success) throw new Error(res.message);
    return AssessmentMapper.toDomainList(res.data);
  }
}

export const assessmentService = new AssessmentService();
