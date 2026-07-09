import { ClassDetailApiDto, ClassDetailDomainModel } from '@/config/types/class';

export class ClassMapper {
  static toDomain(dto: ClassDetailApiDto): ClassDetailDomainModel {
    return {
      classId: dto.classId,
      className: dto.className,
      gradeName: dto.gradeName,
      yearName: dto.yearName,
      totalStudents: dto.totalStudents,
      attendanceToday: {
        present: dto.attendanceToday.present,
        absent: dto.attendanceToday.absent,
        excused: dto.attendanceToday.excused,
      },
      teachers: dto.teachers.map(t => ({
        id: t.id,
        fullName: t.fullName,
        email: t.email,
        phoneNumber: t.phoneNumber,
        avatarUrl: t.avatarUrl,
        roleInClass: t.roleInClass,
      })),
      students: dto.students.map(s => ({
        studentId: s.studentId,
        fullName: s.fullName,
        avatarUrl: s.avatarUrl,
        dateOfBirth: s.dateOfBirth ? BigInt(s.dateOfBirth) : null,
        admissionDate: s.admissionDate ? BigInt(s.admissionDate) : null,
      })),
    };
  }
}
