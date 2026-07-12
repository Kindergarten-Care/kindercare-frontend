'use client';

import styled from 'styled-components';

export const Card = styled.div`
  min-width: 0;
  background: var(--surface, #fff);
  border: 1px solid var(--border, #e6eee9);
  border-radius: 16px;
  padding: 16px 20px;
  box-shadow: 0 4px 18px -4px rgba(0, 90, 54, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.03);
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 100%;
  box-sizing: border-box;
`;

export const CardHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

export const CardTitle = styled.h3`
  font-size: 15px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #1f2937;
`;

export const ViewDetailsBtn = styled.button`
  font-family: inherit;
  font-size: 12px;
  font-weight: 700;
  color: var(--brand, #005a36);
  background: #f0fdf4;
  border: 1px solid rgba(0, 90, 54, 0.15);
  border-radius: 8px;
  padding: 5px 12px;
  cursor: pointer;
  transition: all 0.15s ease;
  white-space: nowrap;

  &:hover {
    background: var(--brand-tint, #e6f3ed);
    border-color: var(--brand, #005a36);
  }
`;

export const WidgetBody = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

export const SummarySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: #f8fafc;
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid #f1f5f9;
`;

export const SectionTitle = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const MetricsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-top: 4px;
`;

export const MetricBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px 4px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  text-align: center;
`;

export const MetricLabel = styled.div`
  font-size: 10px;
  color: #64748b;
  font-weight: 500;
`;

export const MetricValue = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: #1f2937;
  margin-top: 2px;

  span {
    font-size: 9px;
    font-weight: 500;
    color: #94a3b8;
  }
`;

export const BmiBadge = styled.span<{ $type: string }>`
  font-size: 8px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 999px;
  margin-top: 4px;
  text-transform: uppercase;
  ${p => {
    switch (p.$type) {
      case 'success':
        return 'background:#dcfce7;color:#166534;';
      case 'warn':
        return 'background:#fef3c7;color:#92400e;';
      default:
        return 'background:#fee2e2;color:#991b1b;';
    }
  }}
`;

export const DomainsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 2px;
`;

export const DomainRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 11.5px;
  color: #334155;
`;

export const DomainName = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 500;
`;

export const DomainScore = styled.div`
  font-weight: 700;
  color: #1f2937;
`;

export const ProgressBar = styled.div`
  height: 4px;
  background: #e2e8f0;
  border-radius: 2px;
  overflow: hidden;
  margin-top: 2px;
  width: 100%;
`;

export const ProgressFill = styled.div<{ $percent: number; $color: string }>`
  height: 100%;
  width: ${p => p.$percent}%;
  background: ${p => p.$color};
  border-radius: 2px;
`;
