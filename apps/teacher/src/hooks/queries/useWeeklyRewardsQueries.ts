import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient, ApiResponse } from '@kindercare/core';
import type { StudentDetailedDomainModel } from '@/config/types/student';
import type { TeacherClassApiDto, TeacherClassDomainModel } from '@/config/types/class';
import { WorkHistoryDomainModel } from '@/config/types/profile';
import { LeaveRequest, LeaveRequestStatus } from '@/config/types/attendance';
import { LeaveRequestService } from '@/services/LeaveRequest/LeaveRequestService';


interface WeeklyReward {
  rewardId: number;
  studentId: number;
  studentName: string;
  badge: string;
  reason: string;
  awardedAt: number;
  awardedBy: number;
}

export const useWeeklyRewards = (classId?: number | string, weekStartDate?: string) => {
  return useQuery({
    queryKey: ['weeklyRewards', classId, weekStartDate],
    queryFn: async (): Promise<WeeklyReward[]> => {
      const params: Record<string, string> = {};
      if (weekStartDate) params.weekStartDate = weekStartDate;
      const url = classId
        ? `/teacher/classes/${classId}/weekly-rewards`
        : '/teacher/classes/0/weekly-rewards';
      const res = await apiClient.get<ApiResponse<WeeklyReward[]>>(url, { params });
      return res.data.data || [];
    },
    enabled: !!classId,
    staleTime: 2 * 60 * 1000,
  });
};

export const useAwardWeeklyRewards = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      classId,
      rewards,
    }: {
      classId: number | string;
      rewards: Array<{ studentId: number; badge: string; reason: string }>;
    }) => {
      await apiClient.post(`/teacher/classes/${classId}/weekly-rewards`, { rewards });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['weeklyRewards', variables.classId] });
    },
  });
};
