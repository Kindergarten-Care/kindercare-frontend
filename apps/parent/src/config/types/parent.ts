export interface ParentProfileApiDto {
  parentId: number;
  fullName: string;
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
  phoneNumber: string;
  email: string;
  idCard: string | null;
  job: string | null;
  address: string | null;
  avatarUrl: string | null;
}
