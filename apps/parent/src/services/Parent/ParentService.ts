import { apiClient, ApiResponse, SERVER } from '@kindercare/core';
import { ParentProfileApiDto, ParentProfileDomainModel } from '@/config/types/parent';
import { ParentMapper } from '@/services/Parent/ParentMapper';

class ParentService {
  async getProfile(): Promise<ParentProfileDomainModel> {
    const { data: res } = await apiClient.get<ApiResponse<ParentProfileApiDto>>(SERVER.parent.getProfile);
    if (!res.success) {
      throw new Error(res.message);
    }
    return ParentMapper.toDomain(res.data);
  }
}

export const parentService = new ParentService();
