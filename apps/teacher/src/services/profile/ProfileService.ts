import { apiClient, ApiResponse, SERVER } from '@kindercare/core';
import { TeacherProfileApiDto, TeacherProfileDomainModel } from '@/config/types/profile';
import { ProfileMapper } from './ProfileMapper';

class ProfileService {
  async getProfile(): Promise<TeacherProfileDomainModel> {
    const endpoint = SERVER.teacher.getProfile;
    const res = await apiClient.get<ApiResponse<TeacherProfileApiDto>>(endpoint);
    
    if (!res.data?.success) {
      throw new Error(res.data?.message || 'Failed to fetch profile');
    }
    
    return ProfileMapper.toDomain(res.data.data);
  }
}

export const profileService = new ProfileService();
