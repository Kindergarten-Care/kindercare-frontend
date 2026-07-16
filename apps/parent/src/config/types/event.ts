export type EventType = 'Class' | 'School' | 'Holiday' | 'Student';

export interface EventApiDto {
  eventId: number;
  title: string;
  description: string | null;
  /** Unix seconds. */
  startTime: number;
  /** Unix seconds. */
  endTime: number;
  location: string | null;
  status: string;
  eventType: EventType;
}

export interface HolidayApiDto {
  holidayId: number;
  /** Unix seconds — a single day marker, not a range. */
  holidayDate: number;
  holidayName: string | null;
}

export interface DailyEventsResponseDto {
  date: string | null;
  startDate?: string | null;
  endDate?: string | null;
  studentId: number;
  classId: number | null;
  events: EventApiDto[];
  /** From the Holidays table (billing's source of truth) — independent from events of eventType='Holiday'. */
  holidays: HolidayApiDto[];
}

export interface EventDomainModel {
  eventId: number;
  title: string;
  description: string | null;
  startTime: Date;
  endTime: Date;
  location: string | null;
  status: string;
  eventType: EventType;
}

export interface HolidayDomainModel {
  holidayId: number;
  holidayDate: Date;
  holidayName: string | null;
}
