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

export interface DailyEventsResponseDto {
  date: string | null;
  startDate?: string | null;
  endDate?: string | null;
  studentId: number;
  classId: number | null;
  events: EventApiDto[];
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
