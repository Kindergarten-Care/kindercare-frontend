'use client';

import styled from 'styled-components';

export const HeroContainer = styled.div`
  display: flex;
  gap: 22px;
  align-items: center;
  padding: 24px;
  position: relative;
  overflow: hidden;
  background: linear-gradient(118deg, #D5ECD9 0%, #EAF5ED 50%, #F5FBF7 100%);
  border: 1.5px solid #B0DCBE;
  border-radius: var(--radius);
  box-shadow: 
    0 10px 25px -5px rgba(0, 90, 54, 0.1), 
    0 8px 16px -6px rgba(0, 0, 0, 0.05);

  &::after {
    content: '';
    position: absolute;
    z-index: 0;
    top: -90px;
    right: -50px;
    width: 260px;
    height: 260px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0, 90, 54, 0.10), transparent 66%);
    pointer-events: none;
  }

  & > * { position: relative; z-index: 1; }

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const AvWrap = styled.div`
  position: relative;
  flex-shrink: 0;
`;

export const Av = styled.div<{ $gradient: string }>`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: ${p => p.$gradient};
  display: grid;
  place-items: center;
  font-weight: 700;
  font-size: 24px;
  color: #fff;
  letter-spacing: 0.5px;
  box-shadow: 0 10px 24px -8px rgba(0, 90, 54, 0.5);
`;

export const StatusRing = styled.div`
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #16a34a;
  border: 3px solid #fff;
  display: grid;
  place-items: center;
`;

export const PulseDot = styled.div`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #fff;
`;

export const Info = styled.div`
  min-width: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 9px;
`;

export const Name = styled.h2`
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--fg);
  margin: 0;
  line-height: 1.2;
`;

export const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 7px 9px;
`;

export const Chip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12.5px;
  font-weight: 500;
  color: var(--muted);
  background: #F4F8F5;
  border: 1px solid var(--border-soft);
  padding: 5px 11px;
  border-radius: 9px;

  svg { color: var(--brand); opacity: 0.85; }
`;

export const Tags = styled.div`
  display: none;
`;

export const Tag = styled.span<{ $type: 'green' | 'blue' | 'neutral' | 'yellow' }>``;

export const CheckinBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
  background: var(--brand-tint);
  color: var(--brand);
  font-size: 13px;
  font-weight: 600;
  padding: 7px 13px;
  border-radius: 10px;
  width: fit-content;
`;

export const Right = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 10px;
  flex-shrink: 0;
  min-width: 148px;

  @media (max-width: 640px) {
    width: 100%;
    flex-direction: row;
  }
`;

export const BtnAbsence = styled.button`
  background: var(--brand);
  color: #fff;
  border: none;
  padding: 11px 16px;
  border-radius: 12px;
  font: inherit;
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  white-space: nowrap;
  box-shadow: 0 8px 18px -6px rgba(0, 90, 54, 0.45);
  transition: transform 0.12s, background 0.15s;

  &:hover { background: var(--brand-hover); transform: scale(1.02); }
`;

export const BtnMsg = styled.button`
  background: #F4F8F5;
  color: var(--fg);
  border: 1px solid var(--border);
  padding: 11px 16px;
  border-radius: 12px;
  font: inherit;
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  white-space: nowrap;
  transition: transform 0.12s, background 0.15s, border-color 0.15s;

  &:hover { background: #fff; border-color: #CFE0D5; transform: scale(1.02); }
`;
