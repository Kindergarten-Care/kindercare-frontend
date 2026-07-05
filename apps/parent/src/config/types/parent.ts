export interface ParentProfileApiDto {
  parentId: number;
  fullName: string;
  dateOfBirth: number | null;
  phoneNumber: string;
  email: string;
  idCard: string | null;
  job: string | null;
  address: string | null;
  avatarUrl: string | null;
}

export interface ParentProfileDomainModel {
  parentId: number;
  fullName: string;
  dateOfBirth: number | null;
  phoneNumber: string;
  email: string;
  idCard: string | null;
  job: string | null;
  address: string | null;
  avatarUrl: string | null;
}

export interface UpdateParentProfileDto {
  fullName?: string;
  dateOfBirth?: number;
  phoneNumber?: string;
  email?: string;
  idCard?: string;
  job?: string;
  address?: string;
  avatar?: File;
}

export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}
