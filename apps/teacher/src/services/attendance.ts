import { Student, LeaveRequest, AttendanceStatus, LeaveRequestStatus } from '@/config/types/attendance';
import { apiClient } from '@kindercare/core';

export interface TeacherClass {
  classId: number;
  className: string;
  studentCount: number;
}

// Helper: parse YYYY-MM-DD and return start of day UTC Unix timestamp in seconds
export function getUtcTimestampInSeconds(dateStr: string): number {
  const [year, month, day] = dateStr.split('-').map(Number);
  return Math.floor(Date.UTC(year, month - 1, day) / 1000);
}

// Helper: parse time HH:mm for a target date and return local Unix timestamp in seconds
export function timeStrToTimestamp(dateStr: string, timeStr: string): number | null {
  if (!timeStr || timeStr === '--:--') return null;
  const [year, month, day] = dateStr.split('-').map(Number);
  const [hours, minutes] = timeStr.split(':').map(Number);
  const date = new Date(year, month - 1, day, hours, minutes, 0);
  return Math.floor(date.getTime() / 1000);
}

// Helper: convert Unix timestamp in seconds to local HH:mm string
export function formatTimestampToTimeStr(timestamp: number | null): string {
  if (!timestamp) return '--:--';
  const date = new Date(timestamp * 1000);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

// Mappers converting raw API structure to defined domain models
function mapApiStudentToDomain(raw: any): Student {
  let domainStatus: AttendanceStatus = 'PRESENT';

  const statusStr = typeof raw.status === 'string' ? raw.status.trim().toLowerCase() : '';

  if (statusStr === 'present' || statusStr === 'có mặt') {
    domainStatus = 'PRESENT';
  } else if (statusStr === 'excused' || statusStr === 'vắng có phép' || statusStr === 'phép' || statusStr === 'vắng phép') {
    domainStatus = 'PERMISSION_ABSENCE';
  } else if (statusStr === 'absent' || statusStr === 'vắng' || statusStr === 'vắng không phép' || statusStr === 'không phép') {
    domainStatus = 'UNEXCUSED_ABSENCE';
  } else if (!raw.status) {
    // No attendance record exists for this student on this date
    domainStatus = 'NOT_YET';
  }

  let leaveReqStatus: LeaveRequestStatus | undefined = undefined;
  const leaveStatusLower = typeof raw.leaveRequest?.status === 'string' ? raw.leaveRequest.status.trim().toLowerCase() : '';
  if (leaveStatusLower === 'pending') leaveReqStatus = 'PENDING';
  if (leaveStatusLower === 'approved') leaveReqStatus = 'APPROVED';
  if (leaveStatusLower === 'rejected') leaveReqStatus = 'REJECTED';

  // If the student has already been explicitly checked in as PRESENT, keep them PRESENT.
  // Otherwise, let the leave request status dictate their default category.
  if (statusStr !== 'present' && statusStr !== 'có mặt') {
    if (leaveReqStatus === 'APPROVED') {
      domainStatus = 'PERMISSION_ABSENCE';
    } else if (leaveReqStatus === 'REJECTED') {
      domainStatus = 'UNEXCUSED_ABSENCE';
    }
  }

  return {
    id: String(raw.studentId),
    name: raw.fullName,
    avatar: raw.avatarUrl || 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=80&auto=format&fit=crop&q=60',
    attendanceStatus: domainStatus,
    arrivalTime: formatTimestampToTimeStr(raw.checkInTime),
    healthNote: raw.healthNote || '',
    eatingStatus: raw.eatingStatus,
    sleepingStatus: raw.sleepingStatus,
    hygieneStatus: raw.hygieneStatus,
    teacherNote: raw.teacherNote,
    hasActiveLeaveRequest: leaveStatusLower === 'pending',
    leaveRequestId: raw.leaveRequest ? String(raw.leaveRequest.requestId) : undefined,
    leaveRequestStatus: leaveReqStatus,
    leaveRequestReason: raw.leaveRequest?.reason || undefined,
  };
}


export class AttendanceService {
  /**
   * Fetch all classes assigned to the logged-in teacher.
   * @deprecated Use `classService.getClasses()` (from `@/services/class/ClassService`) instead.
   * This method remains here for backward compatibility with Attendance views.
   */
  public static async getTeacherClasses(): Promise<TeacherClass[]> {
    const res = await apiClient.get('/teacher/classes');
    return res.data?.data || [];
  }

  /**
   * Fetch daily student attendance records for a class on a target date.
   */
  public static async getDailyAttendance(classId: number | string, date: string): Promise<Student[]> {
    const dateTimestamp = getUtcTimestampInSeconds(date);
    const res = await apiClient.get(`/teacher/classes/${classId}/students`, {
      params: { date: dateTimestamp }
    });
    const list = res.data?.data || [];
    return list.map(mapApiStudentToDomain);
  }



  /**
   * Update attendance records on the server.
   */
  public static async updateAttendance(
    classId: number | string,
    date: string,
    records: { studentId: string; status: AttendanceStatus; arrivalTime?: string; healthNote?: string }[]
  ): Promise<boolean> {
    const dateTimestamp = getUtcTimestampInSeconds(date);

    const attendanceData = records.map(r => {
      let dbStatus = 'Present';
      if (r.status === 'PERMISSION_ABSENCE') dbStatus = 'Excused';
      if (r.status === 'UNEXCUSED_ABSENCE') dbStatus = 'Absent';

      const checkInTime = timeStrToTimestamp(date, r.arrivalTime || '');

      return {
        studentId: Number(r.studentId),
        status: dbStatus,
        checkInTime,
        checkOutTime: null,
        pickedUpBy: null,
        notes: r.healthNote,
      };
    });

    await apiClient.post('/teacher/attendance/quick', {
      classId: Number(classId),
      date: dateTimestamp,
      attendanceData,
    });

    return true;
  }

  /**
   * Submit quick meal logs.
   */
  public static async submitQuickMealLogs(
    classId: number | string,
    date: string,
    mealData: { studentId: string; eatingStatus: string }[]
  ): Promise<boolean> {
    const dateTimestamp = getUtcTimestampInSeconds(date);
    const data = mealData.map(m => ({
      studentId: Number(m.studentId),
      eatingStatus: m.eatingStatus,
    }));

    await apiClient.post('/teacher/attendance/meals', {
      classId: Number(classId),
      date: dateTimestamp,
      mealData: data,
    });

    return true;
  }

  /**
   * Submit quick activities logs (nap, hygiene, etc).
   */
  public static async submitQuickActivities(
    classId: number | string,
    date: string,
    activityData: { studentId: string; napStatus?: string; hygieneStatus?: string; teacherNote?: string }[]
  ): Promise<boolean> {
    const dateTimestamp = getUtcTimestampInSeconds(date);
    const data = activityData.map(a => ({
      studentId: Number(a.studentId),
      napStatus: a.napStatus,
      hygieneStatus: a.hygieneStatus,
      teacherNote: a.teacherNote,
    }));

    await apiClient.post('/teacher/attendance/activities', {
      classId: Number(classId),
      date: dateTimestamp,
      activityData: data,
    });

    return true;
  }

  /**
   * Scan QR Code for attendance
   */
  public static async scanQRAttendance(qrToken: string, classId: number | string): Promise<boolean> {
    await apiClient.post('/teacher/attendance/scan', {
      qrToken,
      classId: Number(classId)
    });
    return true;
  }
}
