import { apiClient, ApiResponse, SERVER } from '@kindercare/core';
import { DetailedStudentsApiResponse, StudentDetailedDomainModel } from '@/config/types/student';
import { StudentMapper } from './StudentMapper';

class StudentService {
  /**
   * Fetch detailed students for a given class
   */
  async getDetailedStudents(classId: number | string): Promise<StudentDetailedDomainModel[]> {
    const endpoint = SERVER.teacher.getDetailedStudents.replace(':classId', classId.toString());
    const res = await apiClient.get<ApiResponse<DetailedStudentsApiResponse>>(endpoint);
    
    if (!res.data?.success) {
      throw new Error(res.data?.message || 'Failed to fetch detailed students');
    }
    
    const students = res.data.data?.students || [];
    return StudentMapper.toDomainList(students);
  }
}

export const studentService = new StudentService();

