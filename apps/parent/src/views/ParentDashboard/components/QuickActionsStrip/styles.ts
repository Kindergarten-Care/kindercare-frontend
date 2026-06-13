'use client';

import styled from 'styled-components';

export const Bar = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 11px;

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const Btn = styled.button<{ $variant?: 'danger' | 'warn' | 'green' | 'default' }>`
  display: flex;
  align-items: center;
  gap: 11px;
  background: var(--surface, #fff);
  border: 1px solid var(--border, #eaefea);
  border-radius: 13px;
  padding: 11px 13px;
  cursor: pointer;
  box-shadow: var(--shadow);
  position: relative;
  transition: transform 0.14s, box-shadow 0.14s, border-color 0.14s;
  font: inherit;
  text-align: left;

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
    border-color: #dce7df;
  }

  &:active { transform: translateY(0); }
`;

export const BtnIco = styled.div<{ $bg: string; $color: string }>`
  width: 38px;
  height: 38px;
  border-radius: 11px;
  background: ${p => p.$bg};
  color: ${p => p.$color};
  display: grid;
  place-items: center;
  font-size: 18px;
  flex-shrink: 0;
`;

export const BtnLabel = styled.span`
  font-size: 13.5px;
  font-weight: 600;
  color: var(--fg, #1f2937);
  line-height: 1.2;
  white-space: nowrap;
`;

export const BtnBadge = styled.span`
  position: absolute;
  top: -7px;
  right: -7px;
  background: #dc2626;
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  min-width: 19px;
  height: 19px;
  padding: 0 5px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  border: 2px solid var(--canvas);
`;

