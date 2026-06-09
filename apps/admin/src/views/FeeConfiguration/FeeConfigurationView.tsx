'use client';

import React from 'react';
import { PlusIcon } from '@kindercare/ui';
import { FeePackageCard } from './components/FeePackageCard';
import { useFeePackages } from './hooks';
import {
  Container,
  HeaderSection,
  TitleContainer,
  PageTitle,
  SubTitle,
  CreateButton,
  BentoGrid
} from './styles';

export const FeeConfigurationView: React.FC = () => {
  const { packages, isLoading } = useFeePackages();

  return (
    <Container>
      <HeaderSection>
        <TitleContainer>
          <PageTitle>Gói Học phí</PageTitle>
          <SubTitle>Quản lý và cấu hình các gói thanh toán định kỳ cho học sinh.</SubTitle>
        </TitleContainer>
        <CreateButton>
          <PlusIcon size={14} />
          Tạo Gói Mới
        </CreateButton>
      </HeaderSection>

      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
          Đang tải dữ liệu...
        </div>
      ) : (
        <BentoGrid>
          {packages.map((pkg) => (
            <FeePackageCard
              key={pkg.id}
              theme={pkg.theme}
              title={pkg.title}
              price={pkg.price}
              originalPrice={pkg.originalPrice}
              discountPercent={pkg.discountPercent}
              isPopular={pkg.isPopular}
            />
          ))}
        </BentoGrid>
      )}
    </Container>
  );
};
