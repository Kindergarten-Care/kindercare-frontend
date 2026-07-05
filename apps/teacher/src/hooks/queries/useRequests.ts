import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { LeaveRequestService } from '../../services/leave-requests';
import { MedicalRequestService, MedicalRequest } from '../../services/medical-requests';
import { LeaveRequest, LeaveRequestStatus } from '@/config/types/attendance';

export const useLeaveRequests = () => {
  return useQuery<LeaveRequest[]>({
    queryKey: ['leaveRequests'],
    queryFn: () => LeaveRequestService.getAllLeaveRequests(),
  });
};

export const useLeaveRequestDetail = (requestId: string) => {
  return useQuery<LeaveRequest | null>({
    queryKey: ['leaveRequest', requestId],
    queryFn: () => LeaveRequestService.getLeaveRequestDetail(requestId),
    enabled: !!requestId,
  });
};

export const useProcessLeaveRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ requestId, status }: { requestId: string; status: LeaveRequestStatus }) => 
      LeaveRequestService.processLeaveRequest(requestId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leaveRequests'] });
      // We could also invalidate the specific leaveRequest detail if we want
    },
  });
};

export const useClassMedicalRequests = (classId: number | string, timestamp?: number) => {
  return useQuery<MedicalRequest[]>({
    queryKey: ['medicalRequests', classId, timestamp],
    queryFn: () => MedicalRequestService.getClassMedicalRequests(classId, timestamp),
    enabled: !!classId,
  });
};

export const useProcessMedicalRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ requestId, status, teacherNote }: { requestId: string; status: string; teacherNote?: string }) => 
      MedicalRequestService.processMedicalRequest(requestId, status, teacherNote),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medicalRequests'] });
    },
  });
};
