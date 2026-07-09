import { apiClient, ApiResponse, SERVER } from '@kindercare/core';
import { StudentDetailApiDto, StudentDetailDomainModel } from '@/config/types/student';
import { StudentMapper } from './StudentMapper';

class StudentService {
  async getStudentDetail(id: number | string): Promise<StudentDetailDomainModel> {
    const url = SERVER.principal.getStudentDetail.replace(':id', String(id));
    const { data: res } = await apiClient.get<ApiResponse<StudentDetailApiDto>>(url);
    if (!res.success) {
      throw new Error(res.message);
    }
    return StudentMapper.toStudentDetailDomain(res.data);
  }

  async getUnassignedStudents(): Promise<any[]> {
    const { data: res } = await apiClient.get<ApiResponse<any[]>>(SERVER.principal.getUnassignedStudents);
    if (!res.success) {
      throw new Error(res.message);
    }
    return res.data;
  }
}

export const studentService = new StudentService();
