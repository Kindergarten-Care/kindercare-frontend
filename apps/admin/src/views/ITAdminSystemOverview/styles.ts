'use client';

import styled, { keyframes, css } from 'styled-components';

/* ─── Layout ─── */
export const PageWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(90deg, #f4f7fb 0%, #f4f7fb 100%);
  font-family: 'Montserrat', sans-serif;
`;

export const MainContent = styled.main`
  margin-left: 280px;
  margin-top: 64px;
  flex: 1;
  padding: 31px 32px;
  min-height: calc(100vh - 64px);
  max-width: calc(100vw - 280px);
`;

export const Container = styled.div`
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

/* ─── Header ─── */
export const PageHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const PageTitle = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 32px;
  color: #1e293b;
  line-height: 38.4px;
  margin: 0;
`;

export const PageSubtitle = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  font-size: 16px;
  color: #64748b;
  line-height: 24px;
  margin: 0;
`;

/* ─── Metric Cards ─── */
export const MetricCardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
`;

export const MetricCard = styled.div`
  background: white;
  border: 1px solid #f1f5f9;
  border-radius: 24px;
  padding: 25px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.03);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06);
  }
`;

export const CardIconWrapper = styled.div<{ $bg: string }>`
  width: 48px;
  height: 48px;
  border-radius: 16px;
  background: ${({ $bg }) => $bg};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    width: 22px;
    height: 18px;
  }
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

export const CardLabel = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: #64748b;
  letter-spacing: 0.7px;
  text-transform: uppercase;
  line-height: 16.8px;
`;

export const CardValueRow = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 8px;
`;

export const CardValue = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 48px;
  color: #1e293b;
  line-height: 48px;
  letter-spacing: -1.2px;
`;

export const CardBadge = styled.span<{ $variant: 'success' | 'info' | 'warning' }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 8px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 12px;
  line-height: 14.4px;
  margin-bottom: 4px;

  ${({ $variant }) => {
    switch ($variant) {
      case 'success':
        return css`
          background: #f0fdf4;
          color: #16a34a;
        `;
      case 'info':
        return css`
          background: #f0f9ff;
          color: #0369a1;
        `;
      case 'warning':
        return css`
          background: #fefce8;
          color: #ca8a04;
        `;
    }
  }}
`;

const pulseDot = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

export const LiveDot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #0ea5e9;
  display: inline-block;
  animation: ${pulseDot} 2s ease-in-out infinite;
`;

export const TrendArrow = styled.span`
  display: inline-flex;
  align-items: center;
  width: 10.667px;
  height: 10.667px;
  
  svg {
    width: 100%;
    height: 100%;
  }
`;

/* ─── Charts Grid ─── */
export const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 24px;
`;

/* ─── Pie Chart Card ─── */
export const ChartCard = styled.div`
  background: white;
  border: 1px solid #f1f5f9;
  border-radius: 24px;
  padding: 25px;
  filter: drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.03));
`;

export const ChartCardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

export const ChartTitle = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 24px;
  color: #1e293b;
  line-height: 31.2px;
  margin: 0;
`;

export const MoreButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: #94a3b8;
  display: flex;
  align-items: center;

  &:hover {
    color: #64748b;
  }
`;

export const PieChartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
`;

export const PieChartSvg = styled.div`
  width: 224px;
  height: 224px;
  position: relative;
`;

export const LegendList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  border-radius: 12px;
  transition: background 0.15s ease;

  &:hover {
    background: #f8fafc;
  }
`;

export const LegendLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const LegendDot = styled.span<{ $color: string }>`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
`;

export const LegendLabel = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: #334155;
  line-height: 24px;
`;

export const LegendValue = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: #64748b;
  letter-spacing: 0.28px;
  line-height: 16.8px;
`;

/* ─── Bar Chart Card ─── */
export const BarChartCard = styled.div`
  background: white;
  border: 1px solid #f1f5f9;
  border-radius: 24px;
  padding: 33px;
  filter: drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.03));
  display: flex;
  flex-direction: column;
`;

export const BarChartHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 32px;
`;

export const BarChartTitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const BarChartSubtitle = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: #64748b;
  letter-spacing: 0.28px;
  line-height: 16.8px;
`;

export const ToggleGroup = styled.div`
  display: flex;
  background: #f8fafc;
  border-radius: 12px;
  padding: 4px;
`;

export const ToggleButton = styled.button<{ $active?: boolean }>`
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  letter-spacing: 0.28px;
  line-height: 16.8px;
  cursor: pointer;
  transition: all 0.2s ease;

  ${({ $active }) =>
    $active
      ? css`
          background: white;
          color: #0284c7;
          font-weight: 600;
          filter: drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.05));
        `
      : css`
          background: transparent;
          color: #64748b;
          font-weight: 500;

          &:hover {
            color: #475569;
          }
        `}
`;

export const BarChartArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  padding-top: 16px;
`;

export const GridLines = styled.div`
  position: absolute;
  top: 16px;
  left: 0;
  right: 0;
  bottom: 17px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-left: 1px solid #f1f5f9;
  border-bottom: 1px solid #f1f5f9;
  padding-left: 9px;
`;

export const GridLine = styled.div`
  width: 100%;
  border-top: 1px dashed #f1f5f9;
`;

export const BarsContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 8px;
  padding: 0 12px 0 20px;
  height: 311px;
  position: relative;
  z-index: 1;
`;

const barGrow = keyframes`
  from { transform: scaleY(0); }
  to { transform: scaleY(1); }
`;

export const Bar = styled.div<{ $height: number; $active?: boolean; $delay: number }>`
  flex: 1;
  height: ${({ $height }) => $height}px;
  background: ${({ $active }) => ($active ? '#38bdf8' : '#e0f2fe')};
  border-radius: 12px 12px 0 0;
  position: relative;
  transform-origin: bottom;
  animation: ${barGrow} 0.6s ease-out forwards;
  animation-delay: ${({ $delay }) => $delay}s;
  transition: background 0.2s ease;
  cursor: pointer;

  ${({ $active }) =>
    $active &&
    css`
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
    `}

  &:hover {
    background: ${({ $active }) => ($active ? '#0ea5e9' : '#bae6fd')};
  }
`;

export const BarTooltip = styled.div`
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
  background: #1e293b;
  color: white;
  padding: 5px 12px;
  border-radius: 8px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 12px;
  line-height: 14.4px;
  white-space: nowrap;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
  opacity: 0;
  transition: opacity 0.2s ease;
  pointer-events: none;

  ${Bar}:hover & {
    opacity: 1;
  }
`;

export const XAxisLabels = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 12px 0 20px;
  margin-top: 8px;
`;

export const XAxisLabel = styled.span<{ $active?: boolean }>`
  flex: 1;
  text-align: center;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  letter-spacing: 0.28px;
  line-height: 16.8px;

  ${({ $active }) =>
    $active
      ? css`
          font-weight: 700;
          color: #0284c7;
        `
      : css`
          font-weight: 500;
          color: #94a3b8;
        `}
`;
