import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient, ApiResponse } from '@kindercare/core';
import type { StudentDetailedDomainModel } from '@/config/types/student';
import type { TeacherClassApiDto, TeacherClassDomainModel } from '@/config/types/class';
import { WorkHistoryDomainModel } from '@/config/types/profile';
import { LeaveRequest, LeaveRequestStatus } from '@/config/types/attendance';
import { LeaveRequestService } from '@/services/LeaveRequest/LeaveRequestService';


interface MenuItem {
  id: number;
  mealType: string; // breakfast, lunch, snack, dinner
  dishes: string[];
  notes?: string;
}

interface DailyMenu {
  date: string;
  items: MenuItem[];
}

export const useClassMenu = (classId: number | string | undefined, date?: string) => {
  return useQuery({
    queryKey: ['classMenu', classId, date],
    queryFn: async (): Promise<DailyMenu[]> => {
      const params: Record<string, string> = {};
      if (date) params.date = date;
      const res = await apiClient.get<ApiResponse<DailyMenu[]>>(
        `/teacher/classes/${classId}/menu`,
        { params }
      );
      return res.data.data || [];
    },
    enabled: !!classId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};
