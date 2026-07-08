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
}

export const accountService = new AccountService();
