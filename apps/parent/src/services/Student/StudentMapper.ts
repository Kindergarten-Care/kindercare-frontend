import { StudentApiDto, StudentDomainModel } from '@/config/types/student';

export class StudentMapper {
  static toDomain(dto: StudentApiDto): StudentDomainModel {
    return {
      studentId: dto.studentId,
      fullName: dto.fullName,
      dateOfBirth: BigInt(dto.dateOfBirth),
      gender: dto.gender,
      allergies: dto.allergies,
      admissionDate: BigInt(dto.admissionDate),
      enrollmentStatus: dto.enrollmentStatus,
      avatarUrl: dto.avatarUrl,
      classId: dto.classId,
      className: dto.className,
      gradeName: dto.gradeName,
      academicYearName: dto.academicYearName,
      buildingId: dto.buildingId,
      buildingName: dto.buildingName,
      campusId: dto.campusId,
      campusName: dto.campusName,
      campusAddress: dto.campusAddress,
      relationship: dto.relationship,
      isPrimary: dto.isPrimary,
    };
  }

  static toDomainList(dtos: StudentApiDto[]): StudentDomainModel[] {
    return dtos.map(this.toDomain);
  }
}
