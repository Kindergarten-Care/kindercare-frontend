import { ScheduleApiDto, ScheduleDomainModel } from '@/config/types/schedule';

export class ScheduleMapper {
  static formatTime(timeValue: string | number): string {
    if (!timeValue) return '';
    
    // If it's a number or a numeric string (timestamp)
    if (typeof timeValue === 'number' || !isNaN(Number(timeValue))) {
      const date = new Date(Number(timeValue) * 1000); // Assuming seconds from backend
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${hours}:${minutes}`;
    }
    
    // If it's already a time string like "08:00:00"
    if (typeof timeValue === 'string') {
      const parts = timeValue.split(':');
      if (parts.length >= 2) {
        return `${parts[0]}:${parts[1]}`;
      }
    }
    
    return String(timeValue);
  }

  static toDomain(dto: ScheduleApiDto): ScheduleDomainModel {
    return {
      dailyScheduleId: dto.dailyScheduleId,
      classId: dto.classId,
      scheduleDate: BigInt(dto.scheduleDate),
      startTime: this.formatTime(dto.startTime),
      endTime: this.formatTime(dto.endTime),
      activityName: dto.activityName,
      details: dto.details,
      location: dto.location,
      activityType: dto.activityType,
      status: dto.status,
    };
  }

  static toDomainList(dtos: ScheduleApiDto[]): ScheduleDomainModel[] {
    return dtos.map(dto => this.toDomain(dto));
  }
}
