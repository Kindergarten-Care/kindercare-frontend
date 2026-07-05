import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@kindercare/core';
import { NewsfeedService } from '@/services/newsfeed';
import { classService } from '@/services/class/ClassService';
import { profileService } from '@/services/profile/ProfileService';
import { AttendanceService } from '@/services/attendance';
import { mapApiLeaveRequestToDomain } from '@/services/leave-requests';
import { SettingsDomainModel } from '@/config/types/profile';

// --- DASHBOARD STATS ---
export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboardStats'],
    queryFn: async () => {
      const response = await apiClient.get('/teacher/dashboard');
      return response.data.data;
    },
    staleTime: 60 * 1000, // 1 minute
  });
};

export const useTeacherClasses = () => {
  return useQuery({
    queryKey: ['teacherClasses'],
    queryFn: () => classService.getClasses(),
    staleTime: 5 * 60 * 1000, // 5 minutes — class list changes rarely
  });
};

// --- PROFILE ---
export const useTeacherProfile = () => {
  return useQuery({
    queryKey: ['teacherProfile'],
    queryFn: () => profileService.getProfile(),
    staleTime: 15 * 60 * 1000, // cache profile details for 15 mins
  });
};

export const useTeacherWorkHistory = () => {
  return useQuery({
    queryKey: ['teacherWorkHistory'],
    queryFn: () => profileService.getWorkHistory(),
  });
};

export const useTeacherSettings = () => {
  return useQuery({
    queryKey: ['teacherSettings'],
    queryFn: () => profileService.getSettings(),
  });
};

export const useUpdateSettings = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (settings: SettingsDomainModel) => profileService.updateSettings(settings),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teacherSettings'] });
    }
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (data: { current: string; new: string }) => 
      profileService.changePassword(data.current, data.new)
  });
};

export const useUploadAvatar = () => {
  return useMutation({
    mutationFn: (file: File) => profileService.uploadAvatar(file)
  });
};

export const useUpdateAvatar = () => {
  return useMutation({
    mutationFn: (data: { avatarUrl: string; fullName: string }) => 
      profileService.updateAvatar(data.avatarUrl, data.fullName)
  });
};

// --- LEAVE REQUESTS ---
export const useLeaveRequests = (status = 'Pending') => {
  return useQuery({
    queryKey: ['leaveRequests', status],
    queryFn: async () => {
      const response = await apiClient.get(`/teacher/leave-requests?status=${status}`);
      return (response.data.data || []).map(mapApiLeaveRequestToDomain);
    },
    staleTime: 60 * 1000,
  });
};

export const useUpdateLeaveRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ requestId, status }: { requestId: string | number, status: string }) => {
      const response = await apiClient.put(`/teacher/leave-requests/${requestId}/status`, { status });
      return response.data;
    },
    onMutate: async ({ requestId, status }) => {
      await queryClient.cancelQueries({ queryKey: ['leaveRequests'] });
      const previousLeaves = queryClient.getQueryData(['leaveRequests', 'Pending']);
      
      queryClient.setQueryData(['leaveRequests', 'Pending'], (old: any) => {
        if (!old) return [];
        return old.map((req: any) => String(req.id) === String(requestId) ? { ...req, status } : req);
      });
      
      return { previousLeaves };
    },
    onError: (err, newRequest, context) => {
      if (context?.previousLeaves) {
        queryClient.setQueryData(['leaveRequests', 'Pending'], context.previousLeaves);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['leaveRequests'] });
    },
  });
};

// --- TIMELINE (SCHEDULE & MENU) ---
export const useClassSchedule = (classId: number | string | undefined, dateSeconds?: number) => {
  return useQuery({
    queryKey: ['classSchedule', classId, dateSeconds],
    queryFn: async () => {
      if (!classId) return [];
      const { scheduleService } = await import('@/services/schedule/ScheduleService');
      return scheduleService.getSchedule(classId, dateSeconds);
    },
    enabled: !!classId,
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });
};

