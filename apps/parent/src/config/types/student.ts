export interface TeacherApiDto {
  teacherId: number;
  fullName: string;
  phoneNumber: string;
  email: string;
  roleInClass: string;
  gender: string;
}

export interface StudentApiDto {
  studentId: number;
  fullName: string;
  dateOfBirth: number | null; // Unix timestamp in seconds or milliseconds
  gender: string;
  allergies: string | null;
  admissionDate: number | null; // Unix timestamp in seconds or milliseconds
  enrollmentStatus: string;
  avatarUrl: string | null;
  classId: number;
  className: string;
  gradeName: string;
  academicYearName: string;
  buildingId: number;
  buildingName: string;
  campusId: number;
  campusName: string;
  campusAddress: string;
  relationship: string;
  isPrimary: number;
  teachers?: TeacherApiDto[];
}

export interface TeacherDomainModel {
  teacherId: number;
  fullName: string;
  phoneNumber: string;
  email: string;
  roleInClass: string;
  gender: string;
}

export interface StudentDomainModel {
  studentId: number;
  fullName: string;
  dateOfBirth: bigint | null; // Epoch time as BigInt
  gender: string;
  allergies: string | null;
  admissionDate: bigint | null; // Epoch time as BigInt
  enrollmentStatus: string;
  avatarUrl: string | null;
  classId: number;
  className: string;
  gradeName: string;
  academicYearName: string;
  buildingId: number;
  buildingName: string;
  campusId: number;
  campusName: string;
  campusAddress: string;
  relationship: string;
  isPrimary: number;
  teachers?: TeacherDomainModel[];
}
