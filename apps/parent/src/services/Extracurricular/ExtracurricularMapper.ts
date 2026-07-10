import {
  ExtracurricularActivityApiDto,
  ExtracurricularActivityDomainModel,
  ExtracurricularEnrollmentApiDto,
  ExtracurricularEnrollmentDomainModel,
} from '@/config/types/extracurricular';

const toNumber = (value: unknown): number => {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
};

export class ExtracurricularMapper {
  static activityToDomain(dto: ExtracurricularActivityApiDto): ExtracurricularActivityDomainModel {
    return {
      activityId: dto.activityId,
      activityName: dto.activityName,
      monthlyFee: toNumber(dto.monthlyFee),
      description: dto.description,
    };
  }

  static activityToDomainList(dtos: ExtracurricularActivityApiDto[]): ExtracurricularActivityDomainModel[] {
    return dtos.map(ExtracurricularMapper.activityToDomain);
  }

  static enrollmentToDomain(dto: ExtracurricularEnrollmentApiDto): ExtracurricularEnrollmentDomainModel {
    return {
      enrollmentId: dto.enrollmentId,
      activityId: dto.activityId,
      activityName: dto.activityName,
      monthlyFee: toNumber(dto.monthlyFee),
      registeredMonth: dto.registeredMonth,
      status: dto.status,
      createdAt: dto.createdAt,
      feeRefunded: dto.feeRefunded,
      activatedAt: dto.activatedAt,
      invoiceId: dto.invoiceId,
    };
  }

  static enrollmentToDomainList(dtos: ExtracurricularEnrollmentApiDto[]): ExtracurricularEnrollmentDomainModel[] {
    return dtos.map(ExtracurricularMapper.enrollmentToDomain);
  }
}
