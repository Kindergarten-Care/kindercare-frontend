import { StudentApiDto, StudentDomainModel } from '@/config/types/student';

export class StudentMapper {
  static toDomain(dto: StudentApiDto): StudentDomainModel {
    return {
      studentId: dto.studentId,
      fullName: dto.fullName,
      dateOfBirth: dto.dateOfBirth != null ? BigInt(dto.dateOfBirth) : null,
      gender: dto.gender,
      allergies: dto.allergies,
      admissionDate: dto.admissionDate != null ? BigInt(dto.admissionDate) : null,
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
      teachers: dto.teachers ? dto.teachers.map(t => ({
        teacherId: t.teacherId,
        fullName: t.fullName,
        phoneNumber: t.phoneNumber,
        email: t.email,
        roleInClass: t.roleInClass,
        gender: t.gender,
      })) : [],
    };
  }

  static toDomainList(dtos: StudentApiDto[]): StudentDomainModel[] {
    return dtos.map(this.toDomain);
  }
}
