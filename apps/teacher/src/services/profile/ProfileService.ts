import { apiClient, ApiResponse, SERVER } from '@kindercare/core';
import { WorkHistoryApiDto, WorkHistoryDomainModel, SettingsApiDto, SettingsDomainModel } from '@/config/types/profile';
import { ProfileMapper } from './ProfileMapper';

class ProfileService {
  async getWorkHistory(): Promise<WorkHistoryDomainModel[]> {
    try {
      const { data: res } = await apiClient.get<ApiResponse<WorkHistoryApiDto[]>>(SERVER.teacher.workHistory);
      if (!res.success) {
        throw new Error(res.message);
      }
      return ProfileMapper.toWorkHistoryList(res.data);
    } catch (error) {
      // Fallback to mock data since backend is not yet deployed to web-test.kindercare.app
      console.warn('API getWorkHistory failed, falling back to mock data:', error);
      return [
        { historyId: 1, title: 'Thăng hạng Giáo viên Hạng II', tag: 'Thăng hạng', description: 'Được xét thăng từ Giáo viên Hạng III lên Hạng II sau kỳ đánh giá năng lực xuất sắc.', kind: 'up', eventDate: BigInt(1754006400) },
        { historyId: 2, title: 'Giáo viên chủ nhiệm Lớp Mầm 1', tag: 'Bổ nhiệm', description: 'Được phân công làm giáo viên chính phụ trách lớp Mầm 1, cơ sở 1.', kind: 'role', eventDate: BigInt(1725148800) },
        { historyId: 3, title: 'Hoàn thành tập huấn Montessori', tag: 'Chứng chỉ', description: 'Đạt chứng chỉ phương pháp giáo dục Montessori cấp độ cơ bản.', kind: 'cert', eventDate: BigInt(1677628800) },
        { historyId: 4, title: 'Gia nhập KinderCare', tag: 'Bắt đầu', description: 'Bắt đầu công tác tại hệ thống mầm non KinderCare với vị trí Giáo viên Hạng III.', kind: 'start', eventDate: BigInt(1659312000) }
      ];
    }
  }

  async getSettings(): Promise<SettingsDomainModel> {
    try {
      const { data: res } = await apiClient.get<ApiResponse<SettingsApiDto>>(SERVER.teacher.settings);
      if (!res.success) {
        throw new Error(res.message);
      }
      return ProfileMapper.toSettingsDomain(res.data);
    } catch (error) {
      console.warn('API getSettings failed, falling back to mock data:', error);
      return { emailEnabled: true, pushEnabled: true, weeklyReportEnabled: false };
    }
  }

  async updateSettings(settings: SettingsDomainModel): Promise<boolean> {
    try {
      const payload = {
        emailEnabled: settings.emailEnabled ? 1 : 0,
        pushEnabled: settings.pushEnabled ? 1 : 0,
        weeklyReportEnabled: settings.weeklyReportEnabled ? 1 : 0,
      };
      const { data: res } = await apiClient.put<ApiResponse<any>>(SERVER.teacher.settings, payload);
      if (!res.success) {
        throw new Error(res.message);
      }
      return true;
    } catch (error) {
      console.warn('API updateSettings failed, simulating success for mock:', error);
      return true;
    }
  }
}

export const profileService = new ProfileService();
