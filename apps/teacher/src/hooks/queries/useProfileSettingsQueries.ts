import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient, ApiResponse } from '@kindercare/core';
import type { StudentDetailedDomainModel } from '@/config/types/student';
import type { TeacherClassApiDto, TeacherClassDomainModel } from '@/config/types/class';
import { WorkHistoryDomainModel } from '@/config/types/profile';
import { LeaveRequest, LeaveRequestStatus } from '@/config/types/attendance';
import { LeaveRequestService } from '@/services/LeaveRequest/LeaveRequestService';


interface TeacherSettings {
  pushEnabled: boolean;
  emailEnabled: boolean;
  weeklyReportEnabled: boolean;
}

export const useTeacherSettings = () => {
  return useQuery({
    queryKey: ['teacherSettings'],
    queryFn: async (): Promise<TeacherSettings> => {
      const res = await apiClient.get<ApiResponse<TeacherSettings>>('/teacher/settings');
      return res.data.data ?? {
        pushEnabled: true,
        emailEnabled: true,
        weeklyReportEnabled: false,
      };
    },
    staleTime: 10 * 60 * 1000,
  });
};

export const useUpdateSettings = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (settings: Partial<TeacherSettings>) => {
      await apiClient.patch('/teacher/settings', settings);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teacherSettings'] });
    },
  });
};
