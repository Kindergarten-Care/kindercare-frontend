import React from 'react';
import styled from 'styled-components';
import { Section, Container, SectionHeading, SectionTitle, SectionDescription } from '../styles';

const PricingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  width: 100%;
  align-items: stretch;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    max-width: 400px;
  }
`;

const PriceCard = styled.div<{ $featured?: boolean }>`
  background-color: ${props => props.$featured ? props.theme.colors.primary : props.theme.colors.bgWhite};
  color: ${props => props.$featured ? props.theme.colors.bgWhite : props.theme.colors.textDark};
  border: 1px solid ${props => props.$featured ? props.theme.colors.primary : props.theme.colors.borderLight};
  border-radius: 24px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  position: relative;
  box-shadow: ${props => props.$featured ? '0px 20px 25px -5px rgba(0, 0, 0, 0.1)' : '0px 10px 40px -10px rgba(43, 105, 77, 0.08)'};
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Tag = styled.div`
  position: absolute;
  top: 0;
  right: 24px;
  transform: translateY(-50%);
  background-color: ${props => props.theme.colors.accentYellow};
  color: ${props => props.theme.colors.accentDarkGreen};
  padding: 4px 16px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 700;
`;

const PlanTitle = styled.h3`
  font-size: 20px;
  font-weight: 400;
  margin-bottom: 16px;
`;

const PriceWrapper = styled.div`
  display: flex;
  align-items: baseline;
  gap: 4px;
  margin-bottom: 8px;
`;

const Price = styled.span`
  font-size: 32px;
  font-weight: 700;
`;

const Duration = styled.span<{ $featured?: boolean }>`
  font-size: 16px;
  color: ${props => props.$featured ? 'rgba(255, 255, 255, 0.8)' : props.theme.colors.textGray};
`;

const Saving = styled.span<{ $featured?: boolean }>`
  font-size: 12px;
  color: ${props => props.$featured ? props.theme.colors.accentYellow : props.theme.colors.primary};
  margin-bottom: 24px;
  display: block;
  font-weight: 500;
`;

const BenefitsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 32px 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
`;

const BenefitItem = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
`;

const CheckIcon = styled.span<{ $featured?: boolean }>`
  color: ${props => props.$featured ? props.theme.colors.accentYellow : props.theme.colors.primary};
  font-weight: bold;
`;

const SelectButton = styled.button<{ $featured?: boolean }>`
  width: 100%;
  padding: 12px 0;
  border-radius: 9999px;
  border: 1px solid ${props => props.$featured ? props.theme.colors.bgWhite : props.theme.colors.primary};
  background-color: ${props => props.$featured ? props.theme.colors.bgWhite : 'transparent'};
  color: ${props => props.$featured ? props.theme.colors.primary : props.theme.colors.primary};
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.$featured ? props.theme.colors.bgLight : props.theme.colors.primary};
    color: ${props => props.$featured ? props.theme.colors.primary : props.theme.colors.bgWhite};
  }
`;

export const Enrollment: React.FC = () => {
  const plans = [
    {
      title: 'Đóng theo Tháng',
      price: '5.5M',
      duration: '/tháng',
      saving: '',
      benefits: [
        'Học phí cơ bản',
        '3 bữa ăn (sáng, trưa, xế)',
        'Tài khoản App KinderCare',
      ],
      featured: false,
    },
    {
      title: 'Đóng theo Năm',
      price: '55M',
      duration: '/năm',
      saving: 'Tiết kiệm 11.000.000đ (~2 tháng)',
      benefits: [
        'Mọi quyền lợi gói Tháng',
        'Tặng 2 bộ đồng phục',
        'Miễn phí cơ sở vật chất năm đầu',
        'Ưu tiên chọn lớp/giáo viên',
      ],
      featured: true,
      tag: 'Phổ biến nhất',
    },
    {
      title: 'Đóng theo Quý',
      price: '15.5M',
      duration: '/quý',
      saving: 'Tiết kiệm 1.000.000đ',
      benefits: [
        'Mọi quyền lợi gói Tháng',
        'Giảm 50% phí CSVC',
        'Tặng 1 bộ đồng phục',
      ],
      featured: false,
    },
  ];

  return (
    <Section id="enrollment" $bg="#E3F2FD">
      <Container>
        <SectionHeading>ĐẦU TƯ CHO TƯƠNG LAI</SectionHeading>
        <SectionTitle>Chương trình Tuyển sinh & Học phí</SectionTitle>
        <SectionDescription>
          Gói học phí linh hoạt, minh bạch, bao gồm toàn bộ chi phí giáo dục, dinh dưỡng và sử dụng ứng dụng quản lý.
        </SectionDescription>

        <PricingGrid>
          {plans.map((plan, index) => (
            <PriceCard key={index} $featured={plan.featured}>
              {plan.tag && <Tag>{plan.tag}</Tag>}
              <PlanTitle>{plan.title}</PlanTitle>
              <PriceWrapper>
                <Price>{plan.price}</Price>
                <Duration $featured={plan.featured}>{plan.duration}</Duration>
              </PriceWrapper>
              {plan.saving && <Saving $featured={plan.featured}>{plan.saving}</Saving>}
              
              <BenefitsList>
                {plan.benefits.map((benefit, bIndex) => (
                  <BenefitItem key={bIndex}>
                    <CheckIcon $featured={plan.featured}>✓</CheckIcon>
                    {benefit}
                  </BenefitItem>
                ))}
              </BenefitsList>

              <SelectButton $featured={plan.featured}>Chọn gói này</SelectButton>
            </PriceCard>
          ))}
        </PricingGrid>
      </Container>
    </Section>
  );
};
