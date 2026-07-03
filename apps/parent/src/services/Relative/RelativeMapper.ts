import { RelativeApiDto, RelativeDomainModel } from '@/config/types/relative';

export class RelativeMapper {
  static toDomain(dto: RelativeApiDto): RelativeDomainModel {
    return {
      parentId: dto.parentId,
      fullName: dto.fullName,
      dateOfBirth: dto.dateOfBirth !== null ? BigInt(dto.dateOfBirth) : null,
      phoneNumber: dto.phoneNumber,
      email: dto.email,
      idCard: dto.idCard,
      job: dto.job,
      address: dto.address,
      avatarUrl: dto.avatarUrl,
      relationship: dto.relationship,
      isPrimary: dto.isPrimary,
    };
  }

  static toDomainList(dtos: RelativeApiDto[]): RelativeDomainModel[] {
    return dtos.map(this.toDomain);
  }
}
