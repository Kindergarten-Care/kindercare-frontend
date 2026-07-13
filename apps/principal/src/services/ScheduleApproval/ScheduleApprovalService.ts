import { apiClient, ApiResponse, SERVER } from '@kindercare/core';
import {
  MonthlyScheduleDto,
  MonthlyScheduleFilters,
  MonthlyScheduleDetailDto,
  ApproveMonthlySchedulePayload,
} from '@/config/types/scheduleApproval';

class ScheduleApprovalService {
  async getMonthlySchedules(filters?: MonthlyScheduleFilters): Promise<MonthlyScheduleDto[]> {
    const { data: res } = await apiClient.get<ApiResponse<MonthlyScheduleDto[]>>(SERVER.principal.getMonthlySchedules, {
      params: filters,
    });
    if (!res.success) {
      throw new Error(res.message);
    }
    return res.data || [];
  }

  async getMonthlyScheduleDetail(id: number | string): Promise<MonthlyScheduleDetailDto> {
    const url = SERVER.principal.getMonthlyScheduleDetail.replace(':id', String(id));
    const { data: res } = await apiClient.get<ApiResponse<MonthlyScheduleDetailDto>>(url);
    if (!res.success) {
      throw new Error(res.message);
    }
    return res.data;
  }

  async approveMonthlySchedule(id: number | string, payload: ApproveMonthlySchedulePayload): Promise<void> {
    const url = SERVER.principal.approveMonthlySchedule.replace(':id', String(id));
    const { data: res } = await apiClient.patch<ApiResponse<null>>(url, payload);
    if (!res.success) {
      throw new Error(res.message);
    }
  }

  async activeMonthlySchedule(id: number | string, isActive: boolean): Promise<void> {
    const url = SERVER.principal.activeMonthlySchedule.replace(':id', String(id));
    const { data: res } = await apiClient.patch<ApiResponse<null>>(url, { isActive });
    if (!res.success) {
      throw new Error(res.message);
    }
  }
}

export const scheduleApprovalService = new ScheduleApprovalService();
