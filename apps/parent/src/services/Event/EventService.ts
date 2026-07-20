import { apiClient, ApiResponse, SERVER } from '@kindercare/core';
import { DailyEventsResponseDto, EventDomainModel, HolidayDomainModel } from '@/config/types/event';
import { mapEvent, mapHoliday } from './EventMapper';

export interface DailyEventsResult {
  events: EventDomainModel[];
  holidays: HolidayDomainModel[];
}

class EventService {
  /** Events + holidays of one day. `date` in YYYY-MM-DD. */
  async getDailyEvents(studentId: number, date: string): Promise<DailyEventsResult> {
    const url = `${SERVER.parent.getDailyEvents}?studentId=${studentId}&date=${date}`;
    const { data: res } = await apiClient.get<ApiResponse<DailyEventsResponseDto>>(url);
    if (!res.success) throw new Error(res.message);
    return {
      events: (res.data?.events ?? []).map(mapEvent),
      holidays: (res.data?.holidays ?? []).map(mapHoliday),
    };
  }

  /** Events + holidays overlapping [startDate, endDate], both in YYYY-MM-DD. */
  async getEventsInRange(studentId: number, startDate: string, endDate: string): Promise<DailyEventsResult> {
    const url = `${SERVER.parent.getDailyEvents}?studentId=${studentId}&startDate=${startDate}&endDate=${endDate}`;
    const { data: res } = await apiClient.get<ApiResponse<DailyEventsResponseDto>>(url);
    if (!res.success) throw new Error(res.message);
    return {
      events: (res.data?.events ?? []).map(mapEvent),
      holidays: (res.data?.holidays ?? []).map(mapHoliday),
    };
  }
}

export const eventService = new EventService();
