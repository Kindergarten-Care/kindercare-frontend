'use client';

import styled from 'styled-components';

export const PageWrap = styled.div`
  max-width: 820px;
  margin: 0 auto;
  padding: 24px 32px 56px;
  @media (max-width: 860px) { padding: 18px 18px 48px; }
`;

export const BackLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13.5px;
  font-weight: 600;
  color: var(--muted, #6b7280);
  text-decoration: none;
  margin-bottom: 16px;

  &:hover { color: var(--fg, #1f2937); }
`;

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

export const PayActions = styled.div`
  padding: 20px 24px;
  border-top: 1px solid #f1f5f9;
  background: #fbfdfc;
  display: flex;
  gap: 10px;
`;

export const Btn = styled.button<{ $variant?: 'brand' | 'ghost' }>`
  font: inherit;
  font-weight: 700;
  border: none;
  cursor: pointer;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 14px;
  padding: 13px 20px;
  flex: 1;
  transition: transform 0.12s, background 0.15s;

  ${p =>
    p.$variant === 'ghost'
      ? `
    background: #fff;
    color: #1f2937;
    border: 1px solid var(--border, #e6eee9);
    &:hover { border-color: #cfe0d5; }
  `
      : `
    background: var(--brand, #005a36);
    color: #fff;
    box-shadow: 0 8px 18px -7px rgba(0, 90, 54, 0.5);
    &:hover { background: var(--brand-hover, #004428); }
  `}

  &:active { transform: scale(0.98); }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
`;

export const Timeline = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TxRow = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 0;
  border-bottom: 1px solid #f8fafc;

  &:last-child { border-bottom: none; }
`;

export const TxIcon = styled.span<{ $status: 'Success' | 'Pending' | 'Failed' }>`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  ${p => {
    if (p.$status === 'Success') return 'background:#dcfce7;color:#16803d;';
    if (p.$status === 'Failed') return 'background:#fee2e2;color:#dc2626;';
    return 'background:#fef3c7;color:#92400e;';
  }}
`;

export const TxBody = styled.div`
  flex: 1;
  min-width: 0;
`;

export const TxMethod = styled.div`
  font-size: 13.5px;
  font-weight: 700;
  color: #1f2937;
`;

export const TxMeta = styled.div`
  font-size: 12px;
  color: #9ca3af;
  margin-top: 2px;
`;

export const TxAmount = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #1f2937;
  flex-shrink: 0;
`;

export const Badge = styled.span<{ $variant: 'unpaid' | 'partial' | 'paid' }>`
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
      default:
        return 'background:#fee2e2;color:#dc2626;';
    }
  }}
`;

export const EmptyTx = styled.div`
  padding: 24px;
  text-align: center;
  color: #9ca3af;
  font-size: 13px;
`;

export const LoadingState = styled.div`
  padding: 48px 24px;
  text-align: center;
  color: #6b7280;
`;
