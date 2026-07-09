import { useQuery } from '@tanstack/react-query';
import { apiClient, ApiResponse } from '@kindercare/core';
import type { StudentDetailedDomainModel } from '@/config/types/student';
import type { TeacherClassApiDto, TeacherClassDomainModel } from '@/config/types/class';

interface DetailedStudentsResponse {
  classId: number;
  totalStudents: number;
  students: StudentDetailedDomainModel[];
}

function toDomain(api: TeacherClassApiDto): TeacherClassDomainModel {
  const name = api.className ?? '';
  const parts = name.split(/\s+/);
  const initials = parts
    .filter(Boolean)
    .map((p) => p[0]?.toUpperCase() ?? '')
    .join('');

  return {
    classId: api.classId,
    className: name,
    yearId: api.yearId,
    displayName: name ? `Lớp ${name}` : 'Lớp không tên',
    classInitial: initials || 'LC',
    studentCount: api.studentCount ?? 0,
  };
}

/**
 * Fetch all classes assigned to the current teacher
 * GET /teacher/classes
 */
export const useTeacherClasses = () => {
  return useQuery({
    queryKey: ['teacherClasses'],
    queryFn: async (): Promise<TeacherClassDomainModel[]> => {
      const res = await apiClient.get<ApiResponse<TeacherClassApiDto[]>>('/teacher/classes');
      const data = res.data.data ?? [];
      return data.map(toDomain);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Fetch detailed students for a specific class
 * GET /teacher/classes/:classId/detailed-students
 */
export const useDetailedStudents = (classId: number | string | undefined) => {
  return useQuery({
    queryKey: ['detailedStudents', classId],
    queryFn: async (): Promise<DetailedStudentsResponse> => {
      const res = await apiClient.get<ApiResponse<DetailedStudentsResponse>>(
        `/teacher/classes/${classId}/detailed-students`
      );
      return res.data.data ?? { classId: 0, totalStudents: 0, students: [] };
    },
    enabled: !!classId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

/**
 * Fetch all students (basic) for a specific class
 * GET /teacher/classes/:classId/students
 */
export const useClassStudents = (classId: number | string | undefined) => {
  return useQuery({
    queryKey: ['classStudents', classId],
    queryFn: async (): Promise<{ studentId: number; fullName: string; avatarUrl: string | null }[]> => {
      const res = await apiClient.get<ApiResponse<any[]>>(`/teacher/classes/${classId}/students`);
      return res.data.data || [];
    },
    enabled: !!classId,
    staleTime: 2 * 60 * 1000,
  });
};
