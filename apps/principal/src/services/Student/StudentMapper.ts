import { StudentDetailApiDto, StudentDetailDomainModel } from '@/config/types/student';

export class StudentMapper {
  static toStudentDetailDomain(api: StudentDetailApiDto): StudentDetailDomainModel {
    return {
      id: api.id,
      fullName: api.fullName,
      dateOfBirth: api.dateOfBirth ? BigInt(api.dateOfBirth) : null,
      gender: api.gender,
      allergies: api.allergies || null,
      admissionDate: api.admissionDate ? BigInt(api.admissionDate) : null,
      status: api.status,
      avatarUrl: api.avatarUrl,
      classId: api.classId,
      className: api.className,
      parents: api.parents?.map(p => ({
        parentId: p.parentId,
        fullName: p.fullName,
        phoneNumber: p.phoneNumber,
        email: p.email,
        occupation: p.occupation,
        address: p.address,
        relationship: p.relationship,
        isPrimary: p.isPrimary === 1
      })) || []
    };
  }
}
