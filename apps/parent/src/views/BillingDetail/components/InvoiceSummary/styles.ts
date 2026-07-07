'use client';

import styled from 'styled-components';

export const Card = styled.div`
  background: #fff;
  border: 1px solid var(--border, #e6eee9);
  border-radius: 18px;
  overflow: hidden;
  margin-bottom: 20px;
`;

export const CardHead = styled.div`
  padding: 22px 24px;
  border-bottom: 1px solid #f1f5f9;
  display: flex;
  align-items: center;
  gap: 14px;
`;

export const HeadTitle = styled.h1`
  font-family: var(--font-plus-jakarta, 'Plus Jakarta Sans'), sans-serif;
  font-size: 19px;
  font-weight: 800;
  color: #1f2937;
`;

export const HeadSub = styled.p`
  font-size: 12.5px;
  color: #6b7280;
  margin-top: 3px;
`;

export const CardBody = styled.div`
  padding: 22px 24px;
`;

export const LineRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  font-size: 14px;
  border-bottom: 1px solid #f8fafc;

  &:last-child { border-bottom: none; }
`;

export const LineLabel = styled.span`
  color: #6b7280;
`;

export const LineValue = styled.span<{ $negative?: boolean }>`
  font-weight: 600;
  color: ${p => (p.$negative ? 'var(--green-ok, #16803d)' : '#1f2937')};
`;

export const TotalRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 14px;
  margin-top: 8px;
  border-top: 2px solid #f1f5f9;
`;

export const TotalLabel = styled.span`
  font-size: 15px;
  font-weight: 700;
  color: #1f2937;
`;

export const TotalValue = styled.span`
  font-size: 22px;
  font-weight: 800;
  color: var(--brand, #005a36);
`;

export const Badge = styled.span<{ $variant: 'unpaid' | 'partial' | 'paid' | 'cancelled' }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 12px;
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

export const ItemRow = styled.div<{ $struck?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #f8fafc;
  opacity: ${p => (p.$struck ? 0.55 : 1)};

  &:last-child { border-bottom: none; }
`;

export const ItemInfo = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`;

export const ItemName = styled.span<{ $struck?: boolean }>`
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
  text-decoration: ${p => (p.$struck ? 'line-through' : 'none')};
`;

export const ItemRight = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
`;

export const ItemFee = styled.span<{ $struck?: boolean }>`
  font-size: 14px;
  font-weight: 700;
  color: #1f2937;
  text-decoration: ${p => (p.$struck ? 'line-through' : 'none')};
`;

export const ItemBadge = styled.span<{ $variant: 'pending' | 'active' | 'cancelled' | 'cancelled-warn' | 'expired' }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  white-space: nowrap;
  ${p => {
    switch (p.$variant) {
      case 'active':
        return 'background:#dcfce7;color:#16803d;';
      case 'cancelled':
      case 'expired':
        return 'background:#f3f4f6;color:#6b7280;';
      case 'cancelled-warn':
        return 'background:#fee2e2;color:#dc2626;';
      default:
        return 'background:#fef3c7;color:#92400e;';
    }
  }}
`;

export const ItemCancelBtn = styled.button`
  font: inherit;
  font-weight: 600;
  border: none;
  background: none;
  color: #dc2626;
  font-size: 12px;
  cursor: pointer;
  padding: 4px 6px;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  &:hover { background: #fee2e2; }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
`;