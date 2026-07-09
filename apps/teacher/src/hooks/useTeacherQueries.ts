import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient, ApiResponse } from '@kindercare/core';
import type { StudentDetailedDomainModel } from '@/config/types/student';
import type { TeacherClassApiDto, TeacherClassDomainModel } from '@/config/types/class';

interface DetailedStudentsResponse {
  classId: number;
  totalStudents: number;
  students: StudentDetailedDomainModel[];
}

function toDomain(api: TeacherClassApiDto): TeacherClassDomainModel {
  const name = api.className ?? '';
  const parts = name.split(/\s+/);
  const initials = parts
    .filter(Boolean)
    .map((p) => p[0]?.toUpperCase() ?? '')
    .join('');

  return {
    classId: api.classId,
    className: name,
    yearId: api.yearId,
    displayName: name ? `Lớp ${name}` : 'Lớp không tên',
    classInitial: initials || 'LC',
    studentCount: api.studentCount ?? 0,
  };
}

/**
 * Fetch all classes assigned to the current teacher
 * GET /teacher/classes
 */
export const useTeacherClasses = () => {
  return useQuery({
    queryKey: ['teacherClasses'],
    queryFn: async (): Promise<TeacherClassDomainModel[]> => {
      const res = await apiClient.get<ApiResponse<TeacherClassApiDto[]>>('/teacher/classes');
      const data = res.data.data ?? [];
      return data.map(toDomain);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Fetch detailed students for a specific class
 * GET /teacher/classes/:classId/detailed-students
 */
export const useDetailedStudents = (classId: number | string | undefined) => {
  return useQuery({
    queryKey: ['detailedStudents', classId],
    queryFn: async (): Promise<DetailedStudentsResponse> => {
      const res = await apiClient.get<ApiResponse<DetailedStudentsResponse>>(
        `/teacher/classes/${classId}/detailed-students`
      );
      return res.data.data ?? { classId: 0, totalStudents: 0, students: [] };
    },
    enabled: !!classId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

/**
 * Fetch all students (basic) for a specific class
 * GET /teacher/classes/:classId/students
 */
export const useClassStudents = (classId: number | string | undefined) => {
  return useQuery({
    queryKey: ['classStudents', classId],
    queryFn: async (): Promise<{ studentId: number; fullName: string; avatarUrl: string | null }[]> => {
      const res = await apiClient.get<ApiResponse<any[]>>(`/teacher/classes/${classId}/students`);
      return res.data.data || [];
    },
    enabled: !!classId,
    staleTime: 2 * 60 * 1000,
  });
};

// ─── Dashboard ────────────────────────────────────────────────────────────────

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

// ─── Notifications ────────────────────────────────────────────────────────────

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

// ─── Leave Requests ───────────────────────────────────────────────────────────

interface LeaveRequest {
  requestId: number;
  studentId: number;
  studentName: string;
  reason: string;
  startDate: number;
  endDate: number;
  status: 'Pending' | 'Approved' | 'Rejected';
  parentNote?: string;
  createdAt: number;
}

export const useLeaveRequests = (status?: string) => {
  return useQuery({
    queryKey: ['leaveRequests', status],
    queryFn: async (): Promise<LeaveRequest[]> => {
      const params: Record<string, string> = {};
      if (status) params.status = status;
      const res = await apiClient.get<ApiResponse<LeaveRequest[]>>('/teacher/leave-requests', { params });
      return res.data.data || [];
    },
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
      status: 'Approved' | 'Rejected';
    }) => {
      await apiClient.patch(`/teacher/leave-requests/${requestId}/status`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leaveRequests'] });
    },
  });
};

// ─── Medical Requests ──────────────────────────────────────────────────────────

interface MedicalRequest {
  medRequestId: number;
  studentId: number;
  studentName: string;
  parentName: string;
  medicineDetails: string;
  dosage: string;
  frequency: string;
  scheduledDate: number;
  status: 'Pending' | 'Done' | 'Skipped';
  parentNote?: string;
  createdAt: number;
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
    staleTime: 1 * 60 * 1000,
  });
};

export const useUpdateMedicalRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      requestId,
      status,
    }: {
      requestId: number;
      status: 'Done' | 'Skipped';
    }) => {
      await apiClient.patch(`/teacher/medical-requests/${requestId}`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medicalRequests'] });
    },
  });
};

// ─── Weekly Rewards ───────────────────────────────────────────────────────────

interface WeeklyReward {
  rewardId: number;
  studentId: number;
  studentName: string;
  badge: string;
  reason: string;
  awardedAt: number;
  awardedBy: number;
}

export const useWeeklyRewards = (classId?: number | string, weekStartDate?: string) => {
  return useQuery({
    queryKey: ['weeklyRewards', classId, weekStartDate],
    queryFn: async (): Promise<WeeklyReward[]> => {
      const params: Record<string, string> = {};
      if (weekStartDate) params.weekStartDate = weekStartDate;
      const url = classId
        ? `/teacher/classes/${classId}/weekly-rewards`
        : '/teacher/classes/0/weekly-rewards';
      const res = await apiClient.get<ApiResponse<WeeklyReward[]>>(url, { params });
      return res.data.data || [];
    },
    staleTime: 2 * 60 * 1000,
  });
};

export const useAwardWeeklyRewards = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      classId,
      rewards,
    }: {
      classId: number | string;
      rewards: Array<{ studentId: number; badge: string; reason: string }>;
    }) => {
      await apiClient.post(`/teacher/classes/${classId}/weekly-rewards`, { rewards });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['weeklyRewards', variables.classId] });
    },
  });
};

// ─── Monthly Good Kids ─────────────────────────────────────────────────────────

interface MonthlyGoodKid {
  studentId: number;
  studentName: string;
  avatarUrl: string | null;
  reason: string;
  month: number;
  year: number;
}

export const useMonthlyGoodKids = (year: number, month: number) => {
  return useQuery({
    queryKey: ['monthlyGoodKids', year, month],
    queryFn: async (): Promise<MonthlyGoodKid[]> => {
      const res = await apiClient.get<ApiResponse<MonthlyGoodKid[]>>(
        `/teacher/monthly-good-kids?year=${year}&month=${month}`
      );
      return res.data.data || [];
    },
    staleTime: 5 * 60 * 1000,
  });
};

// ─── Class Schedule ───────────────────────────────────────────────────────────

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

// ─── Class Menu ───────────────────────────────────────────────────────────────

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
