import { ProxyAuthorizationApiDto, ProxyAuthorizationDomainModel } from '@/config/types/proxyAuthorization';

export class ProxyRequestMapper {
  static toDomain(dto: ProxyAuthorizationApiDto): ProxyAuthorizationDomainModel {
    return {
      authorizationId: dto.authorizationId,
      studentId: dto.studentId,
      parentId: dto.parentId,
      authorizationDate: BigInt(dto.authorizationDate),
      type: dto.type,
      proxyName: dto.proxyName,
      proxyPhone: dto.proxyPhone,
      proxyIDCard: dto.proxyIDCard,
      proxyPhotoUrl: dto.proxyPhotoUrl,
      notes: dto.notes,
      status: dto.status,
      createdAt: BigInt(dto.createdAt),
    };
  }

  static toDomainList(dtos: ProxyAuthorizationApiDto[]): ProxyAuthorizationDomainModel[] {
    return dtos.map(this.toDomain);
  }
}
