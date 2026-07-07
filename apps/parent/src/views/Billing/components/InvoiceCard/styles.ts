'use client';

import styled from 'styled-components';

export const InvoiceCard = styled.a`
  display: flex;
  align-items: center;
  gap: 16px;
  background: #fff;
  border: 1px solid var(--border, #e6eee9);
  border-radius: 16px;
  padding: 18px 20px;
  cursor: pointer;
  transition: all 0.15s;
  text-decoration: none;
  color: inherit;

  &:hover {
    border-color: #cfe0d5;
    box-shadow: 0 4px 18px -6px rgba(0, 90, 54, 0.1);
  }
`;

export const InvIcon = styled.span<{ $type: 'TUITION' | 'MONTHLY' | 'EXTRACURRICULAR' }>`
  width: 46px;
  height: 46px;
  border-radius: 13px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  ${p => {
    if (p.$type === 'TUITION') return 'background:#e3edfd;color:#2563eb;';
    if (p.$type === 'EXTRACURRICULAR') return 'background:#fef3c7;color:#d97706;';
    return 'background:#f1ecfe;color:#8b5cf6;';
  }}
`;

export const InvBody = styled.div`
  flex: 1;
  min-width: 0;
`;

export const InvTitle = styled.div`
  font-size: 14.5px;
  font-weight: 700;
  color: #1f2937;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

export const InvRefund = styled.div`
  font-size: 12px;
  color: var(--green-ok, #16803d);
  margin-top: 4px;
  font-weight: 600;
`;

export const InvRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
  flex-shrink: 0;
`;

export const InvAmount = styled.div`
  font-size: 16px;
  font-weight: 800;
  color: #1f2937;
`;

export const Badge = styled.span<{ $variant: 'unpaid' | 'partial' | 'paid' | 'cancelled' }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  ${p => {
    switch (p.$variant) {
      case 'paid':
        return 'background:#dcfce7;color:#16803d;';
      case 'partial':
        return 'background:#fef3c7;color:#92400e;';
      case 'cancelled':
        return 'background:#f3f4f6;color:#6b7280;';
      default:
        return 'background:#fee2e2;color:#dc2626;';
    }
  }}
`;

export const DueBadge = styled.span<{ $variant: 'ok' | 'soon' | 'overdue' }>`
  font-size: 11.5px;
  font-weight: 600;
  ${p => {
    switch (p.$variant) {
      case 'overdue':
        return 'color:#dc2626;';
      case 'soon':
        return 'color:#d97706;';
      default:
        return 'color:#9ca3af;';
    }
  }}
`;