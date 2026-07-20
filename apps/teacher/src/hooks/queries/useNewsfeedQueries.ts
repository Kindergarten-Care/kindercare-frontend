import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient, ApiResponse } from '@kindercare/core';
import type { StudentDetailedDomainModel } from '@/config/types/student';
import type { TeacherClassApiDto, TeacherClassDomainModel } from '@/config/types/class';
import { WorkHistoryDomainModel } from '@/config/types/profile';
import { LeaveRequest, LeaveRequestStatus } from '@/config/types/attendance';
import { LeaveRequestService } from '@/services/LeaveRequest/LeaveRequestService';


export interface CreateNewsfeedPayload {
  classId: number | string;
  content: string;
  mediaUrl?: string;
}

export const useCreateNewsfeed = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateNewsfeedPayload) => {
      await apiClient.post(`/teacher/classes/${payload.classId}/newsfeeds`, { content: payload.content, mediaUrl: payload.mediaUrl });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['newsfeeds', variables.classId] });
    },
  });
};

interface NewsfeedItem {
  id: number;
  content: string;
  mediaUrl?: string;
  teacherName: string;
  teacherAvatar?: string;
  createdAt: number;
}

export const useNewsfeeds = (classId?: number | string) => {
  return useQuery({
    queryKey: ['newsfeeds', classId],
    queryFn: async (): Promise<NewsfeedItem[]> => {
      const url = classId ? `/teacher/classes/${classId}/newsfeeds` : '/teacher/newsfeeds';
      const res = await apiClient.get<ApiResponse<any[]>>(url);
      return res.data.data || [];
    },
    enabled: !!classId,
    staleTime: 30 * 1000,
  });
};

export const useDeleteNewsfeed = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ postId }: { classId?: number | string; postId: number | string }) => {
      await apiClient.delete(`/teacher/newsfeeds/${postId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['newsfeeds'] });
    },
  });
};

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
