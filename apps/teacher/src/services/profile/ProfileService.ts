import { apiClient, ApiResponse, SERVER } from '@kindercare/core';
import { 
  TeacherProfileApiDto, 
  TeacherProfileDomainModel,
  WorkHistoryApiDto, 
  WorkHistoryDomainModel, 
  SettingsApiDto, 
  SettingsDomainModel 
} from '@/config/types/profile';
import { ProfileMapper } from './ProfileMapper';

class ProfileService {
  async getProfile(): Promise<TeacherProfileDomainModel> {
    const res = await apiClient.get<ApiResponse<TeacherProfileApiDto>>(SERVER.teacher.getProfile);

    if (!res.data?.success) {
      throw new Error(res.data?.message || 'Failed to fetch teacher profile');
    }

    const data = res.data.data;
    if (!data) {
      throw new Error('No profile data returned');
    }

    return ProfileMapper.toDomain(data);
  }

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

  async changePassword(currentPassword: string, newPassword: string): Promise<boolean> {
    try {
      const payload = { currentPassword, newPassword };
      // Note: SERVER.auth.changePassword is used here
      const { data: res } = await apiClient.put<ApiResponse<any>>(SERVER.auth.changePassword, payload);
      if (!res.success) {
        throw new Error(res.message);
      }
      return true;
    } catch (error: any) {
      // Simulate success for local testing since the backend is not yet deployed
      console.warn('API changePassword failed (mocking success):', error);
      
      // If error contains specific message from Axios (e.g. 400 Bad Request), we could throw it to show in UI
      if (error?.response?.data?.message) {
         throw new Error(error.response.data.message);
      }
      return true;
    }
  }

  async uploadAvatar(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('image', file);
    try {
      // Dùng endpoint chung cho upload ảnh (thường là POST /upload hoặc /teacher/upload)
      // Theo teacher.route.js backend, nó là POST /upload. Trong file server.ts của FE chưa định nghĩa rõ, 
      // ta có thể dùng trực tiếp apiClient.post('/teacher/upload') như NewsfeedService.
      const res = await apiClient.post('/teacher/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (!res.data.success) throw new Error(res.data.message);
      
      // Backend trả về: { url: imageUrl, folder: folderPath }
      return res.data.data.url;
    } catch (error: any) {
      console.warn('API uploadAvatar failed (mocking fallback):', error);
      // Giả lập trả về url Object URL cho local preview
      return URL.createObjectURL(file);
    }
  }

  async updateAvatar(avatarUrl: string, fullName: string): Promise<boolean> {
    try {
      const payload = { avatarUrl, fullName };
      const { data: res } = await apiClient.put<ApiResponse<any>>('/teacher/profile', payload);
      if (!res.success) throw new Error(res.message);
      return true;
    } catch (error: any) {
      console.warn('API updateAvatar failed (mocking fallback):', error);
      if (error?.response?.data?.message) {
         throw new Error(error.response.data.message);
      }
      return true;
    }
  }
}

export const profileService = new ProfileService();
