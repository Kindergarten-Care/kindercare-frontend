'use client';

import styled from 'styled-components';

export const ThemeBar = styled.div`
  display: flex;
  align-items: stretch;
  gap: 0;
  background: linear-gradient(105deg, #EBF6F0 0%, #FFFFFF 92%);
  border: 1px solid #CFE7D8;
  border-radius: 16px;
  box-shadow: 0 6px 22px -10px rgba(0, 90, 54, .18);
  padding: 16px 22px;
  margin-bottom: 22px;

  @media (max-width: 720px) { flex-direction: column; gap: 16px; }
`;

export const ThemeItem = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  flex: 1;
  min-width: 0;
`;

export const ThemeIcon = styled.span<{ $variant: 'month' | 'week' }>`
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  color: #fff;
  ${p => p.$variant === 'month'
    ? 'background: #005A36; box-shadow: 0 8px 18px -6px rgba(0,90,54,.5);'
    : 'background: #DB2777; box-shadow: 0 8px 18px -6px rgba(219,39,119,.45);'}
`;

export const ThemeLabel = styled.div`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .05em;
  text-transform: uppercase;
  color: #9CA3AF;
`;

export const ThemeValue = styled.div`
  font-family: var(--font-plus-jakarta, 'Plus Jakarta Sans'), sans-serif;
  font-size: 19px;
  font-weight: 800;
  letter-spacing: -.02em;
  margin-top: 3px;
  color: #1F2937;
`;

export const ThemeDivider = styled.div`
  width: 1px;
  background: #E6EEE9;
  margin: 0 22px;

  @media (max-width: 720px) { width: auto; height: 1px; margin: 0; }
`;