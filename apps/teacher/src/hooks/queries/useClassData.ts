import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { MenuService, ClassMenu, MenuDetail } from '../../services/menu';
import { ScheduleService, DailyScheduleItem, WeeklySchedule } from '../../services/schedule';
import { getUtcTimestampInSeconds } from '../../services/attendance';

export const useClassMenu = (classId: number | string, dateString: string) => {
  return useQuery<ClassMenu | null>({
    queryKey: ['classMenu', classId, dateString],
    queryFn: () => {
      const timestamp = getUtcTimestampInSeconds(dateString);
      return MenuService.getClassMenu(classId, timestamp);
    },
    enabled: !!classId && !!dateString,
  });
};

export const useUpdateClassMenu = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ classId, menuId, details }: { classId: number | string; menuId: number; details: MenuDetail[] }) => 
      MenuService.updateClassMenu(classId, menuId, details),
    onSuccess: (_, { classId }) => {
      queryClient.invalidateQueries({ queryKey: ['classMenu', classId] });
    },
  });
};

export const useDailySchedule = (classId: number | string, dateString: string) => {
  return useQuery<DailyScheduleItem[]>({
    queryKey: ['dailySchedule', classId, dateString],
    queryFn: () => {
      const timestamp = getUtcTimestampInSeconds(dateString);
      return ScheduleService.getDailySchedule(classId, timestamp);
    },
    enabled: !!classId && !!dateString,
  });
};

export const useWeeklySchedule = (classId: number | string, dateString: string) => {
  return useQuery<WeeklySchedule | null>({
    queryKey: ['weeklySchedule', classId, dateString],
    queryFn: () => {
      const timestamp = getUtcTimestampInSeconds(dateString);
      return ScheduleService.getWeeklySchedule(classId, timestamp);
    },
    enabled: !!classId && !!dateString,
  });
};

export const useUpdateScheduleStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ classId, scheduleId, status }: { classId: number | string; scheduleId: number | string; status: string }) => 
      ScheduleService.updateScheduleStatus(classId, scheduleId, status),
    onSuccess: (_, { classId }) => {
      queryClient.invalidateQueries({ queryKey: ['dailySchedule', classId] });
    },
  });
};
