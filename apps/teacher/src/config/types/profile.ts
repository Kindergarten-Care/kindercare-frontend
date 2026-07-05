export interface TeacherProfileApiDto {
  teacherId: number;
  username: string;
  avatarUrl: string | null;
  fullName: string;
  phoneNumber: string;
  email: string;
  dateOfBirth: string | null;
  gender: string;
  idCard: string | null;
  address: string | null;
  professionalRank: string | null;
  workStatus: string;
}

export interface TeacherProfileDomainModel extends TeacherProfileApiDto {}
