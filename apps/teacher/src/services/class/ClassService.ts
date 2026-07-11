import { apiClient, ApiResponse, SERVER } from '@kindercare/core';
import { TeacherClassApiDto, TeacherClassDomainModel, TeacherActiveClassResponseDto } from '@/config/types/class';
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

  /**
   * Fetch the teacher's active class (the one belonging to the active AcademicYear).
   * Returns null when teacher has no assigned class in the active year.
   */
  async getMyActiveClass(): Promise<TeacherActiveClassResponseDto | null> {
    try {
      const res = await apiClient.get<ApiResponse<TeacherActiveClassResponseDto>>(
        SERVER.teacher.getMyActiveClass
      );

      if (!res.data?.success) return null;
      return res.data.data ?? null;
    } catch (error) {
      console.warn('Failed to fetch my-active-class:', error);
      return null;
    }
  }
}

export const classService = new ClassService();
