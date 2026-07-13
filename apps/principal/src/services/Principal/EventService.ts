import { apiClient, ApiResponse, SERVER } from '@kindercare/core';
import {
  EventDto,
  EventFilters,
  CreateEventPayload,
  UpdateEventPayload,
  HolidayDto,
  HolidayFilters,
  CreateHolidayPayload,
  UpdateHolidayPayload,
} from '@/config/types/event';

class EventService {
  async getEvents(filters?: EventFilters): Promise<EventDto[]> {
    const { data: res } = await apiClient.get<ApiResponse<EventDto[]>>(SERVER.principal.getEvents, {
      params: filters,
    });
    if (!res.success) {
      throw new Error(res.message);
    }
    return res.data || [];
  }

  async createEvent(payload: CreateEventPayload): Promise<EventDto> {
    const { data: res } = await apiClient.post<ApiResponse<EventDto>>(SERVER.principal.createEvent, payload);
    if (!res.success) {
      throw new Error(res.message);
    }
    return res.data;
  }

  async updateEvent(id: number, payload: UpdateEventPayload): Promise<EventDto> {
    const url = SERVER.principal.updateEvent.replace(':id', String(id));
    const { data: res } = await apiClient.patch<ApiResponse<EventDto>>(url, payload);
    if (!res.success) {
      throw new Error(res.message);
    }
    return res.data;
  }

  async deleteEvent(id: number): Promise<void> {
    const url = SERVER.principal.deleteEvent.replace(':id', String(id));
    const { data: res } = await apiClient.delete<ApiResponse<null>>(url);
    if (!res.success) {
      throw new Error(res.message);
    }
  }

  async getHolidays(filters?: HolidayFilters): Promise<HolidayDto[]> {
    const { data: res } = await apiClient.get<ApiResponse<HolidayDto[]>>(SERVER.principal.getHolidays, {
      params: filters,
    });
    if (!res.success) {
      throw new Error(res.message);
    }
    return res.data || [];
  }

  async createHoliday(payload: CreateHolidayPayload): Promise<HolidayDto> {
    const { data: res } = await apiClient.post<ApiResponse<HolidayDto>>(SERVER.principal.createHoliday, payload);
    if (!res.success) {
      throw new Error(res.message);
    }
    return res.data;
  }

  async updateHoliday(id: number, payload: UpdateHolidayPayload): Promise<void> {
    const url = SERVER.principal.updateHoliday.replace(':id', String(id));
    const { data: res } = await apiClient.patch<ApiResponse<null>>(url, payload);
    if (!res.success) {
      throw new Error(res.message);
    }
  }

  async deleteHoliday(id: number): Promise<void> {
    const url = SERVER.principal.deleteHoliday.replace(':id', String(id));
    const { data: res } = await apiClient.delete<ApiResponse<null>>(url);
    if (!res.success) {
      throw new Error(res.message);
    }
  }
}

export const eventService = new EventService();
