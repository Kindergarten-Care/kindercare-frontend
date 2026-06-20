import { apiClient, ApiResponse, SERVER } from '@kindercare/core';
import { LeaveRequestApiDto, LeaveRequestDomainModel, CreateLeaveRequestDto } from '@/config/types/leaveRequest';
import { LeaveRequestMapper } from './LeaveRequestMapper';

class LeaveRequestService {
  async createLeaveRequest(dto: CreateLeaveRequestDto, file?: File | null): Promise<LeaveRequestDomainModel> {
    const formData = new FormData();
    formData.append('studentId', String(dto.studentId));
    formData.append('fromDate', String(dto.fromDate));
    formData.append('toDate', String(dto.toDate));
    formData.append('reason', dto.reason);
    formData.append('parentNotes', dto.parentNotes);
    if (file) {
      formData.append('evidence', file);
    }

    const { data: res } = await apiClient.post<ApiResponse<LeaveRequestApiDto>>(
      SERVER.parent.createLeaveRequest,
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
    return LeaveRequestMapper.toDomain(res.data);
  }
}

export const leaveRequestService = new LeaveRequestService();
