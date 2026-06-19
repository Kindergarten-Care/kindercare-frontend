import { apiClient, ApiResponse, SERVER } from '@kindercare/core';
import { StudentApiDto, StudentDomainModel } from '@/config/types/student';
import { StudentMapper } from '@/services/Student/StudentMapper';

class StudentService {
  async getChildren(): Promise<StudentDomainModel[]> {
    const { data: res } = await apiClient.get<ApiResponse<StudentApiDto[]>>(SERVER.parent.getChildren);
    if (!res.success) {
      throw new Error(res.message);
    }
    return StudentMapper.toDomainList(res.data);
  }
}

export const studentService = new StudentService();
