import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient, ApiResponse } from '@kindercare/core';
import type { StudentDetailedDomainModel } from '@/config/types/student';
import type { TeacherClassApiDto, TeacherClassDomainModel } from '@/config/types/class';
import { WorkHistoryDomainModel } from '@/config/types/profile';

interface DetailedStudentsResponse {
  classId: number;
  totalStudents: number;
  students: StudentDetailedDomainModel[];
}

// ─── Newsfeed ─────────────────────────────────────────────────────────────────

export interface CreateNewsfeedPayload {
  classId: number | string;
  content: string;
  mediaUrl?: string;
}

export const useCreateNewsfeed = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateNewsfeedPayload) => {
      await apiClient.post(`/teacher/classes/${payload.classId}/newsfeeds`, { content: payload.content, mediaUrl: payload.mediaUrl });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['newsfeeds', variables.classId] });
    },
  });
};

interface NewsfeedItem {
  id: number;
  content: string;
  mediaUrl?: string;
  teacherName: string;
  teacherAvatar?: string;
  createdAt: number;
}

export const useNewsfeeds = (classId?: number | string) => {
  return useQuery({
    queryKey: ['newsfeeds', classId],
    queryFn: async (): Promise<NewsfeedItem[]> => {
      const url = classId ? `/teacher/classes/${classId}/newsfeeds` : '/teacher/newsfeeds';
      const res = await apiClient.get<ApiResponse<any[]>>(url);
      return res.data.data || [];
    },
    enabled: !!classId,
    staleTime: 30 * 1000,
  });
};

export const useDeleteNewsfeed = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ postId }: { classId?: number | string; postId: number | string }) => {
      await apiClient.delete(`/teacher/newsfeeds/${postId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['newsfeeds'] });
    },
  });
};

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

// ─── Teacher Profile ───────────────────────────────────────────────────────────

interface TeacherProfile {
  teacherId: number;
  fullName: string;
  email: string;
  phone: string;
  avatarUrl: string | null;
  dateOfBirth: number | null;
  address: string | null;
  hireDate: number | null;
  specialization: string | null;
  idCard?: string;
  professionalRank?: string;
}

export const useTeacherProfile = () => {
  return useQuery({
    queryKey: ['teacherProfile'],
    queryFn: async (): Promise<TeacherProfile> => {
      const res = await apiClient.get<ApiResponse<TeacherProfile>>('/teacher/profile');
      return res.data.data ?? {
        teacherId: 0,
        fullName: '',
        email: '',
        phone: '',
        avatarUrl: null,
        dateOfBirth: null,
        address: null,
        hireDate: null,
        specialization: null,
      };
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
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

import { LeaveRequest, LeaveRequestStatus } from '@/config/types/attendance';
import { LeaveRequestService } from '@/services/leave-requests';

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

// ─── Medical Requests ──────────────────────────────────────────────────────────

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

// ─── Proxy Approvals ────────────────────────────────────────────────────────────

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

// ─── Profile Settings ─────────────────────────────────────────────────────────

interface TeacherSettings {
  pushEnabled: boolean;
  emailEnabled: boolean;
  weeklyReportEnabled: boolean;
}

export const useTeacherSettings = () => {
  return useQuery({
    queryKey: ['teacherSettings'],
    queryFn: async (): Promise<TeacherSettings> => {
      const res = await apiClient.get<ApiResponse<TeacherSettings>>('/teacher/settings');
      return res.data.data ?? {
        pushEnabled: true,
        emailEnabled: true,
        weeklyReportEnabled: false,
      };
    },
    staleTime: 10 * 60 * 1000,
  });
};

export const useUpdateSettings = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (settings: Partial<TeacherSettings>) => {
      await apiClient.patch('/teacher/settings', settings);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teacherSettings'] });
    },
  });
};

// ─── Password ─────────────────────────────────────────────────────────────────

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

// ─── Avatar ───────────────────────────────────────────────────────────────────

export const useUploadAvatar = () => {
  return useMutation({
    mutationFn: async (file: File): Promise<string> => {
      const formData = new FormData();
      formData.append('file', file);
      const res = await apiClient.post<ApiResponse<{ url: string }>>('/upload', formData);
      return res.data.data?.url || '';
    },
  });
};

export const useUpdateAvatar = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ avatarUrl, fullName }: { avatarUrl: string; fullName?: string }) => {
      await apiClient.patch('/teacher/profile', {
        avatarUrl,
        fullName,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teacherProfile'] });
    },
  });
};

// ─── Work History ─────────────────────────────────────────────────────────────

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
