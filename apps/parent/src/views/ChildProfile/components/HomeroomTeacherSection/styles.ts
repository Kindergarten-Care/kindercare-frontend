'use client';

import styled from 'styled-components';

export { RelCard, RelHead, RelAvatar, RelId, RelRole, RelName, RelJob, RelBody, RelItem, RelItemIcon, RelItemMain, RelItemKey, RelItemValue, RelActions, RelActionBtn } from '../FamilySection/sharedStyles';

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