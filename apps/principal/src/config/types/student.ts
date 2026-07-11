export interface StudentParentApiDto {
  parentId: number;
  fullName: string;
  phoneNumber: string;
  email: string;
  occupation?: string;
  address?: string;
  relationship: string;
  isPrimary: number;
}

export interface StudentDetailApiDto {
  id: number;
  fullName: string;
  dateOfBirth: number | null;
  gender: string;
  allergies: string | null;
  admissionDate: number | null;
  status: string;
  avatarUrl: string | null;
  classId: number | null;
  className: string | null;
  currentClass: string | null;
  parents: StudentParentApiDto[];
}

export interface StudentParentDomainModel {
  parentId: number;
  fullName: string;
  phoneNumber: string;
  email: string;
  occupation?: string;
  address?: string;
  relationship: string;
  isPrimary: boolean;
}

export interface StudentDetailDomainModel {
  id: number;
  fullName: string;
  dateOfBirth: bigint | null;
  gender: string;
  allergies: string | null;
  admissionDate: bigint | null;
  status: string;
  avatarUrl: string | null;
  classId: number | null;
  className: string | null;
  parents: StudentParentDomainModel[];
}
