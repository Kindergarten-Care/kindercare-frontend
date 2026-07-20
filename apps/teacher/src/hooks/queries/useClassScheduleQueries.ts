import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient, ApiResponse } from '@kindercare/core';
import type { StudentDetailedDomainModel } from '@/config/types/student';
import type { TeacherClassApiDto, TeacherClassDomainModel } from '@/config/types/class';
import { WorkHistoryDomainModel } from '@/config/types/profile';
import { LeaveRequest, LeaveRequestStatus } from '@/config/types/attendance';
import { LeaveRequestService } from '@/services/LeaveRequest/LeaveRequestService';


interface ScheduleItem {
  id: number;
  timeSlot: string;
  subject: string;
  activityName: string;
  teacherName?: string;
  notes?: string;
}

interface DailySchedule {
  date: string;
  items: ScheduleItem[];
}

export const useClassSchedule = (classId: number | string | undefined, date?: string) => {
  return useQuery({
    queryKey: ['classSchedule', classId, date],
    queryFn: async (): Promise<DailySchedule[]> => {
      const params: Record<string, string> = {};
      if (date) params.date = date;
      const res = await apiClient.get<ApiResponse<DailySchedule[]>>(
        `/teacher/classes/${classId}/schedule`,
        { params }
      );
      return res.data.data || [];
    },
    enabled: !!classId,
    staleTime: 5 * 60 * 1000,
  });
};
