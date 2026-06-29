import { DailyLessonApiDto, DailyLessonDomainModel } from '@/config/types/dailyLesson';

export class DailyLessonMapper {
  static toDomain(dto: DailyLessonApiDto): DailyLessonDomainModel {
    return {
      lessonLogId: dto.lessonLogId,
      classId: dto.classId,
      lessonDate: BigInt(dto.lessonDate),
      subjectName: dto.subjectName,
      lessonTitle: dto.lessonTitle,
      details: dto.details,
      iconType: dto.iconType,
      createdAt: BigInt(dto.createdAt),
      updatedAt: BigInt(dto.updatedAt),
    };
  }

  static toDomainList(dtos: DailyLessonApiDto[]): DailyLessonDomainModel[] {
    return dtos.map(dto => this.toDomain(dto));
  }
}
