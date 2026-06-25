import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@kindercare/core';
import { NewsfeedService } from '@/services/newsfeed';

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

import { mapApiLeaveRequestToDomain } from '@/services/attendance';

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
    onSuccess: () => {
      // Invalidate the query to refetch pending requests
      queryClient.invalidateQueries({ queryKey: ['leaveRequests'] });
    },
  });
};

// --- TIMELINE (SCHEDULE & MENU) ---
export const useClassSchedule = (classId: string | number | undefined) => {
  return useQuery({
    queryKey: ['classSchedule', classId],
    queryFn: async () => {
      if (!classId) return [];
      const response = await apiClient.get(`/teacher/classes/${classId}/schedule`);
      return response.data.data;
    },
    enabled: !!classId, // Only fetch if classId is available
    staleTime: 5 * 60 * 1000, // 5 minutes since schedule doesn't change often
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
    mutationFn: async ({ classId, weekNumber, year, awards }: { classId: number, weekNumber: number, year: number, awards: any[] }) => {
      const response = await apiClient.post(`/teacher/classes/${classId}/weekly-rewards`, {
        weekNumber, year, awards
      });
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['weeklyRewards', variables.classId, variables.weekNumber, variables.year] });
    },
  });
};

// --- NEWSFEED ---
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

export const useTeacherProfile = () => {
  return useQuery({
    queryKey: ['teacherProfile'],
    queryFn: async () => {
      const { profileService } = await import('@/services/profile/ProfileService');
      return profileService.getProfile();
    },
    staleTime: 10 * 60 * 1000, // 10 minutes cache
  });
};
