export type PrincipalEventType = 'Class' | 'School' | 'Holiday' | 'Student';

export interface EventDto {
  id: number;
  title: string;
  description: string | null;
  startTime: number;
  endTime: number;
  location: string | null;
  status: string;
  eventType: PrincipalEventType;
  createdBy: number | null;
  createdAt?: number;
  classIds: number[];
  studentIds: number[];
}

export interface EventFilters {
  eventType?: PrincipalEventType;
}

export interface CreateEventPayload {
  title: string;
  description?: string;
  startTime: number;
  endTime: number;
  location?: string;
  status?: string;
  eventType: PrincipalEventType;
  classIds?: number[];
  studentIds?: number[];
}

export interface UpdateEventPayload {
  title?: string;
  description?: string;
  startTime?: number;
  endTime?: number;
  location?: string;
  status?: string;
  eventType?: PrincipalEventType;
  classIds?: number[];
  studentIds?: number[];
}

export interface HolidayDto {
  id: number;
  holidayDate: number;
  holidayName: string | null;
  yearId: number | null;
  yearName: string | null;
}

export interface HolidayFilters {
  yearId?: number;
}

export interface CreateHolidayPayload {
  holidayDate: number;
  holidayName?: string;
  yearId?: number;
}

export interface UpdateHolidayPayload {
  holidayDate?: number;
  holidayName?: string;
  yearId?: number;
}
