'use client';

import { useState, useEffect } from 'react';
import { useStudent } from '@/contexts/StudentContext';
import { dailyScheduleService } from '@/services/DailySchedule/DailyScheduleService';
import { dailyAlbumService } from '@/services/DailyAlbum/DailyAlbumService';
import { attendanceService } from '@/services/Attendance/AttendanceService';
import { dailyLessonService } from '@/services/DailyLesson/DailyLessonService';
import { newsfeedService } from '@/services/Newsfeed/NewsfeedService';
import { menuService } from '@/services/Menu/MenuService';
import { dailyActivityService } from '@/services/DailyActivity/DailyActivityService';
import { DailyScheduleDomainModel, ActivityType } from '@/config/types/dailySchedule';
import { DailyAlbumDomainModel } from '@/config/types/dailyAlbum';
import { AttendanceDomainModel } from '@/config/types/attendance';
import { DailyLessonDomainModel } from '@/config/types/dailyLesson';
import { NewsfeedDomainModel } from '@/config/types/newsfeed';
import { MenuDomainModel } from '@/config/types/menu';
import { DailyActivityDomainModel } from '@/config/types/dailyActivity';
import { tsToHHMM } from '@/utils/Student/Date';

export interface DiaryTimelineItem {
  id: string;
  time: string;
  endTime: string;
  name: string;
  activityType: ActivityType;
  detail: string;
}

export interface DiaryPhoto {
  id: string;
  url?: string;
  caption: string;
  time: string;
}

export interface DiaryStats {
  mealCount: number;
  napDuration: string;
}

function isTodayTs(ts: bigint): boolean {
  const d = new Date(Number(ts) * 1000);
  const now = new Date();
  return d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate();
}

function calcNapDuration(items: DailyScheduleDomainModel[]): string {
  const nap = items.find(i => i.activityType === 'nap');
  if (!nap) return '—';
  const durMin = Math.round((Number(nap.endTime) - Number(nap.startTime)) / 60);
  const h = Math.floor(durMin / 60);
  const m = durMin % 60;
  if (h > 0 && m > 0) return `${h}h${m}p`;
  if (h > 0) return `${h}h`;
  return `${m}p`;
}

export function useParentDiary(selectedDate: Date) {
  const { activeStudent, loading: studentLoading } = useStudent();
  const [rawSchedule, setRawSchedule] = useState<DailyScheduleDomainModel[]>([]);
  const [rawAlbums, setRawAlbums] = useState<DailyAlbumDomainModel[]>([]);
  const [rawAttendance, setRawAttendance] = useState<AttendanceDomainModel[]>([]);
  const [rawLessons, setRawLessons] = useState<DailyLessonDomainModel[]>([]);
  const [newsfeeds, setNewsfeeds] = useState<NewsfeedDomainModel[]>([]);
  const [dailyMenu, setDailyMenu] = useState<MenuDomainModel | null>(null);
  const [dailyActivity, setDailyActivity] = useState<DailyActivityDomainModel | null>(null);
  const [apiLoading, setApiLoading] = useState(false);

  const dateTimestamp = Math.floor(selectedDate.getTime() / 1000);

  useEffect(() => {
    if (!activeStudent?.studentId) return;
    setApiLoading(true);

    Promise.allSettled([
      dailyScheduleService.getDailySchedule(activeStudent.studentId, dateTimestamp),
      dailyAlbumService.getDailyAlbums(activeStudent.studentId, dateTimestamp),
      attendanceService.getAttendance(activeStudent.studentId),
      dailyLessonService.getDailyLessons(activeStudent.studentId),
      newsfeedService.getNewsfeeds(activeStudent.studentId),
      menuService.getMenu(activeStudent.studentId, dateTimestamp),
      dailyActivityService.getDailyActivities(activeStudent.studentId, dateTimestamp),
    ]).then(([schedule, albums, attendance, lessons, feeds, menu, activity]) => {
      if (schedule.status === 'fulfilled') setRawSchedule(schedule.value);
      else console.error('Diary schedule failed:', schedule.reason);

      if (albums.status === 'fulfilled') setRawAlbums(albums.value);
      else console.error('Diary albums failed:', albums.reason);

      if (attendance.status === 'fulfilled') setRawAttendance(attendance.value);
      else console.error('Diary attendance failed:', attendance.reason);

      if (lessons.status === 'fulfilled') setRawLessons(lessons.value);
      else console.error('Diary lessons failed:', lessons.reason);

      if (feeds.status === 'fulfilled') setNewsfeeds(feeds.value);
      else console.error('Diary newsfeeds failed:', feeds.reason);

      if (menu.status === 'fulfilled') setDailyMenu(menu.value);
      else console.error('Diary menu failed:', menu.reason);

      if (activity.status === 'fulfilled') setDailyActivity(activity.value);
      else console.error('Diary daily activity failed:', activity.reason);
    }).finally(() => setApiLoading(false));
  }, [activeStudent?.studentId, dateTimestamp]);

  const timelineItems: DiaryTimelineItem[] = rawSchedule.map(item => ({
    id: String(item.dailyScheduleId),
    time: tsToHHMM(item.startTime),
    endTime: tsToHHMM(item.endTime),
    name: item.activityName,
    activityType: item.activityType ?? 'other',
    detail: item.details ?? item.location ?? '',
  }));

  const photos: DiaryPhoto[] = rawAlbums.flatMap(album =>
    album.photos.map(photo => ({
      id: String(photo.photoId),
      url: photo.photoUrl,
      caption: photo.description ?? album.caption ?? '',
      time: tsToHHMM(photo.createdAt),
    }))
  );

  const todayAttendance = rawAttendance.find(a => isTodayTs(a.attendanceDate)) ?? null;

  const stats: DiaryStats = {
    mealCount: rawSchedule.filter(i => i.activityType === 'meal').length,
    napDuration: calcNapDuration(rawSchedule),
  };

  return {
    activeStudent,
    loading: studentLoading || apiLoading,
    timelineItems,
    photos,
    stats,
    todayAttendance,
    attendances: rawAttendance,
    lessons: rawLessons,
    newsfeeds,
    dailyMenu,
    dailyActivity,
  };
}
