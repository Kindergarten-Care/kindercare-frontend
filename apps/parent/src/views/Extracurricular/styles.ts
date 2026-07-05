'use client';

import styled from 'styled-components';

export const PageWrap = styled.div`
  max-width: 1180px;
  margin: 0 auto;
  padding: 24px 32px 56px;
  @media (max-width: 860px) { padding: 18px 18px 48px; }
`;

export const PageHeader = styled.div`
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

export const SectionTitle = styled.h2`
  font-size: 15px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 14px;
  display: flex;
  align-items: center;
  gap: 9px;

  &::before {
    content: '';
    width: 4px;
    height: 15px;
    border-radius: 3px;
    background: var(--brand, #005a36);
  }
`;

export const Section = styled.div`
  margin-bottom: 32px;
`;

/* activity catalog */

export const ActivityGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
`;

export const ActivityCard = styled.div`
  background: #fff;
  border: 1px solid var(--border, #e6eee9);
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ActivityIcon = styled.span`
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: #f1ecfe;
  color: #8b5cf6;
  display: grid;
  place-items: center;
`;

export const ActivityName = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: #1f2937;
`;

export const ActivityDesc = styled.p`
  font-size: 12.5px;
  color: #6b7280;
  line-height: 1.5;
  flex: 1;
`;

export const ActivityFee = styled.div`
  font-size: 15px;
  font-weight: 800;
  color: var(--brand, #005a36);
`;

export const ActivityFeeUnit = styled.span`
  font-size: 11.5px;
  font-weight: 500;
  color: #9ca3af;
`;

export const Btn = styled.button<{ $variant?: 'brand' | 'ghost' | 'danger' }>`
  font: inherit;
  font-weight: 700;
  border: none;
  cursor: pointer;
  border-radius: 11px;
  font-size: 13px;
  padding: 10px 16px;
  transition: transform 0.12s, background 0.15s;
  width: 100%;

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

/* enrollments */

export const EnrollList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const EnrollCard = styled.div`
  background: #fff;
  border: 1px solid var(--border, #e6eee9);
  border-radius: 16px;
  padding: 18px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const EnrollBody = styled.div`
  flex: 1;
  min-width: 0;
`;

export const EnrollName = styled.div`
  font-size: 14.5px;
  font-weight: 700;
  color: #1f2937;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

export const EnrollMeta = styled.div`
  font-size: 12.5px;
  color: #6b7280;
  margin-top: 3px;
`;

export const EnrollDeadline = styled.div<{ $expired?: boolean }>`
  font-size: 12px;
  font-weight: 600;
  margin-top: 4px;
  color: ${p => (p.$expired ? '#dc2626' : '#d97706')};
`;

export const Badge = styled.span<{ $variant: 'pending' | 'active' | 'cancelled' | 'expired' }>`
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
      case 'expired':
        return 'background:#fee2e2;color:#dc2626;';
      default:
        return 'background:#fef3c7;color:#92400e;';
    }
  }}
`;

export const EnrollActions = styled.div`
  flex-shrink: 0;
  width: 140px;
`;

export const EmptyState = styled.div`
  padding: 32px 24px;
  text-align: center;
  color: #6b7280;
  background: #fff;
  border-radius: 16px;
  border: 1px solid var(--border, #e6eee9);
  font-size: 13.5px;
`;

export const LoadingState = styled.div`
  padding: 48px 24px;
  text-align: center;
  color: #6b7280;
`;