export const useClassMenu = (classId: string | number | undefined) => {
  return useQuery({
    queryKey: ['classMenu', classId],
    queryFn: async () => {
      if (!classId) return [];
      const response = await apiClient.get(`/teacher/classes/${classId}/menu`);
      return response.data.data;
    },
    enabled: !!classId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// --- MEDICAL REQUESTS ---
export const useMedicalRequests = (classId: string | number | undefined) => {
  return useQuery({
    queryKey: ['medicalRequests', classId],
    queryFn: async () => {
      if (!classId) return [];
      const response = await apiClient.get(`/teacher/classes/${classId}/medical-requests`);
      return response.data.data;
    },
    enabled: !!classId,
  });
};

export const useUpdateMedicalRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ requestId, status, teacherNote }: { requestId: string | number; status: string; teacherNote?: string }) => {
      const response = await apiClient.put(`/teacher/medical-requests/${requestId}`, { status, teacherNote });
      return response.data;
    },
    onMutate: async ({ requestId, status }) => {
      await queryClient.cancelQueries({ queryKey: ['medicalRequests'] });
      
      const previousMedicalRequests = queryClient.getQueriesData({ queryKey: ['medicalRequests'] });
      
      queryClient.setQueriesData({ queryKey: ['medicalRequests'] }, (old: any) => {
        if (!old) return old;
        return old.map((req: any) => 
          (String(req.requestId) === String(requestId) || String(req.id) === String(requestId))
            ? { ...req, status } 
            : req
        );
      });
      
      return { previousMedicalRequests };
    },
    onError: (err, newRequest, context) => {
      if (context?.previousMedicalRequests) {
        context.previousMedicalRequests.forEach(([queryKey, oldData]) => {
          queryClient.setQueryData(queryKey, oldData);
        });
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['medicalRequests'] });
    },
  });
};

// --- NOTIFICATIONS ---
export const useNotifications = () => {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const response = await apiClient.get('/teacher/notifications');
      return response.data.data;
    },
  });
};

// --- WEEKLY REWARDS ---
export const useRewardBadges = () => {
  return useQuery({
    queryKey: ['rewardBadges'],
    queryFn: async () => {
      const response = await apiClient.get('/teacher/reward-badges');
      return response.data.data;
    },
  });
};

export const useMonthlyGoodKids = (classId: string | number | undefined, month: number, year: number) => {
  return useQuery({
    queryKey: ['monthlyGoodKids', classId, month, year],
    queryFn: async () => {
      if (!classId) return [];
      const response = await apiClient.get(`/teacher/classes/${classId}/monthly-good-kids`, {
        params: { month, year }
      });
      return response.data.data;
    },
    enabled: !!classId,
  });
};

// --- NEWSFEED ---
export const useDetailedStudents = (classId: number | string | undefined) => {
  return useQuery({
    queryKey: ['detailedStudents', classId],
    queryFn: async () => {
      if (!classId) return [];
      const { studentService } = await import('@/services/student/StudentService');
      return studentService.getDetailedStudents(classId);
    },
    enabled: !!classId,
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });
};

export const useNewsfeeds = (classId: number | string | undefined) => {
  return useQuery({
    queryKey: ['newsfeeds', classId],
    queryFn: async () => {
      if (!classId) return [];
      return NewsfeedService.getNewsfeeds(classId);
    },
    enabled: !!classId,
    staleTime: 60 * 1000, // 1 minute
  });
};

export const useCreateNewsfeed = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ classId, content, mediaUrl }: { classId: number | string; content: string; mediaUrl?: string }) => 
      NewsfeedService.createNewsfeedPost(classId, content, mediaUrl),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['dashboardStats'] });
      queryClient.invalidateQueries({ queryKey: ['newsfeeds', variables.classId] });
    }
  });
};

export const useDeleteNewsfeed = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ classId, postId }: { classId: number | string; postId: number | string }) => 
      NewsfeedService.deleteNewsfeedPost(classId, postId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['dashboardStats'] });
      queryClient.invalidateQueries({ queryKey: ['newsfeeds', variables.classId] });
    }
  });
};

// --- WEEKLY REWARDS (Award) ---
export const useWeeklyRewards = (classId: string | number | undefined, weekNumber: number, year: number) => {
  return useQuery({
    queryKey: ['weeklyRewards', classId, weekNumber, year],
    queryFn: async () => {
      if (!classId) return [];
      const response = await apiClient.get(`/teacher/classes/${classId}/weekly-rewards`, {
        params: { weekNumber, year }
      });
      return response.data.data;
    },
    enabled: !!classId,
  });
};

export const useAwardWeeklyRewards = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ classId, weekNumber, year, awards }: { 
      classId: number | string; 
      weekNumber: number; 
      year: number; 
      awards: { studentId: number; teacherNote?: string }[] 
    }) => {
      const response = await apiClient.post(`/teacher/classes/${classId}/weekly-rewards`, {
        weekNumber, year, awards
      });
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['weeklyRewards', variables.classId] });
      queryClient.invalidateQueries({ queryKey: ['dashboardStats'] });
    },
  });
};
