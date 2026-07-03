import { apiClient, ApiResponse, SERVER } from '@kindercare/core';
import { DailyEventsResponseDto, EventDomainModel } from '@/config/types/event';
import { mapEvent } from './EventMapper';

class EventService {
  /** Events of one day. `date` in YYYY-MM-DD. */
  async getDailyEvents(studentId: number, date: string): Promise<EventDomainModel[]> {
    const url = `${SERVER.parent.getDailyEvents}?studentId=${studentId}&date=${date}`;
    const { data: res } = await apiClient.get<ApiResponse<DailyEventsResponseDto>>(url);
    if (!res.success) throw new Error(res.message);
    return (res.data?.events ?? []).map(mapEvent);
  }

  /** Events overlapping [startDate, endDate], both in YYYY-MM-DD. */
  async getEventsInRange(studentId: number, startDate: string, endDate: string): Promise<EventDomainModel[]> {
    const url = `${SERVER.parent.getDailyEvents}?studentId=${studentId}&startDate=${startDate}&endDate=${endDate}`;
    const { data: res } = await apiClient.get<ApiResponse<DailyEventsResponseDto>>(url);
    if (!res.success) throw new Error(res.message);
    return (res.data?.events ?? []).map(mapEvent);
  }
}

export const eventService = new EventService();
