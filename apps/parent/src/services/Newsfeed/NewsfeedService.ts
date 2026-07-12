import { apiClient, ApiResponse, SERVER } from '@kindercare/core';
import { NewsfeedApiDto, NewsfeedDomainModel } from '@/config/types/newsfeed';

class NewsfeedService {
  async getNewsfeeds(studentId: number): Promise<NewsfeedDomainModel[]> {
    const url = SERVER.parent.getNewsfeeds.replace(':studentId', studentId.toString());
    const { data: res } = await apiClient.get<ApiResponse<NewsfeedApiDto[]>>(url);
    if (!res.success) throw new Error(res.message);
    return (res.data ?? []).map(dto => ({
      ...dto,
      postedAt: BigInt(dto.postedAt)
    }));
  }
}

export const newsfeedService = new NewsfeedService();
