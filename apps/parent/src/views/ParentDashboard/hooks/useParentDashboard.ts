'use client';

import { useEffect, useState } from 'react';
import { CalendarDay, AttendanceStats, ScheduleItem, AlbumPhoto, DailyLesson } from '@/config/types/dashboard';
import { useStudent } from '@/contexts/StudentContext';
import { getInitials, getAvatarGradient } from '@/utils/Student/Avatar';
import { formatDateFromBigInt, tsToHHMM, currentMonthParam } from '@/utils/Student/Date';
import { attendanceService } from '@/services/Attendance/AttendanceService';
import { AttendanceDomainModel } from '@/config/types/attendance';
import { dailyScheduleService } from '@/services/DailySchedule/DailyScheduleService';
import { dailyLessonService } from '@/services/DailyLesson/DailyLessonService';
import { dailyAlbumService } from '@/services/DailyAlbum/DailyAlbumService';
import { assessmentService } from '@/services/Assessment/AssessmentService';
import { DailyScheduleDomainModel, ActivityType } from '@/config/types/dailySchedule';
import { DailyLessonDomainModel } from '@/config/types/dailyLesson';
import { DailyAlbumDomainModel } from '@/config/types/dailyAlbum';
import { AssessmentDomainModel } from '@/config/types/assessment';

// ─── Public helper (used by GlobalChatFab) ────────────────────────────────────

export const getTeacherDisplayName = (teacher: { fullName: string; gender?: string }) => {
  if (!teacher) return '';
  const fullName = teacher.fullName || '';
  if (/^(cô|thầy)\b/i.test(fullName)) return fullName;
  const prefix = (teacher.gender || '').toLowerCase() === 'nam' ? 'Thầy' : 'Cô';
  return `${prefix} ${fullName}`;
};

// ─── Domain → Widget mappers ──────────────────────────────────────────────────

const ACTIVITY_META: Record<ActivityType, { icon: string; color: string }> = {
  pickup:  { icon: '🚌', color: '#16a34a' },
  meal:    { icon: '🍽️', color: '#d97706' },
  study:   { icon: '📚', color: '#8b5cf6' },
  nap:     { icon: '😴', color: '#6b7280' },
  play:    { icon: '🌳', color: '#059669' },
  dropoff: { icon: '🏠', color: '#005A36' },
  other:   { icon: '📌', color: '#6b7280' },
};

const LESSON_META: Record<string, { icon: string; color: string }> = {
  math:     { icon: '🔢', color: '#3b82f6' },
  science:  { icon: '🔬', color: '#10b981' },
  art:      { icon: '🎨', color: '#ec4899' },
  music:    { icon: '🎵', color: '#e11d48' },
  language: { icon: '📖', color: '#d97706' },
  english:  { icon: '🔤', color: '#2563eb' },
  craft:    { icon: '✂️', color: '#8b5cf6' },
  sport:    { icon: '⚽', color: '#059669' },
};

const scheduleToItems = (items: DailyScheduleDomainModel[]): ScheduleItem[] =>
  items.map(item => {
    const meta = ACTIVITY_META[item.activityType] ?? ACTIVITY_META.other;
    return {
      id: String(item.dailyScheduleId),
      time: tsToHHMM(item.startTime),
      endTime: tsToHHMM(item.endTime),
      title: item.activityName,
      note: item.details ?? item.location ?? '',
      icon: meta.icon,
      color: meta.color,
      activityType: item.activityType ?? 'other',
    };
  });

const lessonsToItems = (lessons: DailyLessonDomainModel[]): DailyLesson[] =>
  lessons.map(lesson => {
    const meta = LESSON_META[lesson.iconType] ?? { icon: '📚', color: '#6b7280' };
    return {
      id: String(lesson.lessonLogId),
      subject: lesson.subjectName,
      title: lesson.lessonTitle,
      description: lesson.details,
      icon: meta.icon,
      color: meta.color,
    };
  });

const albumsToPhotos = (albums: DailyAlbumDomainModel[]): AlbumPhoto[] =>
  albums.flatMap(album =>
    album.photos.map(photo => ({
      id: String(photo.photoId),
      caption: photo.description ?? album.caption ?? '',
      time: tsToHHMM(photo.createdAt),
      color: '#f3f4f6',
      icon: '📷',
      photoUrl: photo.photoUrl,
    }))
  );

// ─── Attendance calendar helpers ──────────────────────────────────────────────

const DEFAULT_STATS: AttendanceStats = {
  percentage: 0, present: 0, absent: 0, excused: 0, totalDays: 0,
};

