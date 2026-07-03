import { apiClient, ApiResponse, SERVER } from '@kindercare/core';
import { ProxyAuthorizationApiDto, ProxyAuthorizationDomainModel, CreateProxyAuthorizationDto } from '@/config/types/proxyAuthorization';
import { ProxyRequestMapper } from './ProxyRequestMapper';

class ProxyRequestService {
  async createProxyRequest(dto: CreateProxyAuthorizationDto, file?: File | null): Promise<ProxyAuthorizationDomainModel> {
    const formData = new FormData();
    formData.append('studentId', String(dto.studentId));
    formData.append('authorizationDate', String(dto.authorizationDate));
    formData.append('type', dto.type);
    formData.append('proxyName', dto.proxyName);
    if (dto.proxyPhone) formData.append('proxyPhone', dto.proxyPhone);
    if (dto.proxyIDCard) formData.append('proxyIDCard', dto.proxyIDCard);
    if (dto.notes) formData.append('notes', dto.notes);
    if (file) {
      formData.append('proxyPhoto', file);
    }

    const { data: res } = await apiClient.post<ApiResponse<ProxyAuthorizationApiDto>>(
      SERVER.parent.createProxyAuthorization,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    if (!res.success) {
      throw new Error(res.message);
    }
    return ProxyRequestMapper.toDomain(res.data);
  }

  async getProxyRequests(studentId: number | string): Promise<ProxyAuthorizationDomainModel[]> {
    const url = SERVER.parent.getProxyAuthorizations.replace(':studentId', studentId.toString());
    const { data: res } = await apiClient.get<ApiResponse<ProxyAuthorizationApiDto[]>>(url);
    if (!res.success) {
      throw new Error(res.message);
    }
    return ProxyRequestMapper.toDomainList(res.data);
  }

  async cancelProxyRequest(authorizationId: number | string): Promise<ProxyAuthorizationDomainModel> {
    const url = SERVER.parent.cancelProxyAuthorization.replace(':authorizationId', authorizationId.toString());
    const { data: res } = await apiClient.patch<ApiResponse<ProxyAuthorizationApiDto>>(url);
    if (!res.success) {
      throw new Error(res.message);
    }
    return ProxyRequestMapper.toDomain(res.data);
  }
}

export const proxyRequestService = new ProxyRequestService();
