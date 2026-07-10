import { EventApiDto, EventDomainModel } from '@/config/types/event';

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
