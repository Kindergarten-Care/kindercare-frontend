import { Student, AttendanceStatus } from '@/config/types/attendance';
import { apiClient, SERVER } from '@kindercare/core';
import { fixImageUrl } from '@/utils/imageUrl';
import { AttendanceMapper } from './AttendanceMapper';

export interface TeacherClass {
  classId: number;
  className: string;
  studentCount: number;
}

export function getUtcTimestampInSeconds(dateStr: string): number {
  const [year, month, day] = dateStr.split('-').map(Number);
  return Math.floor(Date.UTC(year, month - 1, day) / 1000);
}

export function timeStrToTimestamp(dateStr: string, timeStr: string): number | null {
  if (!timeStr || timeStr === '--:--') return null;
  const [year, month, day] = dateStr.split('-').map(Number);
  const [hours, minutes] = timeStr.split(':').map(Number);
  const date = new Date(year, month - 1, day, hours, minutes, 0);
  return Math.floor(date.getTime() / 1000);
}

export class AttendanceService {
  public static async getTeacherClasses(): Promise<TeacherClass[]> {
    const res = await apiClient.get(SERVER.teacher.getClasses);
    return res.data?.data || [];
  }

  public static async getDailyAttendance(classId: number | string, date: string): Promise<Student[]> {
    const dateTimestamp = getUtcTimestampInSeconds(date);
    const res = await apiClient.get(SERVER.teacher.getStudents.replace(':classId', String(classId)), {
      params: { date: dateTimestamp }
    });
    return AttendanceMapper.toDomainList(res.data?.data || []);
  }

  public static async getClassStudentsLite(
    classId: number | string
  ): Promise<Array<{ id: string | number; name: string; avatar?: string }>> {
    const res = await apiClient.get(SERVER.teacher.getStudents.replace(':classId', String(classId)));
    const list = res.data?.data || [];
    const arr = Array.isArray(list) ? list : (list?.students || list?.data || []);
    return (Array.isArray(arr) ? arr : []).map((s: any) => ({
      id: s.studentId ?? s.id,
      name: s.fullName ?? s.name ?? 'Học sinh',
      avatar: fixImageUrl(s.avatarUrl ?? s.avatar),
    }));
  }

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

    await apiClient.post(SERVER.teacher.postAttendanceQuick, {
      classId: Number(classId),
      date: dateTimestamp,
      attendanceData,
    });
    return true;
  }

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

    await apiClient.post(SERVER.teacher.postAttendanceMeals, {
      classId: Number(classId),
      date: dateTimestamp,
      mealData: data,
    });
    return true;
  }

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

    await apiClient.post(SERVER.teacher.postAttendanceActivities, {
      classId: Number(classId),
      date: dateTimestamp,
      activityData: data,
    });
    return true;
  }

  public static async scanQRAttendance(qrToken: string, classId: number | string): Promise<boolean> {
    await apiClient.post(SERVER.teacher.scanAttendance, {
      qrToken,
      classId: Number(classId)
    });
    return true;
  }

  public static async uploadPhotoAttendance(formData: FormData): Promise<any> {
    const res = await apiClient.post(SERVER.teacher.uploadAttendancePhoto, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  }
}
