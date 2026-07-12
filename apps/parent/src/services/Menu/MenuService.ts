import { apiClient, ApiResponse, SERVER } from '@kindercare/core';
import { MenuApiDto, MenuDomainModel } from '@/config/types/menu';

class MenuService {
  async getMenu(studentId: number, date?: number): Promise<MenuDomainModel | null> {
    let url = SERVER.parent.getMenu.replace(':studentId', studentId.toString());
    if (date !== undefined) url += `?date=${date}`;
    const { data: res } = await apiClient.get<ApiResponse<MenuApiDto | null>>(url);
    if (!res.success) throw new Error(res.message);
    if (!res.data) return null;
    return {
      ...res.data,
      menuDate: BigInt(res.data.menuDate)
    };
  }
}

export const menuService = new MenuService();
