export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

// School days only (Mon-Fri) - for kindergarten weekly schedule
export type SchoolDay = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';

export type ActivityType = 'pickup' | 'meal' | 'study' | 'nap' | 'play' | 'dropoff' | 'other';

export type WeeklyScheduleStatus = 'Draft' | 'Submitted' | 'UnderReview' | 'Approved' | 'Rejected' | 'RevisionRequested';

export interface WeeklyScheduleItem {
  itemId?: number;
  templateId?: number;
  dayOfWeek: DayOfWeek;
  startTime: string;
  endTime: string;
  activityName: string;
  activityType: ActivityType;
  details?: string | null;
  location?: string | null;
  orderIndex?: number;
  createdAt?: number;
  updatedAt?: number;
}

export interface WeeklyScheduleTemplate {
  templateId: number;
  classId: number;
  teacherId?: number;
  yearId: number;
  month: number;
  year: number;
  weekNumber: number;
  weekTheme?: string | null;
  weekStartDate?: string | null;
  weekEndDate?: string | null;
  status: WeeklyScheduleStatus;
  submittedAt?: number | null;
  reviewedById?: number | null;
  reviewedAt?: number | null;
  reviewerComment?: string | null;
  createdAt?: number;
  updatedAt?: number;
  itemCount?: number;
  items?: WeeklyScheduleItem[];
  hasPendingChangeRequest?: boolean;
  pendingChangeReason?: string | null;
}

export const ACTIVITY_TYPE_LABELS: Record<ActivityType, string> = {
  pickup: 'Đón bé',
  meal: 'Ăn uống',
  study: 'Học tập',
  nap: 'Ngủ trưa',
  play: 'Vui chơi',
  dropoff: 'Trả trẻ',
  other: 'Khác',
};

export const ACTIVITY_TYPE_COLORS: Record<ActivityType, string> = {
  pickup: '#3B82F6', // blue
  meal: '#F59E0B', // amber
  study: '#10B981', // green
  nap: '#8B5CF6', // purple
  play: '#EC4899', // pink
  dropoff: '#6366F1', // indigo
  other: '#6B7280', // gray
};

export const DAY_LABELS: Record<DayOfWeek, string> = {
  Monday: 'Thứ 2',
  Tuesday: 'Thứ 3',
  Wednesday: 'Thứ 4',
  Thursday: 'Thứ 5',
  Friday: 'Thứ 6',
  Saturday: 'Thứ 7',
  Sunday: 'Chủ nhật',
};

export const STATUS_LABELS: Record<WeeklyScheduleStatus, string> = {
  Draft: 'Nháp',
  Submitted: 'Chờ duyệt',
  UnderReview: 'Đang xem',
  Approved: 'Đã duyệt',
  Rejected: 'Từ chối',
  RevisionRequested: 'Cần sửa',
};

export const STATUS_COLORS: Record<WeeklyScheduleStatus, string> = {
  Draft: '#6B7280',
  Submitted: '#F59E0B',
  UnderReview: '#3B82F6',
  Approved: '#10B981',
  Rejected: '#EF4444',
  RevisionRequested: '#F97316',
};
