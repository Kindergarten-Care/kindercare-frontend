'use client';

import styled from 'styled-components';

export const PageWrap = styled.div`
  max-width: 1180px;
  margin: 0 auto;
  padding: 24px 32px 56px;
  @media (max-width: 860px) { padding: 18px 18px 48px; }
  @media (max-width: 768px) { padding: 16px 0 48px; }
`;

export const PageHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 22px;
`;

export const PageTitle = styled.h1`
  font-family: var(--font-plus-jakarta, 'Plus Jakarta Sans'), sans-serif;
  font-size: 21px;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #1f2937;
`;

export const PageSub = styled.p`
  font-size: 13px;
  color: #6b7280;
  margin-top: 3px;
`;

/* summary cards */

export const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 24px;
  @media (max-width: 720px) { grid-template-columns: 1fr; }
`;

export const SummaryCard = styled.div`
  background: #fff;
  border: 1px solid var(--border, #e6eee9);
  border-radius: 16px;
  padding: 18px 20px;
  display: flex;
  align-items: center;
  gap: 14px;
`;

export const SummaryIcon = styled.span<{ $bg?: string; $fg?: string }>`
  width: 42px;
  height: 42px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  background: ${p => p.$bg ?? '#e6f3ed'};
  color: ${p => p.$fg ?? 'var(--brand, #005a36)'};
`;

export const SummaryLabel = styled.div`
  font-size: 12.5px;
  color: #6b7280;
  font-weight: 500;
`;

export const SummaryValue = styled.div`
  font-size: 18px;
  font-weight: 800;
  color: #1f2937;
  margin-top: 2px;
`;

/* filters */

export const FilterRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 14px;
  margin-bottom: 18px;
`;

export const FilterDropdownWrap = styled.div`
  flex: 1 1 210px;
  min-width: 0;

  @media (max-width: 480px) {
    flex-basis: 100%;
  }
`;

export const FilterLabel = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;
  margin-bottom: 6px;
`;

/* invoice list */

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

export const InvMeta = styled.div`
  font-size: 12.5px;
  color: #6b7280;
  margin-top: 3px;
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

export const EmptyState = styled.div`
  padding: 48px 24px;
  text-align: center;
  color: #6b7280;
  background: #fff;
  border-radius: 16px;
  border: 1px solid var(--border, #e6eee9);
`;

export const LoadingState = styled.div`
  padding: 48px 24px;
  text-align: center;
  color: #6b7280;
`;
