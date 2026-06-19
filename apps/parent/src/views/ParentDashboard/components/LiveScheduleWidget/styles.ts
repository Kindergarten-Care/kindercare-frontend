'use client';

import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0% { transform: scale(0.7); opacity: 0.6; }
  100% { transform: scale(1.5); opacity: 0; }
`;

export const Card = styled.div`
  background: var(--surface, #fff);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 20px 22px;
  box-shadow: var(--shadow);
`;

export const CardHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const CardTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.01em;
`;

export const LiveNow = styled.div<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 17px 18px;
  border-radius: 14px;
  background: ${p => p.$active
    ? 'linear-gradient(118deg,#EAF7F0,#E0F0E8)'
    : '#f4f8f5'};
  border: 1px solid ${p => p.$active ? '#CBE5D7' : 'var(--border)'};
  position: relative;
  overflow: hidden;
`;

export const LiveIco = styled.div<{ $color: string }>`
  width: 54px;
  height: 54px;
  border-radius: 15px;
  background: ${p => p.$color};
  display: grid;
  place-items: center;
  flex-shrink: 0;
  font-size: 24px;
  box-shadow: 0 8px 18px -6px rgba(0, 90, 54, 0.35);
`;

export const LiveBody = styled.div`
  flex: 1;
  min-width: 0;
`;

export const LiveBadge = styled.div<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: ${p => p.$active ? 'var(--brand)' : 'var(--muted)'};
  text-transform: uppercase;
  margin-bottom: 4px;
`;

export const LiveDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #16a34a;
  display: inline-block;
  position: relative;
  flex-shrink: 0;

  &::after {
    content: '';
    position: absolute;
    inset: -4px;
    border-radius: 50%;
    border: 2px solid #16a34a;
    opacity: 0.5;
    animation: ${pulse} 1.8s ease-out infinite;
  }
`;

export const LiveTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--fg);
`;

export const LiveMeta = styled.div`
  font-size: 12.5px;
  color: var(--muted);
  margin-top: 3px;
`;

export const ProgressBar = styled.div`
  height: 6px;
  border-radius: 4px;
  background: rgba(0, 90, 54, 0.13);
  margin-top: 11px;
  overflow: hidden;
  max-width: 340px;
`;

export const ProgressFill = styled.span<{ $pct: number }>`
  display: block;
  height: 100%;
  border-radius: 4px;
  background: var(--brand);
  width: ${p => p.$pct}%;
  transition: width 0.6s ease;
`;

export const NextUp = styled.div`
  font-size: 12px;
  color: var(--muted);
  margin-top: 8px;

  b { color: var(--fg); font-weight: 600; }
`;

export const SchList = styled.div`
  margin-top: 14px;
  display: flex;
  flex-direction: column;
`;

export const SchRow = styled.div<{ $status: 'done' | 'now' | 'next' | 'upcoming' }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 9px 0;
  border-top: 1px solid var(--border-soft);
  position: relative;

  &:first-child { border-top: none; }

  ${p => p.$status === 'now' && `
    background: linear-gradient(90deg, var(--brand-tint), transparent 92%);
    margin: 0 -14px;
    padding: 11px 14px;
    border-radius: 11px;
    border-top: none;
    & + div { border-top: none; }
  `}

  ${p => p.$status === 'done' && `opacity: 0.65;`}
`;

export const SchTime = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: var(--muted-2);
  width: 40px;
  flex-shrink: 0;
  text-align: right;
  font-variant-numeric: tabular-nums;
`;

export const SchIco = styled.div<{ $bg: string }>`
  width: 36px;
  height: 36px;
  border-radius: 11px;
  background: ${p => p.$bg};
  display: grid;
  place-items: center;
  flex-shrink: 0;
  font-size: 16px;
`;

export const SchBody = styled.div`
  flex: 1;
  min-width: 0;
`;

export const SchTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: var(--fg);
  line-height: 1.2;
`;

export const SchNote = styled.div`
  font-size: 12px;
  color: var(--muted-2);
  margin-top: 2px;
`;

export const SchStatus = styled.span<{ $status: 'done' | 'now' | 'next' | 'upcoming' }>`
  font-size: 11px;
  font-weight: 700;
  padding: 3px 9px;
  border-radius: 8px;
  flex-shrink: 0;
  letter-spacing: 0.01em;

  ${p => {
    switch (p.$status) {
      case 'done': return `color: var(--muted-2); background: #f1f4f1;`;
      case 'now': return `color: #fff; background: var(--brand);`;
      case 'next': return `color: #92400e; background: #fef3c7;`;
      default: return `display: none;`;
    }
  }}
`;
