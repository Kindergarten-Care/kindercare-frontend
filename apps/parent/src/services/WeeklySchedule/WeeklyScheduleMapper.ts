import { WeeklyScheduleApiDto, WeeklyScheduleDomainModel } from '@/config/types/weeklySchedule';

export class WeeklyScheduleMapper {
  static toDomain(dto: WeeklyScheduleApiDto): WeeklyScheduleDomainModel {
    return {
      monthlyScheduleId: dto.monthlyScheduleId,
      month: dto.month,
      year: dto.year,
      monthTheme: dto.monthTheme,
      weeklyScheduleId: dto.weeklyScheduleId,
      weekOrder: dto.weekOrder,
      weekTheme: dto.weekTheme,
      details: dto.details.map(d => ({
        scheduleDetailId: d.scheduleDetailId,
        dayOfWeek: d.dayOfWeek,
        startTime: d.startTime,
        endTime: d.endTime,
        activityName: d.activityName,
        details: d.details,
        location: d.location,
        activityType: d.activityType
      }))
    };
  }
}
