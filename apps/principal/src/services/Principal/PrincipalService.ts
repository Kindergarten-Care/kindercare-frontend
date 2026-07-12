import { apiClient, ApiResponse, SERVER } from '@kindercare/core';
import { PrincipalApiDto, PrincipalDomainModel } from '@/config/types/principal';
import { PrincipalMapper } from './PrincipalMapper';

class PrincipalService {
  async getProfile(): Promise<PrincipalDomainModel> {
    const { data: res } = await apiClient.get<ApiResponse<PrincipalApiDto>>(SERVER.principal.getProfile);
    if (!res.success) {
      throw new Error(res.message);
    }
    return PrincipalMapper.toDomain(res.data);
  }
}

export const principalService = new PrincipalService();
