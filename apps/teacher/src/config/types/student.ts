export interface ParentApiDto {
  parentId: number;
  fullName: string;
  phone: string;
  email: string;
  relationship: string;
  isPrimary: boolean;
}

export interface HealthRecordApiDto {
  height: number;
  weight: number;
  bmi: number;
}

export interface StudentDetailedApiDto {
  studentId: number;
  fullName: string;
  dateOfBirth: number | null; // seconds
  gender: string;
  allergies: string | null;
  avatarUrl: string | null;
  healthRecord: HealthRecordApiDto | null;
  parents: ParentApiDto[] | null;
}

export interface ParentDomainModel {
  parentId: number;
  fullName: string;
  phone: string;
  email: string;
  relationship: string;
  isPrimary: boolean;
}

export interface HealthRecordDomainModel {
  height: number;
  weight: number;
  bmi: number;
}

export interface StudentDetailedDomainModel {
  studentId: number;
  fullName: string;
  dateOfBirth: bigint | null; // bigint in seconds as per api-integration.md
  gender: string;
  allergies: string | null;
  avatarUrl: string | null;
  healthRecord: HealthRecordDomainModel | null;
  parents: ParentDomainModel[];
}
