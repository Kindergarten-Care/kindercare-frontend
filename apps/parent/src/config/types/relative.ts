export interface RelativeApiDto {
  parentId: number;
  fullName: string;
  dateOfBirth: number | null; // Unix timestamp in seconds
  phoneNumber: string;
  email: string;
  idCard: string | null;
  job: string | null;
  address: string | null;
  avatarUrl: string | null;
  relationship: string;
  isPrimary: number;
}

export interface RelativeDomainModel {
  parentId: number;
  fullName: string;
  dateOfBirth: bigint | null;
  phoneNumber: string;
  email: string;
  idCard: string | null;
  job: string | null;
  address: string | null;
  avatarUrl: string | null;
  relationship: string;
  isPrimary: number;
}
