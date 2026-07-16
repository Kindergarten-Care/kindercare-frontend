import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient, ApiResponse } from '@kindercare/core';
import type { StudentDetailedDomainModel } from '@/config/types/student';
import type { TeacherClassApiDto, TeacherClassDomainModel } from '@/config/types/class';
import { WorkHistoryDomainModel } from '@/config/types/profile';
import { LeaveRequest, LeaveRequestStatus } from '@/config/types/attendance';
import { LeaveRequestService } from '@/services/LeaveRequest/LeaveRequestService';


export const useChangePassword = () => {
  return useMutation({
    mutationFn: async ({
      current,
      new: newPassword,
    }: {
      current: string;
      new: string;
    }) => {
      await apiClient.post('/teacher/auth/change-password', {
        currentPassword: current,
        newPassword,
      });
    },
  });
};
