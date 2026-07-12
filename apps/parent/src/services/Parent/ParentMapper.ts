import { ParentProfileApiDto, ParentProfileDomainModel } from '@/config/types/parent';

export class ParentMapper {
  static toDomain(dto: ParentProfileApiDto): ParentProfileDomainModel {
    return {
      parentId: dto.parentId,
      fullName: dto.fullName,
      dateOfBirth: dto.dateOfBirth,
      phoneNumber: dto.phoneNumber,
      email: dto.email,
      idCard: dto.idCard,
      job: dto.job,
      address: dto.address,
      avatarUrl: dto.avatarUrl,
    };
  }
}
