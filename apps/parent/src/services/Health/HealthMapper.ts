import { HealthRecordApiDto, HealthRecordDomainModel } from '@/config/types/health';

export class HealthMapper {
  static toDomain(dto: HealthRecordApiDto): HealthRecordDomainModel {
    return {
      recordId: dto.recordId,
      studentId: dto.studentId,
      termPeriod: dto.termPeriod,
      height: parseFloat(dto.height) || 0,
      weight: parseFloat(dto.weight) || 0,
      bmi: parseFloat(dto.bmi) || 0,
    };
  }

  static toDomainList(dtos: HealthRecordApiDto[]): HealthRecordDomainModel[] {
    return dtos.map(this.toDomain);
  }
}