const calculateAttendanceData = (
  records: AttendanceDomainModel[],
  viewYear: number,
  viewMonth: number,
): { calendarDays: CalendarDay[]; attendanceStats: AttendanceStats } => {
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const recordsMap = new Map<number, AttendanceDomainModel>();
  records.forEach(r => {
    const d = new Date(Number(r.attendanceDate) * 1000);
    if (d.getFullYear() === viewYear && d.getMonth() === viewMonth) {
      recordsMap.set(d.getDate(), r);
    }
  });

  const calendarDays: CalendarDay[] = [];
  let present = 0, absent = 0, excused = 0, totalDays = 0;

  for (let day = 1; day <= daysInMonth; day++) {
    const dayOfWeek = new Date(viewYear, viewMonth, day).getDay();
    const record = recordsMap.get(day);
    let status: CalendarDay['status'] = 'none';
    let checkinTime: string | undefined;
    let checkoutTime: string | undefined;

    if (record) {
      const dbStatus = record.status.toLowerCase();
      if (dbStatus === 'present') {
        status = 'present'; present++; totalDays++;
        if (record.checkInTime) {
          checkinTime = tsToHHMM(record.checkInTime);
        }
        if (record.checkOutTime) {
          checkoutTime = tsToHHMM(record.checkOutTime);
        }
      } else if (dbStatus === 'absent') {
        status = 'absent'; absent++; totalDays++;
      } else if (dbStatus === 'excused') {
        status = 'excused'; excused++; totalDays++;
      } else if (dbStatus === 'holiday') {
        status = 'holiday';
      }
    } else if (dayOfWeek === 0 || dayOfWeek === 6) {
      status = 'weekend';
    }

    calendarDays.push({ day, status, checkinTime, checkoutTime });
  }

  const percentage = totalDays > 0 ? Math.round((present / totalDays) * 100) : 100;
  return { calendarDays, attendanceStats: { percentage, present, absent, excused, totalDays } };
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useParentDashboard() {
  const { activeStudent, loading: studentLoading } = useStudent();

  const [apiLoading, setApiLoading] = useState(false);
  const [isLeavePopupOpen, setIsLeavePopupOpen] = useState(false);
  const [isMedicationPopupOpen, setIsMedicationPopupOpen] = useState(false);
  const [isQrPopupOpen, setIsQrPopupOpen] = useState(false);

  const now = new Date();
  const [viewYear, setViewYear] = useState(now.getFullYear());
  const [viewMonth, setViewMonth] = useState(now.getMonth());

  const [allRecords, setAllRecords] = useState<AttendanceDomainModel[]>([]);
  const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([]);
  const [attendanceStats, setAttendanceStats] = useState<AttendanceStats>(DEFAULT_STATS);

  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [lessons, setLessons] = useState<DailyLesson[]>([]);
  const [photos, setPhotos] = useState<AlbumPhoto[]>([]);
  const [latestAssessment, setLatestAssessment] = useState<AssessmentDomainModel | null>(null);

  const prevMonth = (): void => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };

  const nextMonth = (): void => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  useEffect(() => {
    if (!activeStudent?.studentId) return;
    const id = activeStudent.studentId;
    setApiLoading(true);

    Promise.allSettled([
      attendanceService.getAttendance(id),
      dailyScheduleService.getDailySchedule(id),
      dailyLessonService.getDailyLessons(id),
      dailyAlbumService.getDailyAlbums(id),
      assessmentService.getAssessments(id, currentMonthParam()),
    ])
      .then(([attendance, schedule, lessons, albums, assessments]) => {
        if (attendance.status === 'fulfilled') setAllRecords(attendance.value);
        else console.error('Attendance API failed:', attendance.reason);

        if (schedule.status === 'fulfilled') setSchedule(scheduleToItems(schedule.value));
        else console.error('Daily schedule API failed:', schedule.reason);

        if (lessons.status === 'fulfilled') setLessons(lessonsToItems(lessons.value));
        else console.error('Daily lessons API failed:', lessons.reason);

        if (albums.status === 'fulfilled') setPhotos(albumsToPhotos(albums.value));
        else console.error('Daily albums API failed:', albums.reason);

        if (assessments.status === 'fulfilled') setLatestAssessment(assessments.value[0] ?? null);
        else console.error('Assessments API failed:', assessments.reason);
      })
      .finally(() => setApiLoading(false));
  }, [activeStudent?.studentId]);

  useEffect(() => {
    const { calendarDays: days, attendanceStats: stats } = calculateAttendanceData(allRecords, viewYear, viewMonth);
    setCalendarDays(days);
    setAttendanceStats(stats);
  }, [allRecords, viewYear, viewMonth]);

  const leadTeacher = activeStudent?.teachers?.[0] ?? null;

  const childHero = activeStudent
    ? {
        name: activeStudent.fullName,
        className: activeStudent.className,
        teacher: leadTeacher ? getTeacherDisplayName(leadTeacher) : 'Chưa phân công',
        academicYear: activeStudent.academicYearName,
        branch: activeStudent.campusName,
        statusTags: [
          { label: `🎂 NS: ${formatDateFromBigInt(activeStudent.dateOfBirth)}`, type: 'neutral' as const },
          { label: `📅 Nhập học: ${formatDateFromBigInt(activeStudent.admissionDate)}`, type: 'neutral' as const },
          { label: activeStudent.allergies ? `⚠️ ${activeStudent.allergies}` : 'Không dị ứng', type: activeStudent.allergies ? 'yellow' as const : 'green' as const },
        ],
        checkinTime: 'Đang học',
        checkinSub: 'Đúng giờ · Cổng A',
      }
    : null;

  return {
    loading: studentLoading || apiLoading,
    activeStudent,
    schedule,
    lessons,
    photos,
    calendarDays,
    attendanceStats,
    latestAssessment,
    childHero,
    avatarGradient: activeStudent ? getAvatarGradient(activeStudent.studentId) : '',
    avatarInitial: activeStudent ? getInitials(activeStudent.fullName) : '',
    viewYear,
    viewMonth,
    prevMonth,
    nextMonth,
    isLeavePopupOpen, setIsLeavePopupOpen,
    isMedicationPopupOpen, setIsMedicationPopupOpen,
    isQrPopupOpen, setIsQrPopupOpen,
  };
}
