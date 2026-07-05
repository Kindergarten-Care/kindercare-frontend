'use client';

import styled from 'styled-components';

export const PageWrap = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 24px 32px 56px;
  @media (max-width: 860px) { padding: 18px 18px 48px; }
  @media (max-width: 768px) { padding: 16px 0 48px; }
`;

export const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr 440px;
  align-items: start;
  gap: 24px;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`;

export const MainColumn = styled.div`
  min-width: 0;
`;

export const SideColumn = styled.div`
  position: sticky;
  top: 24px;

  @media (max-width: 1000px) {
    position: static;
  }
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

export const PaymentAmountRow = styled.div`
  padding: 20px 24px;
  border-bottom: 1px solid #f1f5f9;
`;

export const PaymentAmountLabel = styled.div`
  font-size: 12.5px;
  color: #6b7280;
  margin-bottom: 4px;
`;

export const PaymentAmountValue = styled.div`
  font-size: 24px;
  font-weight: 800;
  color: var(--brand, #005a36);
`;

export const MethodList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px 24px;
`;

export const MethodOption = styled.label<{ $active: boolean; $disabled?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 13px 14px;
  border-radius: 12px;
  border: 1.5px solid ${p => (p.$active ? 'var(--brand, #005a36)' : 'var(--border, #e6eee9)')};
  background: ${p => (p.$active ? '#f0f8f3' : '#fff')};
  cursor: ${p => (p.$disabled ? 'not-allowed' : 'pointer')};
  opacity: ${p => (p.$disabled ? 0.6 : 1)};
  transition: border-color 0.15s, background 0.15s;

  &:hover {
    border-color: ${p => (p.$disabled ? undefined : 'var(--brand, #005a36)')};
  }
`;

export const MethodRadio = styled.input`
  appearance: none;
  -webkit-appearance: none;
  width: 18px;
  height: 18px;
  margin: 0;
  border-radius: 50%;
  border: 1.5px solid var(--border, #d1d9d5);
  background: #fff;
  cursor: inherit;
  flex-shrink: 0;
  position: relative;
  transition: border-color 0.15s;

  &:checked {
    border-color: var(--brand, #005a36);
  }

  &:checked::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--brand, #005a36);
    transform: translate(-50%, -50%);
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

export const MethodLogo = styled.img`
  height: 22px;
  width: 44px;
  object-fit: contain;
  flex-shrink: 0;
`;

export const MethodName = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: #1f2937;
  flex: 1;
  text-align: left;
`;

export const SubmitPayBtn = styled.button`
  font: inherit;
  font-weight: 700;
  border: none;
  cursor: pointer;
  border-radius: 12px;
  width: calc(100% - 48px);
  margin: 16px 24px 24px;
  padding: 14px 20px;
  font-size: 14.5px;
  background: var(--brand, #005a36);
  color: #fff;
  box-shadow: 0 8px 18px -7px rgba(0, 90, 54, 0.5);
  transition: transform 0.12s, background 0.15s;

  &:hover { background: var(--brand-hover, #004428); }
  &:active { transform: scale(0.98); }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
`;

export const PaidNotice = styled.div`
  padding: 24px;
  text-align: center;
  color: #16803d;
  font-size: 13.5px;
  font-weight: 600;
  background: #f0fdf4;
`;

export const SecurityNote = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #9ca3af;
  padding: 4px 24px 0;
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
