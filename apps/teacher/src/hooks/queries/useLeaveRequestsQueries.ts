import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient, ApiResponse } from '@kindercare/core';
import type { StudentDetailedDomainModel } from '@/config/types/student';
import type { TeacherClassApiDto, TeacherClassDomainModel } from '@/config/types/class';
import { WorkHistoryDomainModel } from '@/config/types/profile';
import { LeaveRequest, LeaveRequestStatus } from '@/config/types/attendance';
import { LeaveRequestService } from '@/services/LeaveRequest/LeaveRequestService';



export const useLeaveRequests = (status?: string) => {
  return useQuery<LeaveRequest[]>({
    queryKey: ['leaveRequests', status],
    queryFn: () => LeaveRequestService.getAllLeaveRequests(status),
    staleTime: 1 * 60 * 1000,
  });
};

export const useUpdateLeaveRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      requestId,
      status,
    }: {
      requestId: number;
      status: LeaveRequestStatus;
    }) => {
      return LeaveRequestService.processLeaveRequest(String(requestId), status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leaveRequests'] });
    },
  });
};
