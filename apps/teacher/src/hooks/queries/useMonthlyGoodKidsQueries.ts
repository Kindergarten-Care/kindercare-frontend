import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient, ApiResponse } from '@kindercare/core';
import type { StudentDetailedDomainModel } from '@/config/types/student';
import type { TeacherClassApiDto, TeacherClassDomainModel } from '@/config/types/class';
import { WorkHistoryDomainModel } from '@/config/types/profile';
import { LeaveRequest, LeaveRequestStatus } from '@/config/types/attendance';
import { LeaveRequestService } from '@/services/LeaveRequest/LeaveRequestService';


interface MonthlyGoodKid {
  studentId: number;
  studentName: string;
  avatarUrl: string | null;
  reason: string;
  month: number;
  year: number;
}

export const useMonthlyGoodKids = (year: number, month: number) => {
  return useQuery({
    queryKey: ['monthlyGoodKids', year, month],
    queryFn: async (): Promise<MonthlyGoodKid[]> => {
      const res = await apiClient.get<ApiResponse<MonthlyGoodKid[]>>(
        `/teacher/monthly-good-kids?year=${year}&month=${month}`
      );
      return res.data.data || [];
    },
    staleTime: 5 * 60 * 1000,
  });
};
