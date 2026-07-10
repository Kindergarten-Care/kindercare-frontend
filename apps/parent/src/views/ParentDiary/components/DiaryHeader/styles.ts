'use client';

import styled from 'styled-components';

export const PageHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 22px;
  flex-wrap: wrap;
`;

export const PageTitle = styled.h1`
  font-family: var(--font-plus-jakarta, 'Plus Jakarta Sans'), sans-serif;
  font-size: 21px;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.2;
  color: var(--fg, #1F2937);
`;

export const PageCrumb = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--muted, #6B7280);
  margin-top: 4px;
  b { color: var(--fg, #1F2937); font-weight: 600; }
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const DateChip = styled.button`
  display: flex;
  align-items: center;
  gap: 9px;
  background: #fff;
  border: 1px solid var(--border, #E6EEE9);
  border-radius: 11px;
  padding: 9px 14px;
  font: inherit;
  font-size: 13.5px;
  font-weight: 600;
  color: var(--fg, #1F2937);
  cursor: pointer;
  transition: border-color 0.15s;
  svg { color: var(--brand, #005A36); }
  &:hover { border-color: #CFE0D5; }
`;

export const IconAction = styled.button`
  width: 42px;
  height: 42px;
  border-radius: 12px;
  border: 1px solid var(--border, #E6EEE9);
  background: #fff;
  color: var(--muted, #6B7280);
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: border-color 0.15s, color 0.15s;
  &:hover { border-color: #CFE0D5; color: var(--fg, #1F2937); }
`;
