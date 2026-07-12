'use client';

import styled from 'styled-components';

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