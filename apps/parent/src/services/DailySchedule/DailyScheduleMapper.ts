import { DailyScheduleApiDto, DailyScheduleDomainModel } from '@/config/types/dailySchedule';

export class DailyScheduleMapper {
  static toDomain(dto: DailyScheduleApiDto): DailyScheduleDomainModel {
    return {
      dailyScheduleId: dto.dailyScheduleId,
      classId: dto.classId,
      scheduleDate: BigInt(dto.scheduleDate),
      startTime: BigInt(dto.startTime),
      endTime: BigInt(dto.endTime),
      activityName: dto.activityName,
      details: dto.details,
      location: dto.location,
      activityType: dto.activityType,
      status: dto.status,
    };
  }

  static toDomainList(dtos: DailyScheduleApiDto[]): DailyScheduleDomainModel[] {
    return dtos.map(dto => this.toDomain(dto));
  }
}
