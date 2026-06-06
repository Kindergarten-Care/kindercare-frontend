export type FeeTheme = 'gray' | 'green' | 'blue' | 'gold';

export interface FeePackageDTO {
  id: string;
  name: string;
  price: number;
  originalPrice: number | null;
  discountPercentage: number;
  isPopular: boolean;
  themeStyle: string;
}

export interface FeePackageModel {
  id: string;
  title: string;
  price: string;
  originalPrice?: string;
  discountPercent: number;
  isPopular: boolean;
  theme: FeeTheme;
}
