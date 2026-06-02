"use client";
import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 32px;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 24px;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.03);
  outline: 1px solid #F1F5F9;
  outline-offset: -1px;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Title = styled.h3`
  color: #1E293B;
  font-size: 24px;
  font-family: ${({ theme }) => theme.fonts.display};
  font-weight: 600;
  line-height: 1.3;
  margin: 0;
`;

export const Subtitle = styled.span`
  color: #64748B;
  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 500;
  letter-spacing: 0.28px;
`;

export const TabsContainer = styled.div`
  display: flex;
  background: #F8FAFC;
  padding: 4px;
  border-radius: 12px;
`;

export const TabButton = styled.button<{ $active?: boolean }>`
  padding: 8px 16px;
  background: ${({ $active }) => ($active ? '#ffffff' : 'transparent')};
  color: ${({ $active }) => ($active ? '#0284C7' : '#64748B')};
  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: ${({ $active }) => ($active ? 600 : 500)};
  border-radius: 8px;
  border: none;
  cursor: pointer;
  box-shadow: ${({ $active }) => ($active ? '0px 1px 2px rgba(0,0,0,0.05)' : 'none')};
  transition: all 0.2s;

  &:hover {
    background: ${({ $active }) => ($active ? '#ffffff' : '#e2e8f0')};
  }
`;

export const ChartArea = styled.div`
  width: 100%;
  padding-top: 32px;
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const GridLines = styled.div`
  position: absolute;
  top: 32px;
  left: 0;
  width: 100%;
  height: calc(100% - 64px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-left: 1px solid #F1F5F9;
  border-bottom: 1px solid #F1F5F9;
  padding-left: 8px;
  padding-bottom: 32px;
  z-index: 1;
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  border-top: 1px solid #F1F5F9;
`;

export const BarsContainer = styled.div`
  width: 100%;
  height: 311px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0 8px;
  z-index: 2;
`;

export const Bar = styled.div<{ $heightPct: number; $active?: boolean }>`
  flex: 1;
  margin: 0 4px;
  height: ${({ $heightPct }) => $heightPct}%;
  background: ${({ $active }) => ($active ? '#38BDF8' : '#E0F2FE')};
  border-radius: 12px 12px 0 0;
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    background: #38BDF8;
  }
`;

export const XAxisLabels = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 16px;
`;

export const AxisLabel = styled.div`
  flex: 1;
  text-align: center;
  color: #94A3B8;
  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 500;
  margin: 0 8px;
`;

export const Tooltip = styled.div`
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
  background: #1E293B;
  color: white;
  padding: 4px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
  box-shadow: 0px 4px 6px -4px rgba(0, 0, 0, 0.10);
`;
