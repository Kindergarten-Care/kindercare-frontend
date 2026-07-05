import React from 'react';
import styled from 'styled-components';
import { ChevronRight } from 'lucide-react';

interface CategoryItem {
  id: string;
  label: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  onClick: () => void;
}

interface QuickCategoriesProps {
  categories: CategoryItem[];
  onViewAll?: () => void;
}

const Wrapper = styled.div`
  width: 100%;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 13px;
`;

const Title = styled.span`
  font-size: 18px;
  font-weight: 800;
  letter-spacing: -.01em;
  color: #1F2937;
`;

const ViewAllLink = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 13px;
  font-weight: 700;
  color: #005A36;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  
  &:hover {
    text-decoration: underline;
  }
`;

const ChipsContainer = styled.div`
  display: flex;
  gap: 11px;
  flex-wrap: wrap;
`;

const ChipButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 38px;
  padding: 0 14px 0 6px;
  border-radius: 12px;
  background: #fff;
  border: 1px solid #E6EEE9;
  color: #374151;
  font-family: inherit;
  font-weight: 600;
  font-size: 13.5px;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    background: #005A36;
    color: #fff;
    border-color: #005A36;
    transform: translateY(-2px);
    box-shadow: 0 6px 12px -4px rgba(0, 90, 54, 0.2);
  }
`;

const ChipIcon = styled.span<{ $bg: string; $color: string }>`
  width: 26px;
  height: 26px;
  border-radius: 8px;
  background: ${props => props.$bg};
  color: ${props => props.$color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
`;

export const QuickCategoriesWidget: React.FC<QuickCategoriesProps> = ({ categories, onViewAll }) => {
  return (
    <Wrapper>
      <HeaderRow>
        <Title>Danh mục nhanh</Title>
        <ViewAllLink onClick={onViewAll}>
          Xem tất cả <ChevronRight size={15} strokeWidth={2.4} />
        </ViewAllLink>
      </HeaderRow>
      <ChipsContainer>
        {categories.map(c => (
          <ChipButton key={c.id} onClick={c.onClick}>
            <ChipIcon $bg={c.iconBg} $color={c.iconColor}>{c.icon}</ChipIcon>
            {c.label}
          </ChipButton>
        ))}
      </ChipsContainer>
    </Wrapper>
  );
};
