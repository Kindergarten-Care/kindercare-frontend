export interface ChildHeroInfo {
  name: string;
  className: string;
  teacher: string;
  branch: string;
  statusTags: { label: string; type: 'green' | 'blue' | 'neutral' }[];
  checkinTime: string;
  checkinSub: string;
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
  childHero: ChildHeroInfo;
  timeline: TimelineEvent[];
  messages: MessageInfo[];
  fee: FeeInfo;
  attendanceStats: AttendanceStats;
  upcomingEvents: UpcomingEvent[];
}
