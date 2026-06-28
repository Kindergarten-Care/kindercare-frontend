import { AssessmentApiDto, AssessmentDomainModel } from '@/config/types/assessment';

export class AssessmentMapper {
  static toDomain(dto: AssessmentApiDto): AssessmentDomainModel {
    return {
      assessmentId: dto.assessmentId,
      studentId: dto.studentId,
      assessmentMonth: dto.assessmentMonth,
      physicalScore: dto.physicalScore,
      cognitiveScore: dto.cognitiveScore,
      languageScore: dto.languageScore,
      socioEmotionalScore: dto.socioEmotionalScore,
      aestheticScore: dto.aestheticScore,
      teacherComment: dto.teacherComment,
      createdAt: BigInt(dto.createdAt),
    };
  }

  static toDomainList(dtos: AssessmentApiDto[]): AssessmentDomainModel[] {
    return dtos.map(dto => this.toDomain(dto));
  }
}
