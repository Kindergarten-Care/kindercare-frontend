'use client';

import styled from 'styled-components';

export { RelCard, RelHead, RelAvatar, RelId, RelRole, RelName, RelJob, RelPrimary, RelBody, RelItem, RelItemIcon, RelItemMain, RelItemKey, RelItemValue, RelActions, RelActionBtn } from './sharedStyles';

export const Section = styled.div`
  margin-bottom: 24px;
`;

export const SecHead = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
  margin-bottom: 14px;
`;

export const SecIcon = styled.span<{ $bg?: string; $fg?: string }>`
  width: 34px;
  height: 34px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  background: ${p => p.$bg ?? '#E6F3ED'};
  color: ${p => p.$fg ?? '#005A36'};
`;

export const SecTitle = styled.h2`
  font-family: var(--font-plus-jakarta, 'Plus Jakarta Sans'), sans-serif;
  font-size: 16px;
  font-weight: 800;
  letter-spacing: -.015em;
  color: #1F2937;
`;

export const SecSub = styled.span`
  font-size: 12.5px;
  color: #9CA3AF;
  margin-left: auto;
  font-weight: 500;
`;

export const FamilyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
  @media (max-width: 760px) { grid-template-columns: minmax(0, 1fr); }
`;

export const Card = styled.div`
  background: #fff;
  border: 1px solid #E6EEE9;
  border-radius: 16px;
  box-shadow: 0 4px 18px -4px rgba(0, 90, 54, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.03);
`;

export const EmptyState = styled.div`
  padding: 32px;
  text-align: center;
  color: #9CA3AF;
  font-size: 13.5px;
`;