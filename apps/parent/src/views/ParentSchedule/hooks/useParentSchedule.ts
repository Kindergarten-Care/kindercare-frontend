'use client';

import { useState, useEffect, useMemo } from 'react';
import { useStudent } from '@/contexts/StudentContext';
import { dailyScheduleService } from '@/services/DailySchedule/DailyScheduleService';
import { dailyLessonService } from '@/services/DailyLesson/DailyLessonService';
import { menuService } from '@/services/Menu/MenuService';
import { weeklyScheduleService } from '@/services/WeeklySchedule/WeeklyScheduleService';
import { DailyScheduleDomainModel } from '@/config/types/dailySchedule';
import { DailyLessonDomainModel } from '@/config/types/dailyLesson';
import { MenuDomainModel } from '@/config/types/menu';
import { WeeklyScheduleDomainModel } from '@/config/types/weeklySchedule';

export interface WeekDayData {
  date: Date;
  isToday: boolean;
  schedule: DailyScheduleDomainModel[];
  lessons: DailyLessonDomainModel[];
  menu: MenuDomainModel | null;
}

const startOfDay = (d: Date): Date => new Date(d.getFullYear(), d.getMonth(), d.getDate());

const sameDay = (a: Date, b: Date): boolean =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

/** Monday..Friday of the week containing `date`. */
const weekdaysOf = (date: Date): Date[] => {
  const dow = date.getDay(); // 0=Sun..6=Sat
  const diffToMonday = (dow + 6) % 7;
  const monday = startOfDay(date);
  monday.setDate(monday.getDate() - diffToMonday);
  return [0, 1, 2, 3, 4].map(i => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
};

export function useParentSchedule(anchorDate: Date) {
  const { activeStudent, loading: studentLoading } = useStudent();
  const [days, setDays] = useState<WeekDayData[]>([]);
  const [weeklyTimetable, setWeeklyTimetable] = useState<WeeklyScheduleDomainModel | null>(null);
  const [loading, setLoading] = useState(false);

  const weekDates = useMemo(() => weekdaysOf(anchorDate), [anchorDate.getTime()]);
  const weekKey = weekDates.map(d => d.getTime()).join(',');

  useEffect(() => {
    if (!activeStudent?.studentId) return;
    setLoading(true);
    const studentId = activeStudent.studentId;
    const today = new Date();
    const ts = Math.floor(anchorDate.getTime() / 1000);

    Promise.allSettled([
      // Fetch daily details
      Promise.allSettled(
        weekDates.map(date => {
          const dayTs = Math.floor(date.getTime() / 1000);
          return Promise.allSettled([
            dailyScheduleService.getDailySchedule(studentId, dayTs),
            dailyLessonService.getDailyLessons(studentId, dayTs),
            menuService.getMenu(studentId, dayTs),
          ]);
        })
      ),
      // Fetch weekly timetable
      weeklyScheduleService.getWeeklyTimetable(studentId, ts)
    ]).then(([dailyResults, weeklyResult]) => {
      // 1. Process daily results
      if (dailyResults.status === 'fulfilled') {
        const nextDays: WeekDayData[] = dailyResults.value.map((result, idx) => {
          const date = weekDates[idx];
          if (result.status !== 'fulfilled') {
            return { date, isToday: sameDay(date, today), schedule: [], lessons: [], menu: null };
          }
          const [scheduleRes, lessonsRes, menuRes] = result.value;
          return {
            date,
            isToday: sameDay(date, today),
            schedule: scheduleRes.status === 'fulfilled' ? scheduleRes.value : [],
            lessons: lessonsRes.status === 'fulfilled' ? lessonsRes.value : [],
            menu: menuRes.status === 'fulfilled' ? menuRes.value : null,
          };
        });
        setDays(nextDays);
      }

      // 2. Process weekly timetable result
      if (weeklyResult.status === 'fulfilled') {
        setWeeklyTimetable(weeklyResult.value);
      } else {
        setWeeklyTimetable(null);
      }
    }).finally(() => setLoading(false));
  }, [activeStudent?.studentId, weekKey]);

  return {
    activeStudent,
    loading: studentLoading || loading,
    days,
    weeklyTimetable,
    weekStart: weekDates[0],
    weekEnd: weekDates[4],
  };
}
