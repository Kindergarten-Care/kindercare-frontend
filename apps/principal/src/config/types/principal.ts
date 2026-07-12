export interface PrincipalApiDto {
  principalId: number;
  fullName: string;
  phoneNumber: string;
  email: string;
  username: string;
  avatarUrl: string | null;
}

export interface PrincipalDomainModel {
  principalId: number;
  fullName: string;
  phoneNumber: string;
  email: string;
  username: string;
  avatarUrl: string | null;
}
