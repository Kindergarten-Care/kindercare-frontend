import { AccountApiDto, AccountDomainModel } from '@/config/types/account';

export class AccountMapper {
  static toDomain(dto: AccountApiDto): AccountDomainModel {
    return {
      id: dto.id,
      fullName: dto.fullName,
      username: dto.username,
      status: dto.status,
      email: dto.email,
      phoneNumber: dto.phoneNumber,
      avatarUrl: dto.avatarUrl,
    };
  }

  static toDomainList(dtos: AccountApiDto[]): AccountDomainModel[] {
    return dtos.map(this.toDomain);
  }

  static toTeacherDetailDomain(dto: import('@/config/types/account').TeacherDetailApiDto): import('@/config/types/account').TeacherDetailDomainModel {
    return {
      ...dto,
      dateOfBirth: dto.dateOfBirth ? BigInt(dto.dateOfBirth) : null,
      classes: dto.classes.map(c => ({
        ...c,
        assignedDate: BigInt(c.assignedDate),
      })),
    };
  }

  static toParentDetailDomain(dto: import('@/config/types/account').ParentDetailApiDto): import('@/config/types/account').ParentDetailDomainModel {
    return {
      ...dto,
      dateOfBirth: dto.dateOfBirth ? BigInt(dto.dateOfBirth) : null,
      children: dto.children.map(c => ({
        ...c,
        dateOfBirth: c.dateOfBirth ? BigInt(c.dateOfBirth) : null,
        isPrimary: c.isPrimary === 1,
      })),
    };
  }
}
