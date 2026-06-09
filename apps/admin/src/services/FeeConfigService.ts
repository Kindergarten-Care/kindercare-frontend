import { FeePackageDTO } from '@/config/types/feeConfig';
import { FeeConfigMapper } from './mappers/FeeConfigMapper';

export class FeeConfigService {
  static async getFeePackages() {
    // Simulate API fetch
    const mockData: FeePackageDTO[] = [
      {
        id: '1',
        name: '1 Tháng',
        price: 5000000,
        originalPrice: null,
        discountPercentage: 0,
        isPopular: false,
        themeStyle: 'gray'
      },
      {
        id: '2',
        name: '1 Quý',
        price: 14250000,
        originalPrice: 15000000,
        discountPercentage: 5,
        isPopular: false,
        themeStyle: 'green'
      },
      {
        id: '3',
        name: '6 Tháng',
        price: 27000000,
        originalPrice: 30000000,
        discountPercentage: 10,
        isPopular: false,
        themeStyle: 'blue'
      },
      {
        id: '4',
        name: '1 Năm',
        price: 51000000,
        originalPrice: 60000000,
        discountPercentage: 15,
        isPopular: true,
        themeStyle: 'gold'
      }
    ];

    return FeeConfigMapper.toDomainList(mockData);
  }
}
