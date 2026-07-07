'use client';

import styled from 'styled-components';

export type Variant = 'brand' | 'ghost' | 'danger';

export const Btn = styled.button<{ $variant?: Variant }>`
  font: inherit;
  font-weight: 700;
  border: none;
  cursor: pointer;
  border-radius: 11px;
  font-size: 13px;
  padding: 10px 16px;
  transition: transform 0.12s, background 0.15s;
  width: 100%;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  ${p => {
    if (p.$variant === 'ghost')
      return `
      background: #fff;
      color: #1f2937;
      border: 1px solid var(--border, #e6eee9);
      &:hover { border-color: #cfe0d5; }
    `;
    if (p.$variant === 'danger')
      return `
      background: #fee2e2;
      color: #dc2626;
      &:hover { background: #fecaca; }
    `;
    return `
      background: var(--brand, #005a36);
      color: #fff;
      &:hover { background: var(--brand-hover, #004428); }
    `;
  }}

  &:active { transform: scale(0.98); }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
`;

export const Badge = styled.span<{ $variant: 'pending' | 'active' | 'cancelled' | 'cancelled-warn' | 'expired' }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  ${p => {
    switch (p.$variant) {
      case 'active':
        return 'background:#dcfce7;color:#16803d;';
      case 'cancelled':
        return 'background:#f3f4f6;color:#6b7280;';
      case 'cancelled-warn':
        return 'background:#fef3c7;color:#b45309;';
      case 'expired':
        return 'background:#fee2e2;color:#dc2626;';
      default:
        return 'background:#fef3c7;color:#92400e;';
    }
  }}
`;