import { StudentMealRecord, StudentActivityRecord, MenuOfTheDay, MealStatus, NapStatus, ParticipationStatus, ScheduleItem } from '@/config/types/activities';
import { scheduleService } from './schedule/ScheduleService';
import { AttendanceService } from './attendance';
import { apiClient } from '@kindercare/core';

// Default mock data kept as fallback
const MOCK_MEALS_DB: StudentMealRecord[] = [
  { studentId: 'S01', studentName: 'Nguyễn Gia Bảo', avatarUrl: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=80&auto=format&fit=crop&q=60', breakfast: 'ALL', lunch: 'HALF', afternoonSnack: 'ALL', note: 'Ăn ngoan' },
  { studentId: 'S02', studentName: 'Trần Minh Anh', avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&auto=format&fit=crop&q=60', breakfast: 'NONE', lunch: 'ALL', afternoonSnack: 'HALF' },
  { studentId: 'S03', studentName: 'Lê Hải Đăng', avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&auto=format&fit=crop&q=60', breakfast: 'ALL', lunch: 'ALL', afternoonSnack: 'ALL' },
  { studentId: 'S04', studentName: 'Phạm Ngọc Diệp', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=60', breakfast: 'HALF', lunch: 'ALL', afternoonSnack: 'NONE', note: 'Kén ăn rau' }
];

const MOCK_ACTIVITIES_DB: StudentActivityRecord[] = [
  { studentId: 'S01', studentName: 'Nguyễn Gia Bảo', avatarUrl: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=80&auto=format&fit=crop&q=60', nap: 'GOOD', participation: 'ACTIVE' },
  { studentId: 'S02', studentName: 'Trần Minh Anh', avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&auto=format&fit=crop&q=60', nap: 'RESTLESS', participation: 'OBSERVING', note: 'Bé hơi mệt' },
  { studentId: 'S03', studentName: 'Lê Hải Đăng', avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&auto=format&fit=crop&q=60', nap: 'GOOD', participation: 'ACTIVE' },
  { studentId: 'S04', studentName: 'Phạm Ngọc Diệp', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=60', nap: 'POOR', participation: 'TIRED' }
];

let mockMealsState = [...MOCK_MEALS_DB];
let mockActivitiesState = [...MOCK_ACTIVITIES_DB];
let mockMenuState: MenuOfTheDay = {
  breakfastMenu: 'Cháo sườn heo nóng hổi xay nhuyễn hạt sen.',
  lunchMenu: 'Cơm tẻ dẻo thơm, sườn sốt chua ngọt, canh rau ngót thịt bằm, tráng miệng chuối chín.',
  afternoonSnackMenu: 'Sữa tươi tiệt trùng và bánh bông lan trứng muối mềm.'
};

export class ActivitiesService {
  /**
   * Fetch the general menu of the day.
   */
  public static async getMenuOfTheDay(date: string): Promise<MenuOfTheDay> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return { ...mockMenuState };
  }

  /**
   * Update the daily menu.
   */
  public static async updateMenuOfTheDay(date: string, menu: MenuOfTheDay): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 250));
    mockMenuState = { ...menu };
    return true;
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
              afternoonSnack: 'ALL'
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
        let eatingStatus = 'Ăn hết suất';
        if (r.lunch === 'HALF' || r.breakfast === 'HALF') eatingStatus = 'Ăn chậm';
        if (r.lunch === 'NONE' || r.breakfast === 'NONE') eatingStatus = 'Bỏ bữa';

        return {
          studentId: r.studentId,
          eatingStatus
        };
      });

      await apiClient.post('/teacher/attendance/meals', {
        classId,
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
            if (s.sleepingStatus === 'Khó ngủ') nap = 'RESTLESS';
            if (s.sleepingStatus === 'Không ngủ') nap = 'POOR';

            let participation = 'ACTIVE';
            if (s.teacherNote?.includes('quan sát')) participation = 'OBSERVING';
            if (s.teacherNote?.includes('Mệt mỏi')) participation = 'TIRED';

            let note = s.teacherNote?.replace('Vui chơi tích cực. ', '').replace('Chỉ quan sát bạn chơi. ', '').replace('Mệt mỏi, ít tham gia. ', '') || '';

            return {
              studentId: String(s.id),
              studentName: s.name,
              avatarUrl: s.avatar || 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=80&auto=format&fit=crop&q=60',
              nap: nap as NapStatus,
              participation: participation as ParticipationStatus,
              note: note.trim()
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
        let sleepingStatus = 'Ngủ ngoan';
        if (r.nap === 'RESTLESS') sleepingStatus = 'Khó ngủ';
        if (r.nap === 'POOR') sleepingStatus = 'Không ngủ';

        let hygieneStatus = 'Bình thường';

        let teacherNote = '';
        if (r.participation === 'ACTIVE') teacherNote += 'Vui chơi tích cực. ';
        if (r.participation === 'OBSERVING') teacherNote += 'Chỉ quan sát bạn chơi. ';
        if (r.participation === 'TIRED') teacherNote += 'Mệt mỏi, ít tham gia. ';
        if (r.note) teacherNote += r.note;

        return {
          studentId: r.studentId,
          sleepingStatus,
          hygieneStatus,
          teacherNote: teacherNote.trim()
        };
      });

      await apiClient.post('/teacher/attendance/activities', {
        classId,
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
      console.error('Error fetching real schedule API, fallback to mock:', e);
      return [...mockScheduleState];
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
