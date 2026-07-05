import { apiClient, ApiResponse, SERVER } from '@kindercare/core';
import { TeacherProfileApiDto, TeacherProfileDomainModel } from '@/config/types/profile';
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
}

export const profileService = new ProfileService();
