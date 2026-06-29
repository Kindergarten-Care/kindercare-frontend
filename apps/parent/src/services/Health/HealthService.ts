import { apiClient, ApiResponse, SERVER } from '@kindercare/core';
import { HealthRecordApiDto, HealthRecordDomainModel } from '@/config/types/health';
import { HealthMapper } from '@/services/Health/HealthMapper';

class HealthService {
  async getHealthRecords(studentId: number | string): Promise<HealthRecordDomainModel[]> {
    const url = SERVER.parent.getHealthRecords.replace(':studentId', studentId.toString());
    const { data: res } = await apiClient.get<ApiResponse<HealthRecordApiDto[]>>(url);
    if (!res.success) {
      throw new Error(res.message);
    }
    return HealthMapper.toDomainList(res.data);
  }
}

export const healthService = new HealthService();
