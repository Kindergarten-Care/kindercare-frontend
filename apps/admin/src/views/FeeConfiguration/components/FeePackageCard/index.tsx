'use client';

import React from 'react';
import { EditIcon, CalendarIcon, BadgeTagIcon, BadgeFireIcon } from '@kindercare/ui';
import {
  CardContainer,
  OverlayIcon,
  PopularBadge,
  ContentWrapper,
  Header,
  IconBox,
  Title,
  PriceSection,
  Subtext,
  PriceRow,
  Price,
  Currency,
  OriginalPrice,
  Footer,
  DiscountBadge,
  ActionButton
} from './styles';
import { FeeTheme } from '@/config/types/feeConfig';

export interface FeePackageCardProps {
  theme: FeeTheme;
  title: string;
  price: string;
  originalPrice?: string;
  discountPercent: number;
  isPopular?: boolean;
}

export const FeePackageCard: React.FC<FeePackageCardProps> = ({
  theme,
  title,
  price,
  originalPrice,
  discountPercent,
  isPopular
}) => {
  return (
    <CardContainer $theme={theme}>
      {isPopular && <PopularBadge>PHỔ BIẾN</PopularBadge>}
      <OverlayIcon $theme={theme} />
      
      <ContentWrapper>
        <Header>
          <IconBox $theme={theme}>
            <CalendarIcon size={20} />
          </IconBox>
          <Title $theme={theme}>{title}</Title>
        </Header>
        
        <PriceSection>
          <Subtext $theme={theme}>Đơn giá gốc</Subtext>
          <PriceRow>
            <Price $theme={theme}>{price}</Price>
            <Currency $theme={theme}>đ</Currency>
          </PriceRow>
          {originalPrice && (
            <OriginalPrice $theme={theme}>{originalPrice}đ</OriginalPrice>
          )}
        </PriceSection>

        <Footer $theme={theme}>
          <DiscountBadge $theme={theme}>
            {theme === 'gold' ? <BadgeFireIcon size={12} /> : <BadgeTagIcon size={12} />}
            Giảm {discountPercent}%
          </DiscountBadge>
          
          <ActionButton $theme={theme}>
            Chỉnh sửa <EditIcon size={12} />
          </ActionButton>
        </Footer>
      </ContentWrapper>
    </CardContainer>
  );
};
