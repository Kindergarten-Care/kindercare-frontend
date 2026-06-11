import { FeePackageDTO, FeePackageModel, FeeTheme } from '@/config/types/feeConfig';

export class FeeConfigMapper {
  static toDomain(dto: FeePackageDTO): FeePackageModel {
    const formatCurrency = (amount: number) => {
      return new Intl.NumberFormat('vi-VN').format(amount);
    };

    return {
      id: dto.id,
      title: dto.name,
      price: formatCurrency(dto.price),
      originalPrice: dto.originalPrice ? formatCurrency(dto.originalPrice) : undefined,
      discountPercent: dto.discountPercentage,
      isPopular: dto.isPopular,
      theme: (['gray', 'green', 'blue', 'gold'].includes(dto.themeStyle) ? dto.themeStyle : 'gray') as FeeTheme,
    };
  }

  static toDomainList(dtos: FeePackageDTO[]): FeePackageModel[] {
    return dtos.map(dto => this.toDomain(dto));
  }
}
