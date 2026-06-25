import { ScheduleApiDto, ScheduleDomainModel } from '@/config/types/schedule';

export class ScheduleMapper {
  static formatTime(timeStr: string): string {
    if (!timeStr) return '';
    // timeStr from DB could be "08:00:00"
    const parts = timeStr.split(':');
    if (parts.length >= 2) {
      return `${parts[0]}:${parts[1]}`;
    }
    return timeStr;
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
