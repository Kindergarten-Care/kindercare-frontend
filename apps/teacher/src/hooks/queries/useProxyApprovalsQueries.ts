import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient, ApiResponse } from '@kindercare/core';
import type { StudentDetailedDomainModel } from '@/config/types/student';
import type { TeacherClassApiDto, TeacherClassDomainModel } from '@/config/types/class';
import { WorkHistoryDomainModel } from '@/config/types/profile';
import { LeaveRequest, LeaveRequestStatus } from '@/config/types/attendance';
import { LeaveRequestService } from '@/services/LeaveRequest/LeaveRequestService';


interface ProxyApproval {
  authorizationId: number;
  studentId: number;
  studentName: string;
  studentAvatar: string | null;
  proxyName: string;
  proxyPhone: string;
  proxyIdCard: string;
  proxyPhotoUrl: string | null;
  authorizationDate: number;
  type: string;
  notes: string;
  status: string;
  createdAt: number;
}

export const useProxyApprovals = () => {
  return useQuery({
    queryKey: ['proxyApprovals'],
    queryFn: async (): Promise<ProxyApproval[]> => {
      const res = await apiClient.get<ApiResponse<ProxyApproval[]>>('/teacher/proxy-approvals');
      return res.data.data || [];
    },
    staleTime: 1 * 60 * 1000,
  });
};

export const useUpdateProxyApproval = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ authorizationId }: { authorizationId: number }) => {
      await apiClient.patch('/teacher/proxy-approvals', { authorizationId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['proxyApprovals'] });
    },
  });
};
