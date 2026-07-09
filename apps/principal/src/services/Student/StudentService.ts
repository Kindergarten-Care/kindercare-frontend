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

  async addParentToStudent(studentId: number | string, payload: any): Promise<any> {
    const url = SERVER.principal.addParentToStudent.replace(':id', String(studentId));
    const { data: res } = await apiClient.post<ApiResponse<any>>(url, payload);
    if (!res.success) {
      throw new Error(res.message);
    }
    return res.data;
  }

  async getUnassignedStudents(): Promise<any[]> {
    const { data: res } = await apiClient.get<ApiResponse<any[]>>(SERVER.principal.getUnassignedStudents);
    if (!res.success) {
      throw new Error(res.message);
    }
    return res.data;
  }

  async getPaymentConfigs(): Promise<any> {
    const { data: res } = await apiClient.get<ApiResponse<any>>(SERVER.principal.getPaymentConfigs);
    if (!res.success) {
      throw new Error(res.message);
    }
    return res.data;
  }

  async getAllStudents(): Promise<any[]> {
    const { data: res } = await apiClient.get<ApiResponse<any[]>>(SERVER.principal.getStudents);
    if (!res.success) {
      throw new Error(res.message);
    }
    return res.data;
  }

  async enrollStudent(data: any): Promise<any> {
    const { data: res } = await apiClient.post<ApiResponse<any>>(SERVER.principal.enrollStudent, data);
    if (!res.success) {
      throw new Error(res.message);
    }
    return res.data;
  }

  async importStudents(file: File): Promise<any> {
    const formData = new FormData();
    formData.append('file', file);
    const { data: res } = await apiClient.post<ApiResponse<any>>(
      SERVER.principal.importStudents, 
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    if (!res.success) {
      throw new Error(res.message);
    }
    return res.data;
  }
}

export const studentService = new StudentService();
