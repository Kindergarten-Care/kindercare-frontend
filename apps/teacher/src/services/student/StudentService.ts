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

  /**
   * Fetch attendance history of a student for a target month (YYYY-MM)
   */
  async getStudentAttendanceHistory(studentId: number | string, month: string): Promise<Array<{ date: string; status: 'PRESENT' | 'PERMISSION_ABSENCE' | 'UNEXCUSED_ABSENCE' }>> {
    const endpoint = SERVER.teacher.getStudentAttendanceHistory.replace(':studentId', studentId.toString());
    const res = await apiClient.get<ApiResponse<Array<{ date: string; status: 'PRESENT' | 'PERMISSION_ABSENCE' | 'UNEXCUSED_ABSENCE' }>>>(
      endpoint,
      { params: { month } }
    );
    
    if (!res.data?.success) {
      throw new Error(res.data?.message || 'Failed to fetch attendance history');
    }
    return res.data.data || [];
  }

  /**
   * Fetch today's medications for a student
   */
  async getStudentMedicationsToday(studentId: number | string): Promise<any[]> {
    const endpoint = SERVER.teacher.getStudentMedicationsToday.replace(':studentId', studentId.toString());
    const res = await apiClient.get<ApiResponse<any[]>>(endpoint);
    
    if (!res.data?.success) {
      throw new Error(res.data?.message || 'Failed to fetch medications today');
    }
    return res.data.data || [];
  }

  /**
   * Update student's nickname and team
   */
  async updateStudentNicknameAndTeam(studentId: number | string, data: { nickname: string | null; team: string | null }): Promise<StudentDetailedDomainModel> {
    const endpoint = SERVER.teacher.updateStudentInfo.replace(':studentId', studentId.toString());
    const res = await apiClient.patch<ApiResponse<any>>(endpoint, data);
    
    if (!res.data?.success) {
      throw new Error(res.data?.message || 'Failed to update student info');
    }
    
    if (!res.data.data) {
      throw new Error('No updated data returned');
    }
    
    // The backend updateStudent service returns a student model that might be detailed or standard.
    // Ensure compatibility by parsing the result.
    return StudentMapper.toDomain(res.data.data);
  }
}

export const studentService = new StudentService();

