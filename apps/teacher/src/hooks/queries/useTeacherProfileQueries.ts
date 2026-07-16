import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient, ApiResponse } from '@kindercare/core';
import type { StudentDetailedDomainModel } from '@/config/types/student';
import type { TeacherClassApiDto, TeacherClassDomainModel } from '@/config/types/class';
import { WorkHistoryDomainModel } from '@/config/types/profile';
import { LeaveRequest, LeaveRequestStatus } from '@/config/types/attendance';
import { LeaveRequestService } from '@/services/LeaveRequest/LeaveRequestService';

export interface DetailedStudentsResponse {
  classId: number;
  totalStudents: number;
  students: StudentDetailedDomainModel[];
}

interface TeacherProfile {
  teacherId: number;
  fullName: string;
  email: string;
  phone: string;
  avatarUrl: string | null;
  dateOfBirth: number | null;
  address: string | null;
  hireDate: number | null;
  specialization: string | null;
  idCard?: string;
  professionalRank?: string;
}

export const useTeacherProfile = () => {
  return useQuery({
    queryKey: ['teacherProfile'],
    queryFn: async (): Promise<TeacherProfile> => {
      const res = await apiClient.get<ApiResponse<TeacherProfile>>('/teacher/profile');
      return res.data.data ?? {
        teacherId: 0,
        fullName: '',
        email: '',
        phone: '',
        avatarUrl: null,
        dateOfBirth: null,
        address: null,
        hireDate: null,
        specialization: null,
      };
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
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
