'use client';

import styled, { keyframes } from 'styled-components';

export const Card = styled.div`
  background: #fff;
  border: 1px solid #E6EEE9;
  border-radius: 16px;
  box-shadow: 0 4px 18px -4px rgba(0, 90, 54, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.03);
  padding: 20px 22px;
`;

export const ChartHead = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 16px;
  flex-wrap: wrap;
`;

export const ChartTitle = styled.span`
  font-family: var(--font-plus-jakarta, 'Plus Jakarta Sans'), sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #1F2937;
`;

export const LegendRow = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 14px;
`;

export const LegendItem = styled.div<{ $color: string }>`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  font-weight: 600;
  color: #6B7280;

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 3px;
    background: ${p => p.$color};
    display: inline-block;
    flex-shrink: 0;
  }
`;

export const ChartWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
`;

export const ChartSvg = styled.svg`
  width: 100%;
  height: 100%;
  overflow: visible;
`;

export const AxisLabel = styled.text`
  font-size: 4.5px;
  fill: #9CA3AF;
  font-weight: 600;
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const ChartTooltip = styled.div`
  position: absolute;
  background: rgba(15, 23, 42, 0.92);
  color: #fff;
  padding: 8px 12px;
  border-radius: 9px;
  font-size: 11.5px;
  font-weight: 600;
  pointer-events: none;
  box-shadow: 0 10px 25px -10px rgba(0, 0, 0, 0.3);
  animation: ${fadeIn} 0.15s ease-out;
  white-space: nowrap;
  z-index: 10;
`;

export const EmptyState = styled.div`
  padding: 60px 40px;
  text-align: center;
  color: #6B7280;
`;
