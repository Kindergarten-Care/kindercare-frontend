import { apiClient, ApiResponse, SERVER } from '@kindercare/core';
import {
  ExtracurricularActivityApiDto,
  ExtracurricularActivityDomainModel,
  ExtracurricularEnrollmentApiDto,
  ExtracurricularEnrollmentDomainModel,
  CreateEnrollmentResult,
  CancelEnrollmentResult,
} from '@/config/types/extracurricular';
import { ExtracurricularMapper } from './ExtracurricularMapper';

class ExtracurricularService {
  async getActivities(): Promise<ExtracurricularActivityDomainModel[]> {
    const { data: res } = await apiClient.get<ApiResponse<ExtracurricularActivityApiDto[]>>(
      SERVER.parent.getExtracurriculars
    );
    if (!res.success) throw new Error(res.message);
    return ExtracurricularMapper.activityToDomainList(res.data);
  }

  async getStudentEnrollments(studentId: number | string, month?: string): Promise<ExtracurricularEnrollmentDomainModel[]> {
    let url = SERVER.parent.getStudentExtracurriculars.replace(':studentId', studentId.toString());
    if (month) url += `?month=${month}`;
    const { data: res } = await apiClient.get<ApiResponse<ExtracurricularEnrollmentApiDto[]>>(url);
    if (!res.success) throw new Error(res.message);
    return ExtracurricularMapper.enrollmentToDomainList(res.data);
  }

  async enroll(studentId: number | string, activityId: number): Promise<CreateEnrollmentResult> {
    const url = SERVER.parent.createExtracurricularEnrollment.replace(':studentId', studentId.toString());
    const { data: res } = await apiClient.post<ApiResponse<CreateEnrollmentResult>>(url, { activityId });
    if (!res.success) throw new Error(res.message);
    return res.data;
  }

  async cancelEnrollment(studentId: number | string, enrollmentId: number | string): Promise<CancelEnrollmentResult> {
    const url = SERVER.parent.cancelExtracurricularEnrollment
      .replace(':studentId', studentId.toString())
      .replace(':enrollmentId', enrollmentId.toString());
    const { data: res } = await apiClient.patch<ApiResponse<CancelEnrollmentResult>>(url);
    if (!res.success) throw new Error(res.message);
    return res.data;
  }
}

export const extracurricularService = new ExtracurricularService();
