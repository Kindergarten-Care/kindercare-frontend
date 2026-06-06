import styled from 'styled-components';
import { FeeTheme } from '@/config/types/feeConfig';
import { adminTheme } from '@/theme/tokens';

const { feeConfig } = adminTheme.colors;

export const CardContainer = styled.div<{ $theme: FeeTheme }>`
  background-color: ${({ $theme }) => feeConfig.bg[$theme]};
  border: ${({ $theme }) => $theme === 'gold' ? `2px solid ${feeConfig.iconBg.gold}` : $theme === 'gray' ? `1px solid ${feeConfig.border.gray}` : 'none'};
  box-shadow: ${({ $theme }) => $theme === 'gold' ? '0px 10px 15px -3px rgba(0,0,0,0.1)' : '0px 4px 6px -1px rgba(0,0,0,0.1)'};
  border-radius: 12px;
  padding: 24px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  height: 287px;
`;

export const PopularBadge = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  background-color: ${feeConfig.iconBg.gold};
  color: white;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 10px;
  letter-spacing: 0.5px;
  padding: 4px 12px;
  border-bottom-left-radius: 8px;
  z-index: 2;
`;

export const OverlayIcon = styled.div<{ $theme: FeeTheme }>`
  position: absolute;
  top: 0;
  right: 0;
  width: ${({ $theme }) => $theme === 'gold' ? '128px' : '96px'};
  height: ${({ $theme }) => $theme === 'gold' ? '128px' : '96px'};
  border-bottom-left-radius: 9999px;
  background-color: ${({ $theme }) => feeConfig.overlay[$theme]};
  z-index: 0;
`;

export const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
`;

export const IconBox = styled.div<{ $theme: FeeTheme }>`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ $theme }) => feeConfig.iconBg[$theme]};
  color: ${({ $theme }) => $theme === 'gray' ? '#64748b' : 'white'};
  border: ${({ $theme }) => $theme === 'gray' ? `1px solid ${feeConfig.border.gray}` : 'none'};
`;

export const Title = styled.h3<{ $theme: FeeTheme }>`
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 24px;
  margin: 0;
  color: ${({ $theme }) => feeConfig.title[$theme]};
`;

export const PriceSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`;

export const Subtext = styled.span<{ $theme: FeeTheme }>`
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: ${({ $theme }) => feeConfig.subtext[$theme]};
`;

export const PriceRow = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 4px;
`;

export const Price = styled.span<{ $theme: FeeTheme }>`
  font-family: 'Montserrat', sans-serif;
  font-weight: ${({ $theme }) => $theme === 'gold' ? 700 : 400};
  font-size: 28px;
  line-height: 42px;
  color: ${({ $theme }) => $theme === 'gold' ? feeConfig.iconBg.gold : feeConfig.title[$theme]};
`;

export const Currency = styled.span<{ $theme: FeeTheme }>`
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  font-size: 16px;
  margin-bottom: 8px;
  color: ${({ $theme }) => feeConfig.subtext[$theme]};
`;

export const OriginalPrice = styled.span<{ $theme: FeeTheme }>`
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 12px;
  text-decoration: line-through;
  color: ${({ $theme }) => feeConfig.originalPrice[$theme]};
`;

export const Footer = styled.div<{ $theme: FeeTheme }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 24px;
  border-top: 1px solid ${({ $theme }) => feeConfig.border[$theme]};
`;

export const DiscountBadge = styled.div<{ $theme: FeeTheme }>`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 9999px;
  background-color: ${({ $theme }) => feeConfig.badgeBg[$theme]};
  color: ${({ $theme }) => feeConfig.badgeText[$theme]};
  font-weight: ${({ $theme }) => $theme === 'gold' ? 700 : 500};
  font-size: 12px;
  border: ${({ $theme }) => $theme === 'gray' ? `1px solid ${feeConfig.border.gray}` : 'none'};
  box-shadow: ${({ $theme }) => $theme !== 'gray' ? '0px 1px 1px rgba(0,0,0,0.05)' : 'none'};
`;

export const ActionButton = styled.button<{ $theme: FeeTheme }>`
  background: ${({ $theme }) => $theme === 'gold' ? feeConfig.iconBg.gold : 'transparent'};
  color: ${({ $theme }) => $theme === 'gold' ? 'white' : feeConfig.title[$theme]};
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: 14px;
  padding: ${({ $theme }) => $theme === 'gold' ? '8px 16px' : '0'};
  border-radius: ${({ $theme }) => $theme === 'gold' ? '9999px' : '0'};
  box-shadow: ${({ $theme }) => $theme === 'gold' ? '0px 1px 1px rgba(0,0,0,0.05)' : 'none'};
  
  &:hover {
    opacity: 0.8;
  }
`;
