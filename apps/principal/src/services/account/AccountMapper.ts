import { AccountApiDto, AccountDomainModel } from '@/config/types/account';

export class AccountMapper {
  static toDomain(dto: AccountApiDto): AccountDomainModel {
    return {
      id: dto.id,
      fullName: dto.fullName,
      username: dto.username,
      email: dto.email,
    };
  }

  static toDomainList(dtos: AccountApiDto[]): AccountDomainModel[] {
    return dtos.map(this.toDomain);
  }
}
