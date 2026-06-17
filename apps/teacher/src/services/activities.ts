import { StudentMealRecord, StudentActivityRecord, MenuOfTheDay, MealStatus, NapStatus, ParticipationStatus, ScheduleItem } from '@/config/types/activities';

// Mock student lists representing DB entries
const MOCK_MEALS_DB: StudentMealRecord[] = [
  {
    studentId: 'MN1-001',
    studentName: 'Nguyễn Gia Bảo',
    studentAvatar: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=80&auto=format&fit=crop&q=60',
    breakfast: 'ALL',
    lunch: 'ALL',
    afternoonSnack: 'ALL',
    note: '',
  },
  {
    studentId: 'MN1-02',
    studentName: 'Trần Minh Anh',
    studentAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&auto=format&fit=crop&q=60',
    breakfast: 'ALL',
    lunch: 'HALF',
    afternoonSnack: 'ALL',
    note: 'Kén rau xanh',
  },
  {
    studentId: 'MN1-03',
    studentName: 'Lê Hải Đăng',
    studentAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&auto=format&fit=crop&q=60',
    breakfast: 'ALL',
    lunch: 'ALL',
    afternoonSnack: 'ALL',
    note: '',
  },
  {
    studentId: 'MN1-04',
    studentName: 'Phạm Ngọc Diệp',
    studentAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=60',
    breakfast: 'HALF',
    lunch: 'ALL',
    afternoonSnack: 'NONE',
    note: 'Hơi mệt, đòi uống sữa thay ăn xế',
  },
  {
    studentId: 'MN1-05',
    studentName: 'Vũ Hoàng Long',
    studentAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=60',
    breakfast: 'ALL',
    lunch: 'ALL',
    afternoonSnack: 'ALL',
    note: '',
  },
  {
    studentId: 'MN1-06',
    studentName: 'Hoàng Thu Thủy',
    studentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=60',
    breakfast: 'ALL',
    lunch: 'ALL',
    afternoonSnack: 'ALL',
    note: '',
  },
  {
    studentId: 'MN1-07',
    studentName: 'Đặng Quang Minh',
    studentAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=60',
    breakfast: 'ALL',
    lunch: 'ALL',
    afternoonSnack: 'ALL',
    note: '',
  },
  {
    studentId: 'MN1-08',
    studentName: 'Bùi Khánh Linh',
    studentAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&auto=format&fit=crop&q=60',
    breakfast: 'ALL',
    lunch: 'ALL',
    afternoonSnack: 'ALL',
    note: '',
  }
];

const MOCK_ACTIVITIES_DB: StudentActivityRecord[] = [
  {
    studentId: 'MN1-001',
    studentName: 'Nguyễn Gia Bảo',
    studentAvatar: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=80&auto=format&fit=crop&q=60',
    nap: 'GOOD',
    participation: 'ACTIVE',
    note: 'Ngoan, tích cực phát biểu',
  },
  {
    studentId: 'MN1-02',
    studentName: 'Trần Minh Anh',
    studentAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&auto=format&fit=crop&q=60',
    nap: 'GOOD',
    participation: 'NORMAL',
    note: '',
  },
  {
    studentId: 'MN1-03',
    studentName: 'Lê Hải Đăng',
    studentAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&auto=format&fit=crop&q=60',
    nap: 'GOOD',
    participation: 'ACTIVE',
    note: '',
  },
  {
    studentId: 'MN1-04',
    studentName: 'Phạm Ngọc Diệp',
    studentAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=60',
    nap: 'POOR',
    participation: 'TIRED',
    note: 'Ngủ chập chờn, khóc nhè',
  },
  {
    studentId: 'MN1-05',
    studentName: 'Vũ Hoàng Long',
    studentAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=60',
    nap: 'GOOD',
    participation: 'NORMAL',
    note: '',
  },
  {
    studentId: 'MN1-06',
    studentName: 'Hoàng Thu Thủy',
    studentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=60',
    nap: 'GOOD',
    participation: 'NORMAL',
    note: '',
  },
  {
    studentId: 'MN1-07',
    studentName: 'Đặng Quang Minh',
    studentAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=60',
    nap: 'GOOD',
    participation: 'ACTIVE',
    note: '',
  },
  {
    studentId: 'MN1-08',
    studentName: 'Bùi Khánh Linh',
    studentAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&auto=format&fit=crop&q=60',
    nap: 'GOOD',
    participation: 'NORMAL',
    note: '',
  }
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
    await new Promise((resolve) => setTimeout(resolve, 300));
    return [...mockMealsState];
  }

  /**
   * Bulk update student meal intake records.
   */
  public static async updateStudentMealRecords(
    classId: string,
    date: string,
    records: StudentMealRecord[]
  ): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 400));
    mockMealsState = [...records];
    return true;
  }

  /**
   * Fetch daily activity tracking records for all kids in a class.
   */
  public static async getStudentActivityRecords(classId: string, date: string): Promise<StudentActivityRecord[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return [...mockActivitiesState];
  }

  /**
   * Bulk update student activity tracking records.
   */
  public static async updateStudentActivityRecords(
    classId: string,
    date: string,
    records: StudentActivityRecord[]
  ): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 400));
    mockActivitiesState = [...records];
    return true;
  }

  /**
   * Fetch daily schedule items for a class.
   */
  public static async getDailySchedule(classId: string, date: string): Promise<ScheduleItem[]> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return [...mockScheduleState];
  }

  /**
   * Update schedule items.
   */
  public static async updateDailySchedule(classId: string, date: string, items: ScheduleItem[]): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    mockScheduleState = [...items];
    return true;
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
