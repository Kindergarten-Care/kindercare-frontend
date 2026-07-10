import { apiClient, ApiResponse, SERVER } from '@kindercare/core';
import { TeacherClassApiDto, TeacherClassDomainModel } from '@/config/types/class';
import { ClassMapper } from './ClassMapper';

class ClassService {
  /**
   * Fetch all classes assigned to the logged-in teacher.
   */
  async getClasses(): Promise<TeacherClassDomainModel[]> {
    const res = await apiClient.get<ApiResponse<TeacherClassApiDto[]>>(SERVER.teacher.getClasses);

    if (!res.data?.success) {
      throw new Error(res.data?.message || 'Failed to fetch teacher classes');
    }

    const data = res.data.data;
    if (!Array.isArray(data)) return [];

    return ClassMapper.toDomainList(data);
  }
}

export const classService = new ClassService();
