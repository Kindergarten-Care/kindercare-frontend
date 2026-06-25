export interface TeacherProfileApiDto {
  teacherId: number;
  username: string;
  avatarUrl: string | null;
  fullName: string;
  phoneNumber: string;
  email: string;
  dateOfBirth: number | null; // seconds
  gender: string;
  idCard: string;
  address: string;
  professionalRank: string;
  workStatus: string;
}

export interface TeacherProfileDomainModel {
  teacherId: number;
  username: string;
  avatarUrl: string | null;
  fullName: string;
  phoneNumber: string;
  email: string;
  dateOfBirth: bigint | null;
  gender: string;
  idCard: string;
  address: string;
  professionalRank: string;
  workStatus: string;
}
