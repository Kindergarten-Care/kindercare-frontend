import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient, ApiResponse } from '@kindercare/core';
import type { StudentDetailedDomainModel } from '@/config/types/student';
import type { TeacherClassApiDto, TeacherClassDomainModel } from '@/config/types/class';
import { WorkHistoryDomainModel } from '@/config/types/profile';
import { LeaveRequest, LeaveRequestStatus } from '@/config/types/attendance';
import { LeaveRequestService } from '@/services/LeaveRequest/LeaveRequestService';


export const useTeacherWorkHistory = () => {
  return useQuery({
    queryKey: ['teacherWorkHistory'],
    queryFn: async (): Promise<WorkHistoryDomainModel[]> => {
      const res = await apiClient.get<ApiResponse<WorkHistoryDomainModel[]>>('/teacher/work-history');
      return res.data.data || [];
    },
    staleTime: 10 * 60 * 1000,
  });
};
