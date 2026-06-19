'use client';

import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Card = styled.div`
  background: var(--surface, #fff);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 16px 18px;
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 100%;
  box-sizing: border-box;
`;

export const CardHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
`;

export const CardTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--fg);
`;

export const LegendRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

export const LegendItem = styled.div<{ $color: string }>`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 600;
  color: #64748b;

  &::before {
    content: '';
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: ${p => p.$color};
    display: inline-block;
  }
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
`;

export const StatCard = styled.div<{ $type?: 'green' | 'blue' | 'purple' }>`
  background: ${p => {
    if (p.$type === 'green') return '#f0fdf4';
    if (p.$type === 'blue') return '#f0f9ff';
    return '#fdf2f8'; // pink/purple
  }};
  border: 1px solid ${p => {
    if (p.$type === 'green') return '#dcfce7';
    if (p.$type === 'blue') return '#e0f2fe';
    return '#fce7f3';
  }};
  border-radius: 12px;
  padding: 8px 10px;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const StatLabel = styled.span`
  font-size: 11.5px;
  font-weight: 500;
  color: #64748b;
`;

export const StatValue = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: var(--fg);
  display: flex;
  align-items: baseline;
  gap: 2px;

  span {
    font-size: 11px;
    font-weight: 600;
    color: #64748b;
  }
`;

export const StatBadge = styled.span<{ $type?: 'success' | 'warn' | 'info' }>`
  font-size: 10px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 6px;
  width: fit-content;
  margin-top: 2px;
  background: ${p => {
    if (p.$type === 'success') return '#bbf7d0';
    if (p.$type === 'info') return '#bae6fd';
    return '#fbcfe8';
  }};
  color: ${p => {
    if (p.$type === 'success') return '#15803d';
    if (p.$type === 'info') return '#0369a1';
    return '#be185d';
  }};
`;

export const ChartWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 120px;
  margin-top: 4px;
`;

export const ChartSvg = styled.svg`
  width: 100%;
  height: 100%;
  overflow: visible;
`;

export const AxisLabel = styled.text`
  font-size: 10px;
  fill: #94a3b8;
  font-weight: 600;
`;

export const ChartTooltip = styled.div`
  position: absolute;
  background: rgba(15, 23, 42, 0.9);
  color: #ffffff;
  padding: 6px 10px;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 600;
  pointer-events: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  animation: ${fadeIn} 0.15s ease-out;
  white-space: nowrap;
  z-index: 10;
  
  span {
    display: block;
    font-size: 9.5px;
    color: #94a3b8;
    margin-top: 2px;
  }
`;
