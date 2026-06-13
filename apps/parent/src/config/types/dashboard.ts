export interface ChildInfo {
  id: string;
  name: string;
  className: string;
  teacher: string;
  branch: string;
  avatarColor: string;
  avatarInitial: string;
  statusTags: { label: string; type: 'green' | 'blue' | 'neutral' | 'yellow' }[];
  checkinTime: string;
  checkinSub: string;
}

export interface ChildHeroInfo {
  name: string;
  className: string;
  teacher: string;
  branch: string;
  statusTags: { label: string; type: 'green' | 'blue' | 'neutral' | 'yellow' }[];
  checkinTime: string;
  checkinSub: string;
}

export interface ScheduleItem {
  id: string;
  time: string;
  endTime: string;
  title: string;
  note: string;
  icon: string;
  color: string;
}

export interface TimelineEvent {
  id: string;
  time: string;
  title: string;
  description: string;
  type: 'done' | 'current' | 'upcoming';
  icon: string;
  photos?: string[];
  isNow?: boolean;
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
  status: 'present' | 'absent' | 'holiday' | 'weekend' | 'none';
  checkinTime?: string;
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
}

export interface DailyLesson {
  id: string;
  subject: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface UpcomingEvent {
  id: string;
  day: number;
  month: string;
  title: string;
  timeOrAmount: string;
  tag: string;
  tagType: 'school' | 'payment' | 'holiday';
}

export interface ParentDashboardModel {
  children: ChildInfo[];
  activeChildIndex: number;
  childHero: ChildHeroInfo;
  schedule: ScheduleItem[];
  timeline: TimelineEvent[];
  messages: MessageInfo[];
  fee: FeeInfo;
  attendanceStats: AttendanceStats;
  calendarDays: CalendarDay[];
  urgentNotices: UrgentNotice[];
  albumPhotos: AlbumPhoto[];
  dailyLessons: DailyLesson[];
  upcomingEvents: UpcomingEvent[];
}
