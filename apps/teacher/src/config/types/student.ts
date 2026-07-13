export interface ParentApiDto {
  parentId: number;
  fullName: string;
  phone: string;
  email: string;
  relationship: string;
  isPrimary: boolean;
  avatarUrl: string | null;
}

export interface HealthRecordApiDto {
  height: number;
  weight: number;
  bmi: number;
}

export interface StudentDetailedApiDto {
  studentId: number;
  fullName: string;
  dateOfBirth: number | null; // seconds (as returned by API)
  gender: string;
  allergies: string | null;
  avatarUrl: string | null;
  healthRecord: HealthRecordApiDto | null;
  parents: ParentApiDto[] | null;
  nickname: string | null;
  team: string | null;
}

export interface ParentDomainModel {
  parentId: number;
  fullName: string;
  phone: string;
  email: string;
  relationship: string;
  isPrimary: boolean;
  avatarUrl: string | null;
}

export interface HealthRecordDomainModel {
  height: number;
  weight: number;
  bmi: number;
  lastMeasuredAt?: string;
}

export interface StudentDetailedDomainModel {
  studentId: number;
  fullName: string;
  dateOfBirth: number | null; // number (seconds) as returned by API
  gender: string;
  allergies: string | null;
  avatarUrl: string | null;
  healthRecord: HealthRecordDomainModel | null;
  parents: ParentDomainModel[];
  nickname?: string | null;
  team?: string | null;
}

export interface DetailedStudentsApiResponse {
  classId: number;
  totalStudents: number;
  students: StudentDetailedApiDto[];
}

