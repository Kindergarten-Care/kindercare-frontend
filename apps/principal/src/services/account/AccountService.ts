import { apiClient, ApiResponse, SERVER } from '@kindercare/core';
import { AccountApiDto, AccountDomainModel } from '@/config/types/account';
import { AccountMapper } from './AccountMapper';

class AccountService {
  async getAccountsByRole(role: 'teacher' | 'parent'): Promise<AccountDomainModel[]> {
    const { data: res } = await apiClient.get<ApiResponse<AccountApiDto[]>>(
      `${SERVER.principal.getAccounts}?role=${role}`
    );
    if (!res.success) {
      throw new Error(res.message);
    }
    return AccountMapper.toDomainList(res.data);
  }

  async createAccount(role: 'teacher' | 'parent', payload: any): Promise<void> {
    const { data: res } = await apiClient.post<ApiResponse<any>>(
      `${SERVER.principal.getAccounts}?role=${role}`,
      payload
    );
    if (!res.success) {
      throw new Error(res.message);
    }
  }

  async getTeacherDetail(id: number): Promise<import('@/config/types/account').TeacherDetailDomainModel> {
    const url = SERVER.principal.getTeacherDetail.replace(':id', id.toString());
    const { data: res } = await apiClient.get<ApiResponse<import('@/config/types/account').TeacherDetailApiDto>>(url);
    if (!res.success) {
      throw new Error(res.message);
    }
    return AccountMapper.toTeacherDetailDomain(res.data);
  }

  async getParentDetail(id: number): Promise<import('@/config/types/account').ParentDetailDomainModel> {
    const url = SERVER.principal.getParentDetail.replace(':id', id.toString());
    const { data: res } = await apiClient.get<ApiResponse<import('@/config/types/account').ParentDetailApiDto>>(url);
    if (!res.success) {
      throw new Error(res.message);
    }
    return AccountMapper.toParentDetailDomain(res.data);
  }
  async resetAccountPassword(id: number): Promise<void> {
    const url = SERVER.principal.resetAccountPassword.replace(':id', id.toString());
    const { data: res } = await apiClient.patch<ApiResponse<null>>(url);
    if (!res.success) {
      throw new Error(res.message);
    }
  }

  async lockAccount(id: number): Promise<void> {
    const url = SERVER.principal.lockAccount.replace(':id', id.toString());
    const { data: res } = await apiClient.patch<ApiResponse<null>>(url);
    if (!res.success) {
      throw new Error(res.message);
    }
  }

  async unlockAccount(id: number): Promise<void> {
    const url = SERVER.principal.unlockAccount.replace(':id', id.toString());
    const { data: res } = await apiClient.patch<ApiResponse<null>>(url);
    if (!res.success) {
      throw new Error(res.message);
    }
  }
}
export const accountService = new AccountService();
