export interface StudentApiDto {
  studentId: number;
  fullName: string;
  dateOfBirth: number; // Unix timestamp in seconds or milliseconds
  gender: string;
  allergies: string | null;
  admissionDate: number; // Unix timestamp in seconds or milliseconds
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
}

export interface StudentDomainModel {
  studentId: number;
  fullName: string;
  dateOfBirth: bigint; // Epoch time as BigInt
  gender: string;
  allergies: string | null;
  admissionDate: bigint; // Epoch time as BigInt
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
}
