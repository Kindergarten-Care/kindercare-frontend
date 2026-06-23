import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@kindercare/core';

// --- DASHBOARD STATS ---
export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboardStats'],
    queryFn: async () => {
      const response = await apiClient.get('/teacher/dashboard');
      return response.data.data;
    },
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
