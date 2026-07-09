import { apiClient, ApiResponse, SERVER } from '@kindercare/core';
import { ClassDetailApiDto, ClassDetailDomainModel } from '@/config/types/class';
import { ClassMapper } from './ClassMapper';

class ClassService {
  async getClassDetail(id: string | number): Promise<ClassDetailDomainModel> {
    const url = SERVER.principal.getClassDetail.replace(':id', id.toString());
    const { data: res } = await apiClient.get<ApiResponse<ClassDetailApiDto>>(url);
    if (!res.success) {
      throw new Error(res.message);
    }
    return ClassMapper.toDomain(res.data);
  }
}

export const classService = new ClassService();
