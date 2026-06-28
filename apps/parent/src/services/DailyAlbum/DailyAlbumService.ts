import { apiClient, ApiResponse, SERVER } from '@kindercare/core';
import { DailyAlbumApiDto, DailyAlbumDomainModel } from '@/config/types/dailyAlbum';
import { DailyAlbumMapper } from './DailyAlbumMapper';

class DailyAlbumService {
  async getDailyAlbums(studentId: number | string, date?: number): Promise<DailyAlbumDomainModel[]> {
    let url = SERVER.parent.getDailyAlbums.replace(':studentId', studentId.toString());
    if (date !== undefined) url += `?date=${date}`;
    const { data: res } = await apiClient.get<ApiResponse<DailyAlbumApiDto[]>>(url);
    if (!res.success) throw new Error(res.message);
    return DailyAlbumMapper.toDomainList(res.data);
  }
}

export const dailyAlbumService = new DailyAlbumService();
