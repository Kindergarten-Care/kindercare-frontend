import { apiClient, ApiResponse, SERVER } from '@kindercare/core';
import { MenuDto, MenuFilters, MenuDetailDto, ImportMenuFileResultDto } from '@/config/types/menu';

class MenuImportError extends Error {
  results: ImportMenuFileResultDto[];

  constructor(message: string, results: ImportMenuFileResultDto[]) {
    super(message);
    this.results = results;
  }
}

class MenuService {
  async getMenus(filters?: MenuFilters): Promise<MenuDto[]> {
    const { data: res } = await apiClient.get<ApiResponse<MenuDto[]>>(SERVER.principal.getMenus, {
      params: filters,
    });
    if (!res.success) {
      throw new Error(res.message);
    }
    return res.data || [];
  }

  async getMenuDetail(id: number | string): Promise<MenuDetailDto> {
    const url = SERVER.principal.getMenuDetail.replace(':id', String(id));
    const { data: res } = await apiClient.get<ApiResponse<MenuDetailDto>>(url);
    if (!res.success) {
      throw new Error(res.message);
    }
    return res.data;
  }

  async deleteMenu(id: number | string): Promise<void> {
    const url = SERVER.principal.deleteMenu.replace(':id', String(id));
    const { data: res } = await apiClient.delete<ApiResponse<null>>(url);
    if (!res.success) {
      throw new Error(res.message);
    }
  }

  async importMenus(files: File[]): Promise<ImportMenuFileResultDto[]> {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));
    try {
      const { data: res } = await apiClient.post<ApiResponse<ImportMenuFileResultDto[]>>(
        SERVER.principal.importMenus,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      if (!res.success) {
        throw new MenuImportError(res.message, res.data || []);
      }
      return res.data || [];
    } catch (err: any) {
      const res: ApiResponse<ImportMenuFileResultDto[]> | undefined = err.response?.data;
      if (res && res.success === false) {
        throw new MenuImportError(res.message, res.data || []);
      }
      throw err;
    }
  }
}

export const menuService = new MenuService();
export { MenuImportError };
