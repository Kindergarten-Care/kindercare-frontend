'use client';

import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

export const PageWrap = styled.div`
  min-height: calc(100vh - 200px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

export const Card = styled.div`
  max-width: 420px;
  width: 100%;
  background: #fff;
  border: 1px solid var(--border, #e6eee9);
  border-radius: 18px;
  padding: 40px 32px;
  text-align: center;
`;

export const Spinner = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 4px solid #e6f3ed;
  border-top-color: var(--brand, #005a36);
  margin: 0 auto 20px;
  animation: ${spin} 0.8s linear infinite;
`;

export const Icon = styled.div<{ $variant: 'success' | 'fail' | 'pending' }>`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  margin: 0 auto 20px;
  display: grid;
  place-items: center;
  ${p => {
    if (p.$variant === 'success') return 'background:#dcfce7;color:#16803d;';
    if (p.$variant === 'fail') return 'background:#fee2e2;color:#dc2626;';
    return 'background:#fef3c7;color:#92400e;';
  }}
`;

export const Title = styled.h1`
  font-family: var(--font-plus-jakarta, 'Plus Jakarta Sans'), sans-serif;
  font-size: 19px;
  font-weight: 800;
  color: #1f2937;
  margin-bottom: 8px;
`;

export const Desc = styled.p`
  font-size: 13.5px;
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 24px;
`;

export const Actions = styled.div`
  display: flex;
  gap: 10px;
`;

export const Btn = styled.button<{ $variant?: 'brand' | 'ghost' }>`
  font: inherit;
  font-weight: 700;
  border: none;
  cursor: pointer;
  border-radius: 12px;
  font-size: 13.5px;
  padding: 12px 18px;
  flex: 1;
  transition: transform 0.12s, background 0.15s;

  ${p =>
    p.$variant === 'ghost'
      ? `
    background: #fff;
    color: #1f2937;
    border: 1px solid var(--border, #e6eee9);
    &:hover { border-color: #cfe0d5; }
  `
      : `
    background: var(--brand, #005a36);
    color: #fff;
    &:hover { background: var(--brand-hover, #004428); }
  `}

  &:active { transform: scale(0.98); }
`;
