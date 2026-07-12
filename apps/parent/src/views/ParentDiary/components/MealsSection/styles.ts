'use client';

import styled from 'styled-components';

export const Sec = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const SecHead = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
`;

export const SecIco = styled.span`
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: var(--brand-tint, #E6F3ED);
  color: var(--brand, #005A36);
  display: grid;
  place-items: center;
  flex-shrink: 0;
`;

export const SecTitle = styled.h2`
  font-family: var(--font-plus-jakarta, 'Plus Jakarta Sans'), sans-serif;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--fg, #1F2937);
`;

export const TileCard = styled.div`
  background: var(--surface, #fff);
  border: 1px solid var(--border, #E6EEE9);
  border-radius: 16px;
  box-shadow: 0 4px 18px -4px rgba(0,90,54,0.06), 0 2px 6px -1px rgba(0,0,0,0.03);
  overflow: hidden;
`;

export const Tile = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 13px 16px;
  min-width: 0;
  & + & { border-top: 1px solid #EEF4F0; }
`;

export const TileIco = styled.span`
  width: 42px;
  height: 42px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
`;

export const TileBody = styled.div`
  flex: 1;
  min-width: 0;
`;

export const TileName = styled.div`
  font-family: var(--font-plus-jakarta, 'Plus Jakarta Sans'), sans-serif;
  font-size: 13.5px;
  font-weight: 700;
  color: #1F2937;
  overflow-wrap: break-word;
`;

export const TileDesc = styled.div`
  font-size: 12px;
  color: var(--muted, #6B7280);
  margin-top: 2px;
  overflow-wrap: break-word;
  b { color: #1F2937; font-weight: 600; }
`;

export const Rate = styled.span<{ $type: 'good' | 'ok' | 'low' | 'info' }>`
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  font-size: 11px;
  font-weight: 700;
  padding: 5px 9px;
  border-radius: 8px;
  white-space: nowrap;
  ${p => {
    switch (p.$type) {
      case 'good': return 'background: #E6F3ED; color: #005A36;';
      case 'ok':   return 'background: #FEF3C7; color: #92400E;';
      case 'low':  return 'background: #FEE2E2; color: #DC2626;';
      case 'info': return 'background: #E3EDFD; color: #2563EB;';
    }
  }}
`;
