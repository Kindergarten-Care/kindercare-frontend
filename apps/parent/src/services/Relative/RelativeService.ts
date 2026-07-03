import { apiClient, ApiResponse, SERVER } from '@kindercare/core';
import { RelativeApiDto, RelativeDomainModel } from '@/config/types/relative';
import { RelativeMapper } from './RelativeMapper';

class RelativeService {
  async getRelatives(studentId: number | string): Promise<RelativeDomainModel[]> {
    const url = SERVER.parent.getRelatives.replace(':studentId', studentId.toString());
    const { data: res } = await apiClient.get<ApiResponse<RelativeApiDto[]>>(url);
    if (!res.success) {
      throw new Error(res.message);
    }
    return RelativeMapper.toDomainList(res.data);
  }
}

export const relativeService = new RelativeService();
