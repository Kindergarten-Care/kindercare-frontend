'use client';

import styled from 'styled-components';

export const MonthGroupList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 26px;
`;

export const MonthGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const MonthGroupTitle = styled.h3`
  font-size: 13px;
  font-weight: 700;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  padding-left: 2px;
`;

export const InvoiceList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const InvoiceStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

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
  font-size: 22px;
  ${p => {
    if (p.$type === 'TUITION') return 'background:#e3edfd;';
    if (p.$type === 'EXTRACURRICULAR') return 'background:#fef3c7;';
    return 'background:#f1ecfe;';
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

export const BreakdownList = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 12px 8px;
  border: 1px solid var(--border, #e6eee9);
  border-radius: 12px;
  background: #fafbfa;
  overflow: hidden;
`;

export const BreakdownItem = styled.a`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 14px;
  text-decoration: none;
  color: #4b5563;
  font-size: 13px;
  border-bottom: 1px solid #eef0ec;
  transition: background 0.12s;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #f1f5f1;
  }
`;

export const BreakdownLabel = styled.span`
  flex: 1;
  min-width: 0;
  font-weight: 600;
`;

export const BreakdownAmount = styled.span`
  font-weight: 700;
  color: #1f2937;
  white-space: nowrap;
`;