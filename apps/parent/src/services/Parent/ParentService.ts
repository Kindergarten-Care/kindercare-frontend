import { isAxiosError } from 'axios';
import { apiClient, ApiResponse, SERVER } from '@kindercare/core';
import { ParentProfileApiDto, ParentProfileDomainModel, UpdateParentProfileDto, ChangePasswordDto } from '@/config/types/parent';
import { ParentMapper } from '@/services/Parent/ParentMapper';

class ParentService {
  async getProfile(): Promise<ParentProfileDomainModel> {
    const { data: res } = await apiClient.get<ApiResponse<ParentProfileApiDto>>(SERVER.parent.getProfile);
    if (!res.success) {
      throw new Error(res.message);
    }
    return ParentMapper.toDomain(res.data);
  }

  async updateProfile(dto: UpdateParentProfileDto): Promise<ParentProfileDomainModel> {
    const formData = new FormData();
    if (dto.fullName !== undefined) formData.append('fullName', dto.fullName);
    if (dto.dateOfBirth !== undefined) formData.append('dateOfBirth', String(dto.dateOfBirth));
    if (dto.phoneNumber !== undefined) formData.append('phoneNumber', dto.phoneNumber);
    if (dto.email !== undefined) formData.append('email', dto.email);
    if (dto.idCard !== undefined) formData.append('idCard', dto.idCard);
    if (dto.job !== undefined) formData.append('job', dto.job);
    if (dto.address !== undefined) formData.append('address', dto.address);
    if (dto.avatar) formData.append('avatar', dto.avatar);

    const { data: res } = await apiClient.patch<ApiResponse<ParentProfileApiDto>>(
      SERVER.parent.getProfile,
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
    return ParentMapper.toDomain(res.data);
  }

  async changePassword(dto: ChangePasswordDto): Promise<void> {
    try {
      const { data: res } = await apiClient.patch<ApiResponse<null>>(SERVER.parent.changePassword, dto);
      if (!res.success) {
        throw new Error(res.message);
      }
    } catch (err) {
      if (isAxiosError<ApiResponse<null>>(err) && err.response?.data?.message) {
        throw new Error(err.response.data.message);
      }
      throw err;
    }
  }
}

export const parentService = new ParentService();
