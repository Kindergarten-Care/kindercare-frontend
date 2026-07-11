import {
  StudentMealRecord,
  StudentActivityRecord,
  MenuOfTheDay,
  ScheduleItem,
  WeeklyScheduleDetail,
  NapStatus,
  participationStatus,
  WeeklyScheduleResponse,
  MealStatus,
  ClassMenu,
  MenuDetail,
  WeeklyMenuResponse,
  WeeklyMenuDay,
  DayOfWeek
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

// Menu mẫu theo ngày trong tuần (fallback khi API lỗi)
const WEEKLY_MOCK_MENUS: Record<string, MenuOfTheDay> = {
  Monday: {
    breakfastMenu: '🍳 Bánh mì bơ tỏi\n🥛 Sữa tươi không đường',
    lunchMenu: '🍚 Cơm tẻ\n🍖 Thịt kho trứng\n🥬 Canh rau muống nấu tôm\n🍌 Trái cây theo mùa',
    afternoonSnackMenu: '🧀 Bánh flan sữa tươi'
  },
  Tuesday: {
    breakfastMenu: '🥣 Cháo gà hạt sen\n🥛 Sữa đậu nành',
    lunchMenu: '🍚 Cơm tẻ\n🐟 Cá thu sốt cà\n🥬 Rau luộc\n🍵 Canh khổ qua',
    afternoonSnackMenu: '🍵 Sữa đậu nành'
  },
  Wednesday: {
    breakfastMenu: '🍝 Nui xào thịt bằm\n🥛 Sữa tươi',
    lunchMenu: '🍚 Cơm tẻ\n🍗 Đùi gà chiên giòn\n🥗 Salad rau trộn\n🦀 Súp cua',
    afternoonSnackMenu: '🍮 Bánh flan'
  },
  Thursday: {
    breakfastMenu: '🍜 Phở bò\n🥛 Sữa tươi',
    lunchMenu: '🍚 Cơm tẻ\n🦐 Tôm hùm hấp\n🥬 Rau xào\n🍲 Canh cải thịt bằm',
    afternoonSnackMenu: '🍊 Nước ép cam'
  },
  Friday: {
    breakfastMenu: '🥟 Bánh bao nhân thịt\n🥛 Sữa tươi',
    lunchMenu: '🍚 Cơm tẻ\n🍖 Sườn non nấu sả\n🍳 Trứng chiên\n🥬 Canh bắp cải',
    afternoonSnackMenu: '🥮 Bánh pía'
  },
  Saturday: {
    breakfastMenu: '🍳 Trứng chiên\n🍞 Bánh mì\n🥛 Sữa',
    lunchMenu: '🍚 Cơm tẻ\n🍗 Gà hấp\n🥬 Rau luộc\n🍲 Canh rau',
    afternoonSnackMenu: '🍎 Trái cây'
  },
  Sunday: {
    breakfastMenu: '🥣 Cháo trứng\n🥛 Sữa',
    lunchMenu: '🍚 Cơm tẻ\n🐟 Cá chiên\n🥬 Rau xào\n🍲 Canh',
    afternoonSnackMenu: '🍮 Bánh ngọt'
  }
};

const menuByDate: Record<string, MenuOfTheDay> = {};

export class ActivitiesService {
  /**
   * Fetch the menu of the day from database.
   * The backend has historically returned several envelopes:
   *   1) `{ details: MenuDetail[] }` (current contract)
   *   2) `MenuDetail[]` (legacy / unboxed)
   *   3) `{ menuName, weekNumber, year, days: WeeklyMenuDay[] }` (new weekly shape)
   * We normalise all three into a flat list of MenuDetail grouped by mealType.
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
      const raw = res.data?.data;

      const todayDetails = ActivitiesService.extractMenuDetailsForDate(raw, year, month, day);

      if (todayDetails.length > 0) {
        const breakfastDishes = todayDetails
          .filter((d: any) => d.mealType === 'Breakfast')
          .map((d: any) => `🍳 ${d.dishName}${d.calories ? ` (${d.calories} kcal)` : ''}`)
          .join('\n');

        const lunchDishes = todayDetails
          .filter((d: any) => d.mealType === 'Lunch')
          .map((d: any) => `🍚 ${d.dishName}${d.calories ? ` (${d.calories} kcal)` : ''}`)
          .join('\n');

        const snackDishes = todayDetails
          .filter((d: any) => d.mealType === 'Snack')
          .map((d: any) => `🍮 ${d.dishName}${d.calories ? ` (${d.calories} kcal)` : ''}`)
          .join('\n');

        return {
          breakfastMenu: breakfastDishes || '🍳 (Chưa có thực đơn sáng)',
          lunchMenu: lunchDishes || '🍚 (Chưa có thực đơn trưa)',
          afternoonSnackMenu: snackDishes || '🍮 (Chưa có thực đơn xế chiều)'
        };
      }

      // Try the simple string format as a last resort.
      if (raw && typeof raw === 'object' && (raw.breakfastMenu || raw.lunchMenu || raw.afternoonSnackMenu)) {
        return {
          breakfastMenu: raw.breakfastMenu || '',
          lunchMenu: raw.lunchMenu || '',
          afternoonSnackMenu: raw.afternoonSnackMenu || ''
        };
      }
      return { breakfastMenu: '', lunchMenu: '', afternoonSnackMenu: '' };
    } catch (error: any) {
      console.warn('Backend API not ready yet (Menu):', error?.message || 'Unknown error');

      // Fallback: Sử dụng menu mock theo ngày trong tuần
      const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const currentDay = dayNames[new Date().getDay()];

      return WEEKLY_MOCK_MENUS[currentDay] || {
        breakfastMenu: '🍳 (Đang tải thực đơn...)',
        lunchMenu: '🍚 (Đang tải thực đơn...)',
        afternoonSnackMenu: '🍮 (Đang tải thực đơn...)'
      };
    }
  }

  /**
   * Fetch the weekly menu (Mon-Sun) for the week that contains the given date.
   * Returns grouped data ready for rendering the weekly grid.
   * Tolerates the same response shapes as `getMenuOfTheDay`.
   */
  public static async getWeeklyMenu(classId: string, date: string): Promise<WeeklyMenuResponse | null> {
    try {
      let realDate = date;
      if (date === 'today' || !date) {
        const now = new Date();
        realDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
      }

      const [year, month, day] = realDate.split('-').map(Number);
      const dateSeconds = Math.floor(Date.UTC(year, month - 1, day) / 1000);

      const res = await apiClient.get(`/teacher/classes/${classId}/menu/weekly?date=${dateSeconds}`);
      const raw = res.data?.data;

      const flat = ActivitiesService.flattenMenuResponse(raw);
      if (!flat || flat.length === 0) return null;

      // Propagate menu-level metadata if the response wraps it.
      const meta = raw && !Array.isArray(raw)
        ? { menuName: raw.menuName, weekNumber: raw.weekNumber, year: raw.year }
        : {};
      (flat as any).__meta = meta;

      return ActivitiesService.groupMenuDetailsByDay(flat);
    } catch (error: any) {
      console.warn('Backend API not ready yet (WeeklyMenu):', error?.message || 'Unknown error');
      return null;
    }
  }

  /**
   * Flatten any of the supported backend envelope shapes into a list of MenuDetail.
   *  - Array of MenuDetail
   *  - { details: MenuDetail[] }
   *  - { days: WeeklyMenuDay[] } → expand each meal group
   */
  public static flattenMenuResponse(raw: any): MenuDetail[] | null {
    if (!raw) return null;
    if (Array.isArray(raw)) {
      return raw as MenuDetail[];
    }
    if (Array.isArray(raw.details) && raw.details.length > 0) {
      return raw.details as MenuDetail[];
    }
    if (Array.isArray(raw.days) && raw.days.length > 0) {
      const out: MenuDetail[] = [];
      for (const d of raw.days) {
        if (!d) continue;
        const pushAll = (arr: any[], mealType: MenuDetail['mealType']) => {
          for (const item of arr || []) {
            out.push({
              menuDetailId: item.menuDetailId ?? item.id,
              menuId: item.menuId,
              dayOfWeek: d.dayOfWeek,
              mealType,
              dishName: item.dishName ?? item.name,
              calories: item.calories,
              nutritionalDetails: item.nutritionalDetails ?? item.details,
            });
          }
        };
        pushAll(d.breakfast, 'Breakfast');
        pushAll(d.lunch, 'Lunch');
        pushAll(d.snack, 'Snack');
      }
      return out.length > 0 ? out : null;
    }
    return null;
  }

  /**
   * Extract MenuDetails matching the target date from any of the supported shapes.
   */
  public static extractMenuDetailsForDate(raw: any, year: number, month: number, day: number): MenuDetail[] {
    const flat = ActivitiesService.flattenMenuResponse(raw);
    if (!flat || flat.length === 0) return [];
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDay = dayNames[new Date(year, month - 1, day).getDay()];
    return flat.filter((d: any) => d.dayOfWeek === currentDay);
  }

  /**
   * Group a flat list of menu details by day of week and meal type.
   */
  public static groupMenuDetailsByDay(data: any[]): WeeklyMenuResponse {
    const dayOrder: DayOfWeek[] = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday'
    ];

    const days: WeeklyMenuDay[] = dayOrder.map(dayOfWeek => ({
      dayOfWeek,
      breakfast: [],
      lunch: [],
      snack: []
    }));

    data.forEach((item: any) => {
      const dayIndex = dayOrder.indexOf(item.dayOfWeek);
      if (dayIndex < 0) return;
      const target = days[dayIndex];
      if (item.mealType === 'Breakfast') target.breakfast.push(item);
      else if (item.mealType === 'Lunch') target.lunch.push(item);
      else if (item.mealType === 'Snack') target.snack.push(item);
    });

    // Prefer top-level metadata if available on the raw payload, else from first item.
    const meta = (data as any).__meta ?? data[0] ?? {};

    return {
      menuName: meta.menuName,
      weekNumber: meta.weekNumber,
      year: meta.year,
      days
    };
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
        const breakfastStatus = r.breakfast === 'HALF' ? 'Ăn chậm' : r.breakfast === 'NONE' ? 'Bỏ bữa' : 'Ăn hết suất';
        const lunchStatus     = r.lunch === 'HALF' ? 'Ăn chậm' : r.lunch === 'NONE' ? 'Bỏ bữa' : 'Ăn hết suất';
        const snackStatus     = r.afternoonSnack === 'HALF' ? 'Ăn chậm' : r.afternoonSnack === 'NONE' ? 'Bỏ bữa' : 'Ăn hết suất';

        // BE expects a single combined status per student/meal. Take the worst
        // (NONE > HALF > ALL) across the three meals of the day.
        const rank = (s: string) => (s === 'Bỏ bữa' ? 3 : s === 'Ăn chậm' ? 2 : 1);
        const best = [breakfastStatus, lunchStatus, snackStatus].sort((a, b) => rank(b) - rank(a))[0];
        const teacherNote = (r.note ?? '').trim();

        return {
          studentId: Number(r.studentId),
          breakfastStatus,
          lunchStatus,
          snackStatus,
          eatingStatus: best,
          teacherNote: teacherNote || undefined,
          photoUrl: r.photoUrl || undefined
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
              participation: participation as participationStatus,
              activityStatus: (s as any).activityStatus,
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
        const napStatus = r.nap === 'POOR' ? 'Khó ngủ' : r.nap === 'NONE' ? 'Không ngủ' : 'Ngủ ngoan';
        const hygieneStatus = 'Bình thường';

        // Map participation enum (legacy / new) into the activityStatus string
        // the backend stores in DailyActivities.ActivityStatus.
        let activityStatus = 'Bình thường';
        switch (r.participation) {
          case 'ACTIVE':
          case 'Năng động':
            activityStatus = 'Năng động'; break;
          case 'TIRED':
          case 'Thụ động':
            activityStatus = 'Thụ động'; break;
          case 'NORMAL':
          case 'Bình thường':
            activityStatus = 'Bình thường'; break;
          case 'Hòa đồng':
            activityStatus = 'Hòa đồng'; break;
          case 'Không tham gia':
            activityStatus = 'Không tham gia'; break;
        }

        const teacherNote = (r.note ?? '').trim();

        return {
          studentId: Number(r.studentId),
          napStatus,
          hygieneStatus,
          activityStatus,
          teacherNote: teacherNote || undefined,
          photoUrl: r.photoUrl || undefined
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
      const payload = res.data?.data;
      if (!payload) return null;

      // Normalize BE shape { month, year, monthTheme, weeks: [{ weekOrder, weekTheme, days: {Monday: [...]}}] }
      // into FE shape { monthTheme, weekTheme, details: WeeklyScheduleDetail[] }.
      return ActivitiesService.normalizeWeeklySchedule(payload, dateSeconds);
    } catch (e: any) {
      console.warn('Backend API not ready yet (Weekly Schedule):', e?.message || 'Unknown error');
      return null;
    }
  }

  /**
   * Convert the nested BE weekly schedule payload into the flat shape the FE expects.
   * Picks the week that contains the target date (uses Monday of that ISO week).
   */
  private static normalizeWeeklySchedule(payload: any, dateSeconds: number): WeeklyScheduleResponse | null {
    if (!payload) return null;

    // Already in FE shape? (legacy / mocked)
    if (Array.isArray(payload.details)) {
      return payload as WeeklyScheduleResponse;
    }

    const weeks: any[] = Array.isArray(payload.weeks) ? payload.weeks : [];
    if (weeks.length === 0) return null;

    // Find which week contains the target date (Monday of that week).
    const target = new Date(dateSeconds * 1000);
    const targetDayOfWeek = target.getUTCDay(); // 0=Sun..6=Sat
    const mondayOffset = targetDayOfWeek === 0 ? -6 : 1 - targetDayOfWeek;
    const monday = new Date(target);
    monday.setUTCDate(monday.getUTCDate() + mondayOffset);
    monday.setUTCHours(0, 0, 0, 0);

    const selectedWeek = weeks.find((w: any) => {
      // weekOrder is 1-based (1 = first week of month). Approximate Monday = first day of month + 7*(order-1) days.
      const weekStart = new Date(Date.UTC(target.getUTCFullYear(), target.getUTCMonth(), 1));
      weekStart.setUTCDate(weekStart.getUTCDate() + 7 * ((w.weekOrder ?? 1) - 1));
      const weekEnd = new Date(weekStart);
      weekEnd.setUTCDate(weekEnd.getUTCDate() + 6);
      return monday >= weekStart && monday <= weekEnd;
    }) ?? weeks[0];

    const details: WeeklyScheduleDetail[] = [];
    const daysMap: Record<string, any[]> = selectedWeek?.days || {};
    const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    for (const day of dayOrder) {
      const slots = daysMap[day] || [];
      slots.forEach((slot: any, idx: number) => {
        details.push({
          id: `${selectedWeek.weekOrder}-${day}-${idx}`,
          dayOfWeek: day as WeeklyScheduleDetail['dayOfWeek'],
          startTime: slot.startTime,
          endTime: slot.endTime,
          activityName: slot.activityName,
          details: slot.details,
          location: undefined,
          activityType: (slot.activityType as WeeklyScheduleDetail['activityType']) ?? 'other'
        });
      });
    }

    return {
      monthTheme: payload.monthTheme ?? '',
      weekTheme: selectedWeek?.weekTheme ?? '',
      details
    };
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
