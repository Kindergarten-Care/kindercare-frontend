import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient, ApiResponse } from '@kindercare/core';
import type { StudentDetailedDomainModel } from '@/config/types/student';
import type { TeacherClassApiDto, TeacherClassDomainModel } from '@/config/types/class';
import { WorkHistoryDomainModel } from '@/config/types/profile';
import { LeaveRequest, LeaveRequestStatus } from '@/config/types/attendance';
import { LeaveRequestService } from '@/services/LeaveRequest/LeaveRequestService';


interface DashboardStats {
  totalStudents: number;
  presentToday: number;
  absentToday: number;
  pendingLeaveRequests: number;
  pendingMedicalRequests: number;
  weeklyRewardCount: number;
}

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['teacherDashboard'],
    queryFn: async (): Promise<DashboardStats> => {
      const res = await apiClient.get<ApiResponse<DashboardStats>>('/teacher/dashboard');
      return res.data.data ?? {
        totalStudents: 0,
        presentToday: 0,
        absentToday: 0,
        pendingLeaveRequests: 0,
        pendingMedicalRequests: 0,
        weeklyRewardCount: 0,
      };
    },
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};
