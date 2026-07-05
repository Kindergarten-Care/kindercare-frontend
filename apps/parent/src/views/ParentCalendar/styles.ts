'use client';

import styled from 'styled-components';

export const PageWrap = styled.div`
  padding: 24px 32px 56px;
  @media (max-width: 860px) { padding: 18px 18px 48px; }
  @media (max-width: 768px) { padding: 16px 0 48px; }
`;

// ─── Toolbar (month picker + filters) ───────────────────────────────────────

export const Toolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  background: #fff;
  border: 1px solid #E6EEE9;
  border-radius: 16px;
  box-shadow: 0 4px 18px -4px rgba(0, 90, 54, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.03);
  padding: 14px 18px;
  margin-bottom: 22px;
  flex-wrap: wrap;
`;

export const MonthNav = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const MonthNavBtn = styled.button`
  width: 38px;
  height: 38px;
  border-radius: 11px;
  border: 1px solid #E6EEE9;
  background: #fff;
  color: #6B7280;
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: all .15s;

  &:hover { border-color: #CFE0D5; color: #005A36; background: #F4F8F5; }
`;

export const MonthTitle = styled.div`
  font-family: var(--font-plus-jakarta, 'Plus Jakarta Sans'), sans-serif;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: -.01em;
  color: #1F2937;
  flex: 1 1 150px;
  min-width: 0;

  @media (max-width: 480px) {
    flex-basis: 100%;
  }
`;

export const TodayBtn = styled.button`
  font: inherit;
  font-size: 12.5px;
  font-weight: 600;
  padding: 9px 14px;
  border-radius: 11px;
  border: 1px solid #E6EEE9;
  background: #fff;
  color: #005A36;
  cursor: pointer;
  transition: all .15s;

  &:hover { background: #E6F3ED; }
`;

export const FilterChips = styled.div`
  margin-left: auto;
  display: flex;
  gap: 7px;
  flex-wrap: wrap;
`;

export const FilterChip = styled.button<{ $c: string; $tint: string; $active?: boolean }>`
  font: inherit;
  font-size: 12px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 12px;
  border-radius: 999px;
  cursor: pointer;
  transition: all .15s;
  border: 1px solid ${p => p.$active ? p.$c : '#E6EEE9'};
  background: ${p => p.$active ? p.$tint : '#fff'};
  color: ${p => p.$active ? p.$c : '#6B7280'};

  &:hover { border-color: ${p => p.$c}; color: ${p => p.$c}; background: ${p => p.$tint}; }
`;

export const ChipDot = styled.span<{ $c: string }>`
  width: 8px;
  height: 8px;
  border-radius: 3px;
  background: ${p => p.$c};
  flex-shrink: 0;
`;

// ─── Content layout ─────────────────────────────────────────────────────────

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 22px;
  align-items: start;

  @media (max-width: 1240px) { grid-template-columns: minmax(0, 1fr) 288px; }
  @media (max-width: 920px) { grid-template-columns: 1fr; }
`;

export const LoadingWrap = styled.div`
  padding: 40px;
  color: #6B7280;
`;
