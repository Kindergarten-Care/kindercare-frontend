import { PrincipalApiDto, PrincipalDomainModel } from '@/config/types/principal';

export class PrincipalMapper {
  static toDomain(dto: PrincipalApiDto): PrincipalDomainModel {
    return {
      principalId: dto.principalId,
      fullName: dto.fullName,
      phoneNumber: dto.phoneNumber,
      email: dto.email,
      username: dto.username,
      avatarUrl: dto.avatarUrl,
    };
  }
}
