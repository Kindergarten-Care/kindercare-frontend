import { SystemOverviewResponse } from '@/config/types/admin';

export const ITAdminService = {
  /**
   * Mocks fetching the system overview data from the API
   */
  async getSystemOverview(): Promise<SystemOverviewResponse> {
    // Simulate network delay for CSR loading state
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          metrics: {
            totalAccounts: 12458,
            totalAccountsGrowth: 4.2,
            onlineAccounts: 1842,
            systemWarnings24h: 24,
          },
          roles: [
            { role: 'Giáo viên', percentage: 65 },
            { role: 'Hiệu trưởng', percentage: 25 },
            { role: 'Admin', percentage: 10 },
          ],
          traffic: [
            { day: 'T2', requests: 1200 },
            { day: 'T3', requests: 1650 },
            { day: 'T4', requests: 1050 },
            { day: 'T5', requests: 2400 },
            { day: 'T6', requests: 1950 },
            { day: 'T7', requests: 3800 },
            { day: 'CN', requests: 2100 },
          ],
        });
      }, 1000); // 1s delay
    });
  },
};
