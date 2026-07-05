import type {
  LessonPlanApiDto,
  LessonPlanDomainModel,
  LessonPlanItemApiDto,
  LessonPlanItemDomainModel,
} from '@/config/types/lessonPlanApi';

const numToBig = (n: number | null | undefined): bigint | null =>
  n === null || n === undefined ? null : BigInt(n);

const numToBigRequired = (n: number): bigint => BigInt(n);

export class LessonPlanMapper {
  static itemToDomain(dto: LessonPlanItemApiDto): LessonPlanItemDomainModel {
    return {
      itemId: dto.itemId,
      lessonPlanId: dto.lessonPlanId,
      dayOfWeek: dto.dayOfWeek,
      subject: dto.subject,
      startTime: dto.startTime ?? null,
      endTime: dto.endTime ?? null,
      title: dto.title,
      objective: dto.objective ?? null,
      activityDetails: dto.activityDetails ?? null,
      materials: dto.materials ?? null,
      teacherNote: dto.teacherNote ?? null,
      isCompleted: !!dto.isCompleted,
      completedAt: numToBig(dto.completedAt),
      orderIndex: dto.orderIndex,
    };
  }

  static toDomain(dto: LessonPlanApiDto): LessonPlanDomainModel {
    return {
      lessonPlanId: dto.lessonPlanId,
      teacherId: dto.teacherId,
      classId: dto.classId,
      yearId: dto.yearId,
      weekNumber: dto.weekNumber,
      year: dto.year,
      weekStartDate: numToBigRequired(dto.weekStartDate),
      weekEndDate: numToBigRequired(dto.weekEndDate),
      weekTheme: dto.weekTheme ?? null,
      monthTheme: dto.monthTheme ?? null,
      weeklyGoal: dto.weeklyGoal ?? null,
      note: dto.note ?? null,
      status: dto.status,
      submittedAt: numToBig(dto.submittedAt),
      reviewedById: dto.reviewedById ?? null,
      reviewedAt: numToBig(dto.reviewedAt),
      reviewerComment: dto.reviewerComment ?? null,
      createdAt: numToBigRequired(dto.createdAt),
      updatedAt: numToBigRequired(dto.updatedAt),
      items: (dto.items ?? []).map(LessonPlanMapper.itemToDomain),
      teacherName: dto.teacherName,
      className: dto.className,
      reviewerName: dto.reviewerName,
    };
  }

  static toDomainList(dtos: LessonPlanApiDto[]): LessonPlanDomainModel[] {
    return dtos.map(LessonPlanMapper.toDomain);
  }
}