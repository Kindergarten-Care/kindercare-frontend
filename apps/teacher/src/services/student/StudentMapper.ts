import { StudentDetailedApiDto, StudentDetailedDomainModel } from '@/config/types/student';

export class StudentMapper {
  static toDomain(dto: StudentDetailedApiDto): StudentDetailedDomainModel {
    return {
      studentId: dto.studentId,
      fullName: dto.fullName,
      dateOfBirth: dto.dateOfBirth,
      gender: dto.gender,
      allergies: dto.allergies,
      avatarUrl: dto.avatarUrl,
      healthRecord: dto.healthRecord ? {
        height: dto.healthRecord.height,
        weight: dto.healthRecord.weight,
        bmi: dto.healthRecord.bmi,
      } : null,
      parents: dto.parents ? dto.parents.map(p => ({
        parentId: p.parentId,
        fullName: p.fullName,
        phone: p.phone,
        email: p.email,
        relationship: p.relationship,
        isPrimary: p.isPrimary,
        avatarUrl: p.avatarUrl
      })) : [],
    };
  }

  static toDomainList(dtos: StudentDetailedApiDto[]): StudentDetailedDomainModel[] {
    return dtos.map(dto => this.toDomain(dto));
  }
}
