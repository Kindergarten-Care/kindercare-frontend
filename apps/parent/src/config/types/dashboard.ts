export interface ChildStatus {
  id: string;
  name: string;
  class: string;
  weight: number; // in kg
  status: 'Đang ở lớp' | 'Chưa điểm danh' | 'Vắng mặt';
}

export interface Moment {
  id: string;
  url: string;
  type: 'activity' | 'painting' | 'outdoor' | 'other';
}

export interface TuitionStatus {
  month: number;
  amountDue: number; // in VND
}

export interface AttendanceStatus {
  month: number;
  days: {
    date: number; // 1-31
    status: 'Đúng giờ' | 'Vắng/Ốm' | 'Chưa có' | 'Nghỉ lễ';
  }[];
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  imageUrl: string;
  category: string;
}

export interface UpcomingEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
}

export interface PickupInfo {
  personName: string;
  relation: string;
  imageUrl: string;
  status: 'Chờ đón' | 'Đã đón';
}

export interface ParentDashboardModel {
  childStatus: ChildStatus;
  moments: Moment[];
  tuition: TuitionStatus;
  attendance: AttendanceStatus;
  news: NewsItem[];
  upcomingEvents: UpcomingEvent[];
  pickup: PickupInfo;
}
