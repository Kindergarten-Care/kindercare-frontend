import { EventApiDto, EventDomainModel, HolidayApiDto, HolidayDomainModel } from '@/config/types/event';

export const mapEvent = (dto: EventApiDto): EventDomainModel => ({
  eventId: dto.eventId,
  title: dto.title,
  description: dto.description,
  startTime: new Date(dto.startTime * 1000),
  endTime: new Date(dto.endTime * 1000),
  location: dto.location,
  status: dto.status,
  eventType: dto.eventType,
});

export const mapHoliday = (dto: HolidayApiDto): HolidayDomainModel => ({
  holidayId: dto.holidayId,
  holidayDate: new Date(dto.holidayDate * 1000),
  holidayName: dto.holidayName,
});
