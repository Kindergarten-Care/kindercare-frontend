export interface ImportStudentsResultDto {
  imported: number;
  tuitionPlansCreated: number;
}

export interface UpdateStudentPayload {
  fullName?: string;
  dateOfBirth?: number;
  gender?: string;
  allergies?: string | null;
  avatarUrl?: string | null;
}

export interface UploadStudentAvatarResultDto {
  avatarUrl: string;
}

export interface EnrollStudentPayload {
  student: {
    fullName: string;
    dateOfBirth: number;
    gender: string;
    admissionDate: number;
    allergies?: string;
    avatarUrl?: string;
  };
  parent: {
    id: number | null;
    fullName: string;
    phoneNumber: string;
    email: string;
    occupation: string;
    address: string;
  };
  isNewParent: boolean;
  account: { username: string; password: string } | null;
  packageId: number | null;
}

/** Response của POST /principal/students/enroll — KHÔNG có statusCode, khác ApiResponse<T> thông thường. */
export interface EnrollStudentResult {
  success: boolean;
  data: {
    studentId: number;
    parentId: number;
  };
  message: string;
}

export interface StudentParentApiDto {
  parentId: number;
  fullName: string;
  phoneNumber: string;
  email: string;
  occupation?: string;
  address?: string;
  relationship: string;
  isPrimary: number;
  avatarUrl?: string | null;
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
  avatarUrl: string | null;
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
