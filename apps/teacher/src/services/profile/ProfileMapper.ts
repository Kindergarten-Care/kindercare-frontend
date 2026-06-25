import { TeacherProfileApiDto, TeacherProfileDomainModel } from '@/config/types/profile';

export class ProfileMapper {
  static toDomain(dto: TeacherProfileApiDto): TeacherProfileDomainModel {
    return {
      teacherId: dto.teacherId,
      username: dto.username,
      avatarUrl: dto.avatarUrl,
      fullName: dto.fullName,
      phoneNumber: dto.phoneNumber,
      email: dto.email,
      dateOfBirth: dto.dateOfBirth ? BigInt(dto.dateOfBirth) : null,
      gender: dto.gender,
      idCard: dto.idCard,
      address: dto.address,
      professionalRank: dto.professionalRank,
      workStatus: dto.workStatus,
    };
  }
}
