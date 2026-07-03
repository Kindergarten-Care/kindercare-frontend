export interface ProxyAuthorizationApiDto {
  authorizationId: number;
  studentId: number;
  parentId: number;
  authorizationDate: number; // Unix epoch seconds
  type: 'checkin' | 'checkout' | 'both';
  proxyName: string;
  proxyPhone: string | null;
  proxyIDCard: string | null;
  proxyPhotoUrl: string | null;
  notes: string | null;
  status: string;
  createdAt: number;
}

export interface ProxyAuthorizationDomainModel {
  authorizationId: number;
  studentId: number;
  parentId: number;
  authorizationDate: bigint;
  type: 'checkin' | 'checkout' | 'both';
  proxyName: string;
  proxyPhone: string | null;
  proxyIDCard: string | null;
  proxyPhotoUrl: string | null;
  notes: string | null;
  status: string;
  createdAt: bigint;
}

export interface CreateProxyAuthorizationDto {
  studentId: number;
  authorizationDate: number; // Unix epoch seconds
  type: 'checkin' | 'checkout' | 'both';
  proxyName: string;
  proxyPhone?: string | null;
  proxyIDCard?: string | null;
  notes?: string | null;
}
