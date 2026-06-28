import { ActivityType } from './dailySchedule';

export interface ChildHeroInfo {
  name: string;
  className: string;
  teacher: string;
  branch: string;
  statusTags: { label: string; type: 'green' | 'blue' | 'neutral' | 'yellow' }[];
  checkinTime: string;
  checkinSub: string;
  attendanceStatus: 'not_started' | 'studying' | 'checked_out' | 'excused' | 'absent' | 'holiday';
  academicYear?: string;
}

export interface ScheduleItem {
  id: string;
  time: string;
  endTime: string;
  title: string;
  note: string;
  icon: string;
  color: string;
  activityType: ActivityType;
}

export interface FeeInfo {
  title: string;
  deadline: string;
  amount: number;
  daysLeft: number;
}

export interface AttendanceStats {
  percentage: number;
  present: number;
  absent: number;
  excused: number;
  totalDays: number;
}

export interface CalendarDay {
  day: number;
  status: 'present' | 'absent' | 'excused' | 'holiday' | 'weekend' | 'none';
  checkinTime?: string;
  checkoutTime?: string;
}

export interface UrgentNotice {
  id: string;
  severity: 'urgent' | 'important' | 'info';
  title: string;
  detail: string;
  date: string;
  icon: string;
}

export interface AlbumPhoto {
  id: string;
  caption: string;
  time: string;
  color: string;
  icon: string;
  photoUrl?: string;
}

export interface DailyLesson {
  id: string;
  subject: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface MessageInfo {
  id: string;
  sender: string;
  avatar: string;
  preview: string;
  time: string;
  unread: boolean;
  avatarColor?: string;
  isMe?: boolean;
}
