export interface AccountApiDto {
  id: number;
  fullName: string;
  username: string;
  status: string;
  email: string;
  phoneNumber: string | null;
  avatarUrl: string | null;
}

export interface AccountDomainModel {
  id: number;
  fullName: string;
  username: string;
  status: string;
  email: string;
  phoneNumber: string | null;
  avatarUrl: string | null;
}

export interface TeacherDetailClassApiDto {
  classId: number;
  className: string;
  roleInClass: string;
  assignedDate: number; // Unix timestamp
}

export interface TeacherDetailApiDto {
  id: number;
  username: string;
  status: string;
  avatarUrl: string | null;
  roleId: number;
  roleName: string;
  fullName: string;
  phoneNumber: string | null;
  email: string | null;
  dateOfBirth: number | null; // Unix timestamp
  gender: string | null;
  idCard: string | null;
  address: string | null;
  professionalRank: string | null;
  workStatus: string | null;
  totalClasses: number;
  classes: TeacherDetailClassApiDto[];
}

export interface ParentDetailChildApiDto {
  studentId: number;
  fullName: string;
  avatarUrl: string | null;
  dateOfBirth: number | null;
  gender: string | null;
  classId: number | null;
  className: string | null;
  relationship: string | null;
  isPrimary: number;
}

export interface ParentDetailApiDto {
  id: number;
  username: string;
  status: string;
  avatarUrl: string | null;
  roleId: number;
  roleName: string;
  fullName: string;
  dateOfBirth: number | null; // Unix timestamp
  phoneNumber: string | null;
  email: string | null;
  idCard: string | null;
  job: string | null;
  address: string | null;
  children: ParentDetailChildApiDto[];
}

export interface TeacherDetailClassDomainModel {
  classId: number;
  className: string;
  roleInClass: string;
  assignedDate: bigint;
}

export interface TeacherDetailDomainModel {
  id: number;
  username: string;
  status: string;
  avatarUrl: string | null;
  roleId: number;
  roleName: string;
  fullName: string;
  phoneNumber: string | null;
  email: string | null;
  dateOfBirth: bigint | null;
  gender: string | null;
  idCard: string | null;
  address: string | null;
  professionalRank: string | null;
  workStatus: string | null;
  totalClasses: number;
  classes: TeacherDetailClassDomainModel[];
}

export interface ParentDetailChildDomainModel {
  studentId: number;
  fullName: string;
  avatarUrl: string | null;
  dateOfBirth: bigint | null;
  gender: string | null;
  classId: number | null;
  className: string | null;
  relationship: string | null;
  isPrimary: boolean;
}

export interface ParentDetailDomainModel {
  id: number;
  username: string;
  status: string;
  avatarUrl: string | null;
  roleId: number;
  roleName: string;
  fullName: string;
  dateOfBirth: bigint | null;
  phoneNumber: string | null;
  email: string | null;
  idCard: string | null;
  job: string | null;
  address: string | null;
  children: ParentDetailChildDomainModel[];
}
