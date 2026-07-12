export interface ClassTeacherApiDto {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  avatarUrl: string | null;
  roleInClass: string;
}

export interface ClassStudentApiDto {
  studentId: number;
  fullName: string;
  avatarUrl: string | null;
  dateOfBirth: number | null;
  admissionDate: number | null;
}

export interface ClassAttendanceApiDto {
  present: number;
  absent: number;
  excused: number;
}

export interface ClassDetailApiDto {
  classId: number;
  className: string;
  gradeName: string;
  yearName?: string;
  teachers: ClassTeacherApiDto[];
  totalStudents: number;
  attendanceToday: ClassAttendanceApiDto;
  students: ClassStudentApiDto[];
}

export interface ClassTeacherDomainModel {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  avatarUrl: string | null;
  roleInClass: string;
}

export interface ClassStudentDomainModel {
  studentId: number;
  fullName: string;
  avatarUrl: string | null;
  dateOfBirth: bigint | null;
  admissionDate: bigint | null;
}

export interface ClassAttendanceDomainModel {
  present: number;
  absent: number;
  excused: number;
}

export interface ClassDetailDomainModel {
  classId: number;
  className: string;
  gradeName: string;
  yearName?: string;
  teachers: ClassTeacherDomainModel[];
  totalStudents: number;
  attendanceToday: ClassAttendanceDomainModel;
  students: ClassStudentDomainModel[];
}
