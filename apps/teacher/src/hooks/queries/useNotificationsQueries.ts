import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient, ApiResponse } from '@kindercare/core';
import type { StudentDetailedDomainModel } from '@/config/types/student';
import type { TeacherClassApiDto, TeacherClassDomainModel } from '@/config/types/class';
import { WorkHistoryDomainModel } from '@/config/types/profile';
import { LeaveRequest, LeaveRequestStatus } from '@/config/types/attendance';
import { LeaveRequestService } from '@/services/LeaveRequest/LeaveRequestService';


interface NotificationItem {
  id: number;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: number;
  type: string;
}

export const useNotifications = () => {
  return useQuery({
    queryKey: ['teacherNotifications'],
    queryFn: async (): Promise<NotificationItem[]> => {
      const res = await apiClient.get<ApiResponse<NotificationItem[]>>('/teacher/notifications');
      return res.data.data || [];
    },
    staleTime: 30 * 1000, // 30 seconds
  });
};
