'use client';

import { useEffect, useState } from 'react';
import { parentDashboardService } from '@/services/ParentDashboardService';
import { ParentDashboardModel, CalendarDay, AttendanceStats } from '@/config/types/dashboard';
import { useStudent } from '@/contexts/StudentContext';
import { getInitials, getAvatarGradient } from '@/utils/Student/Avatar';
import { formatDateFromBigInt } from '@/utils/Student/Date';
import { attendanceService } from '@/services/Attendance/AttendanceService';
import { AttendanceDomainModel } from '@/config/types/attendance';

export const getTeacherDisplayName = (teacher: { fullName: string; gender?: string }) => {
  if (!teacher) return '';
  const fullName = teacher.fullName || '';
  if (/^(cô|thầy)\b/i.test(fullName)) {
    return fullName;
  }
  const isMale = (teacher.gender || '').toLowerCase() === 'nam';
  const prefix = isMale ? 'Thầy' : 'Cô';
  return `${prefix} ${fullName}`;
};

const calculateAttendanceData = (
  records: AttendanceDomainModel[],
  viewYear: number,
  viewMonth: number
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
  let present = 0;
  let absent = 0;
  let excused = 0;
  let totalDays = 0;

  for (let day = 1; day <= daysInMonth; day++) {
    const dateObj = new Date(viewYear, viewMonth, day);
    const dayOfWeek = dateObj.getDay();
    const record = recordsMap.get(day);

    let status: 'present' | 'absent' | 'excused' | 'holiday' | 'weekend' | 'none' = 'none';
    let checkinTime: string | undefined = undefined;
    let checkoutTime: string | undefined = undefined;

    if (record) {
      const dbStatus = (record.status || '').toLowerCase();
      if (dbStatus === 'present') {
        status = 'present';
        present++;
        totalDays++;
        if (record.checkInTime) {
          const checkInDate = new Date(Number(record.checkInTime) * 1000);
          const hh = String(checkInDate.getHours()).padStart(2, '0');
          const mm = String(checkInDate.getMinutes()).padStart(2, '0');
          checkinTime = `${hh}:${mm}`;
        }
        if (record.checkOutTime) {
          const checkOutDate = new Date(Number(record.checkOutTime) * 1000);
          const hh = String(checkOutDate.getHours()).padStart(2, '0');
          const mm = String(checkOutDate.getMinutes()).padStart(2, '0');
          checkoutTime = `${hh}:${mm}`;
        }
      } else if (dbStatus === 'absent') {
        status = 'absent';
        absent++;
        totalDays++;
      } else if (dbStatus === 'excused') {
        status = 'excused';
        excused++;
        totalDays++;
      } else if (dbStatus === 'holiday') {
        status = 'holiday';
      }
    } else {
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        status = 'weekend';
      }
    }

    calendarDays.push({
      day,
      status,
      checkinTime,
      checkoutTime,
    });
  }

  const percentage = totalDays > 0 ? Math.round((present / totalDays) * 100) : 100;

  return {
    calendarDays,
    attendanceStats: {
      percentage,
      present,
      absent,
      excused,
      totalDays,
    },
  };
};

export function useParentDashboard() {
  const [data, setData] = useState<ParentDashboardModel | null>(null);
  const [attendance, setAttendance] = useState<{ calendarDays: CalendarDay[]; attendanceStats: AttendanceStats } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isLeavePopupOpen, setIsLeavePopupOpen] = useState<boolean>(false);
  const [isMedicationPopupOpen, setIsMedicationPopupOpen] = useState<boolean>(false);
  const [isQrPopupOpen, setIsQrPopupOpen] = useState<boolean>(false);
  const { activeStudent } = useStudent();

  const now = new Date();
  const [viewYear, setViewYear] = useState<number>(now.getFullYear());
  const [viewMonth, setViewMonth] = useState<number>(now.getMonth());
  const [allRecords, setAllRecords] = useState<AttendanceDomainModel[]>([]);

  const prevMonth = (): void => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(y => y - 1);
    } else {
      setViewMonth(m => m - 1);
    }
  };

  const nextMonth = (): void => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(y => y + 1);
    } else {
      setViewMonth(m => m + 1);
    }
  };

  useEffect(() => {
    parentDashboardService
      .getDashboardData()
      .then(setData)
      .catch(err => console.error('Dashboard fetch failed:', err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!activeStudent?.studentId) return;

    attendanceService
      .getAttendance(activeStudent.studentId)
      .then(records => {
        setAllRecords(records);
      })
      .catch(err => console.error('Attendance fetch failed:', err));
  }, [activeStudent?.studentId]);

  useEffect(() => {
    const calculated = calculateAttendanceData(allRecords, viewYear, viewMonth);
    setAttendance(calculated);
  }, [allRecords, viewYear, viewMonth]);

  const leadTeacher = activeStudent && activeStudent.teachers && activeStudent.teachers.length > 0
    ? activeStudent.teachers[0]
    : null;

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

  const avatarGradient = activeStudent ? getAvatarGradient(activeStudent.studentId) : '';
  const avatarInitial = activeStudent ? getInitials(activeStudent.fullName) : '';

  const mergedData = data ? {
    ...data,
    calendarDays: attendance?.calendarDays ?? data.calendarDays,
    attendanceStats: attendance?.attendanceStats ?? data.attendanceStats,
  } : null;

  return {
    data: mergedData,
    loading,
    activeStudent,
    isLeavePopupOpen,
    setIsLeavePopupOpen,
    isMedicationPopupOpen,
    setIsMedicationPopupOpen,
    isQrPopupOpen,
    setIsQrPopupOpen,
    childHero,
    avatarGradient,
    avatarInitial,
    leadTeacher,
    viewYear,
    viewMonth,
    prevMonth,
    nextMonth,
  };
}
