import { apiClient, ApiResponse, SERVER } from '@kindercare/core';
import { AttendanceApiDto, AttendanceDomainModel } from '@/config/types/attendance';
import { AttendanceMapper } from './AttendanceMapper';

class AttendanceService {
  async getAttendance(
    studentId: number | string,
    startDate?: number | string,
    endDate?: number | string
  ): Promise<AttendanceDomainModel[]> {
    let url = SERVER.parent.getAttendance.replace(':studentId', studentId.toString());
    
    const params: Record<string, string> = {};
    if (startDate) params.startDate = startDate.toString();
    if (endDate) params.endDate = endDate.toString();
    
    const query = new URLSearchParams(params).toString();
    if (query) {
      url += `?${query}`;
    }

    const { data: res } = await apiClient.get<ApiResponse<AttendanceApiDto[]>>(url);
    if (!res.success) {
      throw new Error(res.message);
    }
    return AttendanceMapper.toDomainList(res.data);
  }
}

export const attendanceService = new AttendanceService();
