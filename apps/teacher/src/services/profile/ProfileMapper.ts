import { TeacherProfileApiDto, TeacherProfileDomainModel } from '@/config/types/profile';

export class ProfileMapper {
  static toDomain(dto: TeacherProfileApiDto): TeacherProfileDomainModel {
    return {
      ...dto,
    };
  }
}
