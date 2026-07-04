'use client';

import styled from 'styled-components';

export const Stack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const Metric = styled.div<{ $c: string; $tint: string }>`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 18px;
  border-radius: 14px;
  border: 1px solid #E6EEE9;
  box-shadow: 0 4px 18px -4px rgba(0, 90, 54, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.03);
  background: #fff;
  --c: ${p => p.$c};
  --c-tint: ${p => p.$tint};
`;

export const MetricIcon = styled.span`
  width: 48px;
  height: 48px;
  border-radius: 13px;
  display: grid;
  place-items: center;
  background: var(--c-tint);
  color: var(--c);
  flex-shrink: 0;
`;

export const MetricBody = styled.div`
  flex: 1;
  min-width: 0;
`;

export const MetricKey = styled.div`
  font-size: 12px;
  color: #6B7280;
  font-weight: 500;
`;

export const MetricValue = styled.div`
  font-family: var(--font-plus-jakarta, 'Plus Jakarta Sans'), sans-serif;
  font-size: 23px;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1;
  margin-top: 3px;
  color: #1F2937;

  small {
    font-size: 13px;
    font-weight: 700;
    color: #9CA3AF;
    margin-left: 2px;
  }
`;

export const MetricDelta = styled.span<{ $variant: 'up' | 'flat' | 'warn' }>`
  font-size: 11.5px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 3px;
  margin-left: auto;
  flex-shrink: 0;
  padding: 4px 9px;
  border-radius: 8px;
  ${p => {
    if (p.$variant === 'up') return 'background: #E6F3ED; color: #005A36;';
    if (p.$variant === 'warn') return 'background: #FEE2E2; color: #DC2626;';
    return 'background: #E3EDFD; color: #2563EB;';
  }}
`;

export const EmptyState = styled.div`
  padding: 24px;
  text-align: center;
  color: #6B7280;
  font-size: 13.5px;
  background: #fff;
  border: 1px solid #E6EEE9;
  border-radius: 14px;
`;
