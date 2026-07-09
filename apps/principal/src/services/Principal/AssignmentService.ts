import { apiClient, ApiResponse, SERVER } from '@kindercare/core';

export class AssignmentService {
  async assignTeacherToClass(classId: number, teacherId: number, roleInClass: string, assignedDate?: number): Promise<void> {
    const { data: res } = await apiClient.post<ApiResponse<null>>(SERVER.principal.assignTeacher, {
      classId,
      teacherId,
      roleInClass,
      assignedDate
    });
    if (!res.success) {
      throw new Error(res.message);
    }
  }

  async assignStudentsToClass(studentIds: number[], classId: number): Promise<void> {
    const { data: res } = await apiClient.post<ApiResponse<null>>(SERVER.principal.assignStudents, {
      studentIds,
      classId
    });
    if (!res.success) {
      throw new Error(res.message);
    }
  }

  async endAcademicYear(): Promise<any> {
    const { data: res } = await apiClient.post<ApiResponse<any>>(SERVER.principal.endAcademicYear, {});
    if (!res.success) {
      throw new Error(res.message);
    }
    return res.data;
  }

  async startAcademicYear(payload: { yearName: string, startDate: number, endDate: number, monthlyTuition: number, dailyMealFee: number, isActive?: boolean }): Promise<any> {
    const { data: res } = await apiClient.post<ApiResponse<any>>(SERVER.principal.startAcademicYear, payload);
    if (!res.success) {
      throw new Error(res.message);
    }
    return res.data;
  }
}

export const assignmentService = new AssignmentService();
