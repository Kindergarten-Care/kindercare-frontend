import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient, ApiResponse } from '@kindercare/core';
import type { StudentDetailedDomainModel } from '@/config/types/student';
import type { TeacherClassApiDto, TeacherClassDomainModel } from '@/config/types/class';
import { WorkHistoryDomainModel } from '@/config/types/profile';
import { LeaveRequest, LeaveRequestStatus } from '@/config/types/attendance';
import { LeaveRequestService } from '@/services/LeaveRequest/LeaveRequestService';


export const useUploadAvatar = () => {
  return useMutation({
    mutationFn: async (file: File): Promise<string> => {
      const formData = new FormData();
      formData.append('file', file);
      const res = await apiClient.post<ApiResponse<{ url: string }>>('/upload', formData);
      return res.data.data?.url || '';
    },
  });
};

export const useUpdateAvatar = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ avatarUrl, fullName }: { avatarUrl: string; fullName?: string }) => {
      await apiClient.patch('/teacher/profile', {
        avatarUrl,
        fullName,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teacherProfile'] });
    },
  });
};
