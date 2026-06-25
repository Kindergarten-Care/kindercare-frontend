import { apiClient, ApiResponse, SERVER } from '@kindercare/core';
import { StudentDetailedApiDto, StudentDetailedDomainModel } from '@/config/types/student';
import { StudentMapper } from './StudentMapper';

class StudentService {
  /**
   * Fetch detailed students for a given class
   */
  async getDetailedStudents(classId: number | string): Promise<StudentDetailedDomainModel[]> {
    const endpoint = SERVER.teacher.getDetailedStudents.replace(':classId', classId.toString());
    const res = await apiClient.get<ApiResponse<StudentDetailedApiDto[]>>(endpoint);
    
    if (!res.data?.success) {
      throw new Error(res.data?.message || 'Failed to fetch detailed students');
    }
    
    return StudentMapper.toDomainList(res.data.data);
  }
}

export const studentService = new StudentService();
