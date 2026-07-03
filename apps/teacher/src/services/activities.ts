import { 
  StudentMealRecord, 
  StudentActivityRecord, 
  MenuOfTheDay,
  ScheduleItem,
  NapStatus,
  ParticipationStatus,
  WeeklyScheduleResponse
} from '@/config/types/activities';
import { scheduleService } from './schedule/ScheduleService';
import { AttendanceService } from './attendance';
import { apiClient } from '@kindercare/core';

// Default mock data kept as fallback
const MOCK_MEALS_DB: StudentMealRecord[] = [
  { studentId: 'S01', studentName: 'Nguyễn Gia Bảo', studentAvatar: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=80&auto=format&fit=crop&q=60', breakfast: 'ALL', lunch: 'HALF', afternoonSnack: 'ALL', note: 'Ăn ngoan' },
  { studentId: 'S02', studentName: 'Trần Minh Anh', studentAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&auto=format&fit=crop&q=60', breakfast: 'NONE', lunch: 'ALL', afternoonSnack: 'HALF' },
  { studentId: 'S03', studentName: 'Lê Hải Đăng', studentAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&auto=format&fit=crop&q=60', breakfast: 'ALL', lunch: 'ALL', afternoonSnack: 'ALL' },
  { studentId: 'S04', studentName: 'Phạm Ngọc Diệp', studentAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=60', breakfast: 'HALF', lunch: 'ALL', afternoonSnack: 'NONE', note: 'Kén ăn rau' }
];

const MOCK_ACTIVITIES_DB: StudentActivityRecord[] = [
  { studentId: 'S01', studentName: 'Nguyễn Gia Bảo', studentAvatar: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=80&auto=format&fit=crop&q=60', nap: 'GOOD', participation: 'ACTIVE' },
  { studentId: 'S02', studentName: 'Trần Minh Anh', studentAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&auto=format&fit=crop&q=60', nap: 'POOR', participation: 'NORMAL', note: 'Bé hơi mệt' },
  { studentId: 'S03', studentName: 'Lê Hải Đăng', studentAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&auto=format&fit=crop&q=60', nap: 'GOOD', participation: 'ACTIVE' },
  { studentId: 'S04', studentName: 'Phạm Ngọc Diệp', studentAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=60', nap: 'POOR', participation: 'TIRED' }
];

let mockMealsState = [...MOCK_MEALS_DB];
let mockActivitiesState = [...MOCK_ACTIVITIES_DB];
let mockMenuState: MenuOfTheDay = {
  breakfastMenu: 'Cháo sườn heo nóng hổi xay nhuyễn hạt sen.',
  lunchMenu: 'Cơm tẻ dẻo thơm, sườn sốt chua ngọt, canh rau ngót thịt bằm, tráng miệng chuối chín.',
  afternoonSnackMenu: 'Sữa tươi tiệt trùng và bánh bông lan trứng muối mềm.'
};

const menuByDate: Record<string, MenuOfTheDay> = {};

export class ActivitiesService {
  /**
   * Fetch the general menu of the day.
   */
  public static async getMenuOfTheDay(classId: string, date: string): Promise<MenuOfTheDay> {
    try {
      let realDate = date;
      if (date === 'today') {
        const now = new Date();
        realDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
      }
      
      const [year, month, day] = realDate.split('-').map(Number);
      const dateSeconds = Math.floor(Date.UTC(year, month - 1, day) / 1000);

      const res = await apiClient.get(`/teacher/classes/${classId}/menu?date=${dateSeconds}`);
      if (res.data?.data) {
        return {
          breakfastMenu: res.data.data.breakfastMenu || '',
          lunchMenu: res.data.data.lunchMenu || '',
          afternoonSnackMenu: res.data.data.afternoonSnackMenu || ''
        };
      }
      return { breakfastMenu: '', lunchMenu: '', afternoonSnackMenu: '' };
    } catch (error: any) {
      console.warn('Backend API not ready yet (Menu):', error?.message || 'Unknown error');
      return { breakfastMenu: '', lunchMenu: '', afternoonSnackMenu: '' };
    }
  }

  /**
   * Update the daily menu.
   */
  public static async updateMenuOfTheDay(classId: string, date: string, menu: MenuOfTheDay): Promise<boolean> {
    try {
      let realDate = date;
      if (date === 'today') {
        const now = new Date();
        realDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
      }
      const [year, month, day] = realDate.split('-').map(Number);
      const dateSeconds = Math.floor(Date.UTC(year, month - 1, day) / 1000);

      await apiClient.put(`/teacher/classes/${classId}/menu`, {
        date: dateSeconds,
        breakfastMenu: menu.breakfastMenu,
        lunchMenu: menu.lunchMenu,
        afternoonSnackMenu: menu.afternoonSnackMenu
      });
      return true;
    } catch (error) {
      console.error('Error updating menu:', error);
      return false;
    }
  }

  /**
   * Fetch daily meal records for all kids in a class.
   */
  public static async getStudentMealRecords(classId: string, date: string): Promise<StudentMealRecord[]> {
    try {
      let realDate = date;
      if (date === 'today') {
        const now = new Date();
        realDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
      }
      const students = await AttendanceService.getDailyAttendance(classId, realDate);
      
      if (students && students.length > 0) {
        return students
          .filter(s => s.attendanceStatus !== 'PERMISSION_ABSENCE' && s.attendanceStatus !== 'UNEXCUSED_ABSENCE')
          .map(s => {
            let breakfast = 'ALL';
            let lunch = 'ALL';
            if (s.eatingStatus === 'Ăn chậm') { breakfast = 'HALF'; lunch = 'HALF'; }
            if (s.eatingStatus === 'Bỏ bữa') { breakfast = 'NONE'; lunch = 'NONE'; }
            return {
              studentId: String(s.id),
              studentName: s.name,
              avatarUrl: s.avatar || 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=80&auto=format&fit=crop&q=60',
              breakfast: breakfast as MealStatus,
              lunch: lunch as MealStatus,
              afternoonSnack: 'ALL',
              note: s.teacherNote || '',
              photoUrl: s.photoUrl || undefined
            };
          });
      }
      return [...mockMealsState];
    } catch (e) {
      console.error('Error fetching students for meals, fallback to mock:', e);
      return [...mockMealsState];
    }
  }

  /**
   * Bulk update student meal intake records.
   */
  public static async updateStudentMealRecords(
    classId: string,
    date: string,
    records: StudentMealRecord[]
  ): Promise<boolean> {
    try {
      let realDate = date;
      if (date === 'today') {
        const now = new Date();
        realDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
      }
      const [year, month, day] = realDate.split('-').map(Number);
      const dateSeconds = Math.floor(Date.UTC(year, month - 1, day) / 1000);

      const mealData = records.map(r => {
        let breakfastStatus = 'Ăn hết suất';
        if (r.breakfast === 'HALF') breakfastStatus = 'Ăn chậm';
        if (r.breakfast === 'NONE') breakfastStatus = 'Bỏ bữa';

        let lunchStatus = 'Ăn hết suất';
        if (r.lunch === 'HALF') lunchStatus = 'Ăn chậm';
        if (r.lunch === 'NONE') lunchStatus = 'Bỏ bữa';

        let snackStatus = 'Ăn hết suất';
        if (r.afternoonSnack === 'HALF') snackStatus = 'Ăn chậm';
        if (r.afternoonSnack === 'NONE') snackStatus = 'Bỏ bữa';

        return {
          studentId: Number(r.studentId),
          breakfastStatus,
          lunchStatus,
          snackStatus,
          teacherNote: r.note?.trim() || undefined,
          photoUrl: r.photoUrl
        };
      });

      await apiClient.post('/teacher/attendance/meals', {
        classId: Number(classId),
        date: dateSeconds,
        mealData
      });
      return true;
    } catch (e) {
      console.error('Error updating meals:', e);
      return false;
    }
  }

  /**
   * Fetch daily activity tracking records for all kids in a class.
   */
  public static async getStudentActivityRecords(classId: string, date: string): Promise<StudentActivityRecord[]> {
    try {
      let realDate = date;
      if (date === 'today') {
        const now = new Date();
        realDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
      }
      const students = await AttendanceService.getDailyAttendance(classId, realDate);
      
      if (students && students.length > 0) {
        return students
          .filter(s => s.attendanceStatus !== 'PERMISSION_ABSENCE' && s.attendanceStatus !== 'UNEXCUSED_ABSENCE')
          .map(s => {
            let nap = 'GOOD';
            if (s.sleepingStatus === 'Khó ngủ') nap = 'POOR';
            if (s.sleepingStatus === 'Không ngủ') nap = 'NONE';

            let participation = 'ACTIVE';
            if (s.teacherNote?.includes('quan sát')) participation = 'NORMAL';
            if (s.teacherNote?.includes('Mệt mỏi')) participation = 'TIRED';

            let note = s.teacherNote?.replace('Vui chơi tích cực. ', '').replace('Chỉ quan sát bạn chơi. ', '').replace('Mệt mỏi, ít tham gia. ', '') || '';

            return {
              studentId: String(s.id),
              studentName: s.name,
              studentAvatar: s.avatar || 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=80&auto=format&fit=crop&q=60',
              nap: nap as NapStatus,
              participation: participation as ParticipationStatus,
              note: note.trim(),
              photoUrl: s.photoUrl || undefined
            };
          });
      }
      return [...mockActivitiesState];
    } catch (e) {
      console.error('Error fetching students for activities, fallback to mock:', e);
      return [...mockActivitiesState];
    }
  }

  /**
   * Bulk update student activity tracking records.
   */
  public static async updateStudentActivityRecords(
    classId: string,
    date: string,
    records: StudentActivityRecord[]
  ): Promise<boolean> {
    try {
      let realDate = date;
      if (date === 'today') {
        const now = new Date();
        realDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
      }
      const [year, month, day] = realDate.split('-').map(Number);
      const dateSeconds = Math.floor(Date.UTC(year, month - 1, day) / 1000);

      const activityData = records.map(r => {
        let napStatus = 'Ngủ ngoan';
        if (r.nap === 'POOR') napStatus = 'Khó ngủ';
        if (r.nap === 'NONE') napStatus = 'Không ngủ';

        let hygieneStatus = 'Bình thường';

        let teacherNote = '';
        if (r.participation === 'ACTIVE') teacherNote += 'Vui chơi tích cực. ';
        if (r.participation === 'NORMAL') teacherNote += 'Chỉ quan sát bạn chơi. ';
        if (r.participation === 'TIRED') teacherNote += 'Mệt mỏi, ít tham gia. ';
        if (r.note) teacherNote += r.note;

        return {
          studentId: Number(r.studentId),
          napStatus,
          hygieneStatus,
          teacherNote: teacherNote.trim(),
          photoUrl: r.photoUrl
        };
      });

      await apiClient.post('/teacher/attendance/activities', {
        classId: Number(classId),
        date: dateSeconds,
        activityData
      });
      return true;
    } catch (e) {
      console.error('Error updating activities:', e);
      return false;
    }
  }

  /**
   * Fetch the weekly schedule for a class from real API.
   */
  public static async getWeeklySchedule(classId: string, date: string): Promise<WeeklyScheduleResponse | null> {
    try {
      let realDate = date;
      if (date === 'today') {
        const now = new Date();
        realDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
      }
      
      const [year, month, day] = realDate.split('-').map(Number);
      const dateSeconds = Math.floor(Date.UTC(year, month - 1, day) / 1000);

      const res = await apiClient.get(`/teacher/classes/${classId}/schedule/weekly?date=${dateSeconds}`);
      if (res.data?.data) {
        return res.data.data;
      }
      return null;
    } catch (e: any) {
      console.warn('Backend API not ready yet (Weekly Schedule):', e?.message || 'Unknown error');
      return null;
    }
  }

  /**
   * Fetch daily schedule items for a class from real API.
   */
  public static async getDailySchedule(classId: string, date: string): Promise<ScheduleItem[]> {
    try {
      let realDate = date;
      if (date === 'today') {
        const now = new Date();
        realDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
      }
      
      const [year, month, day] = realDate.split('-').map(Number);
      const dateSeconds = Math.floor(Date.UTC(year, month - 1, day) / 1000);

      const domainSchedules = await scheduleService.getSchedule(classId, dateSeconds);
      
      return domainSchedules.map((schedule) => {
        return {
          id: String(schedule.dailyScheduleId),
          timeSlot: `${schedule.startTime} - ${schedule.endTime}`,
          activityName: schedule.activityName,
          completed: schedule.status === 'COMPLETED' || schedule.status === 'Xong',
        };
      });
    } catch (e) {
      console.error('Error fetching schedule, fallback to empty:', e);
      return [];
    }
  }

  /**
   * Upload an image to the backend and return the URL
   */
  public static async uploadImage(file: File): Promise<string | null> {
    try {
      const formData = new FormData();
      formData.append('image', file);
      const response = await apiClient.post('/teacher/upload', formData);
      return response.data?.data?.url || null;
    } catch (e) {
      console.error('Error uploading image:', e);
      return null;
    }
  }

  /**
   * Update schedule items.
   */
  public static async updateDailySchedule(classId: string, date: string, items: ScheduleItem[]): Promise<boolean> {
    try {
      await Promise.all(
        items.map(item => scheduleService.updateScheduleStatus(classId, item.id, item.completed))
      );
      return true;
    } catch (e) {
      console.error('Error updating daily schedule:', e);
      return false;
    }
  }
}

const MOCK_SCHEDULE_DB: ScheduleItem[] = [
  { id: '1', timeSlot: '07:15 - 08:00', activityName: 'Đón trẻ & Kiểm tra vệ sinh sáng', completed: true },
  { id: '2', timeSlot: '08:00 - 08:30', activityName: 'Thể dục buổi sáng ngoài sân', completed: true, classPhoto: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&auto=format&fit=crop&q=60' },
  { id: '3', timeSlot: '08:30 - 09:00', activityName: 'Ăn sáng & Vệ sinh cá nhân', completed: true },
  { id: '4', timeSlot: '09:00 - 10:15', activityName: 'Học tập chuyên đề: Nhận biết con vật', completed: false },
  { id: '5', timeSlot: '10:15 - 11:15', activityName: 'Vui chơi tự do ở góc học tập', completed: false },
  { id: '6', timeSlot: '11:15 - 12:00', activityName: 'Ăn trưa & chuẩn bị giờ ngủ trưa', completed: false },
  { id: '7', timeSlot: '12:00 - 14:00', activityName: 'Giấc ngủ trưa của trẻ', completed: false },
  { id: '8', timeSlot: '14:00 - 14:30', activityName: 'Ăn xế chiều', completed: false },
  { id: '9', timeSlot: '14:30 - 16:00', activityName: 'Hoạt động kể chuyện cổ tích', completed: false },
  { id: '10', timeSlot: '16:00 - 17:00', activityName: 'Vệ sinh & Trả trẻ cho phụ huynh', completed: false }
];

let mockScheduleState = [...MOCK_SCHEDULE_DB];
