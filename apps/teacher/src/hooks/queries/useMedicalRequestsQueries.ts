import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient, ApiResponse } from '@kindercare/core';
import type { StudentDetailedDomainModel } from '@/config/types/student';
import type { TeacherClassApiDto, TeacherClassDomainModel } from '@/config/types/class';
import { WorkHistoryDomainModel } from '@/config/types/profile';
import { LeaveRequest, LeaveRequestStatus } from '@/config/types/attendance';
import { LeaveRequestService } from '@/services/LeaveRequest/LeaveRequestService';


interface MedicalRequest {
  requestId: number;
  studentId: number;
  studentName: string;
  parentId: number;
  parentName: string;
  requestDate: string;
  medicineDetails: string;
  dosage: string;
  frequency: string;
  timeToTake?: string;
  parentNote?: string;
  medicineImageUrl?: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Completed' | 'Done' | 'Skipped';
  teacherNote?: string;
}

export const useMedicalRequests = (classId?: number | string, status?: string) => {
  return useQuery({
    queryKey: ['medicalRequests', classId, status],
    queryFn: async (): Promise<MedicalRequest[]> => {
      const params: Record<string, string> = {};
      if (status) params.status = status;
      const url = classId
        ? `/teacher/classes/${classId}/medical-requests`
        : '/teacher/classes/0/medical-requests';
      const res = await apiClient.get<ApiResponse<MedicalRequest[]>>(url, { params });
      return res.data.data || [];
    },
    enabled: !!classId,
    staleTime: 1 * 60 * 1000,
  });
};

export const useUpdateMedicalRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      requestId,
      status,
      teacherNote,
    }: {
      requestId: number;
      status: 'Completed' | 'Skipped' | 'Approved' | 'Rejected';
      teacherNote?: string;
    }) => {
      await apiClient.put(`/teacher/medical-requests/${requestId}`, { status, teacherNote });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medicalRequests'] });
    },
  });
};
