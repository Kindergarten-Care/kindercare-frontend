'use client';

import styled from 'styled-components';

export const Card = styled.div`
  background: var(--surface, #fff);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 20px 22px;
  box-shadow: var(--shadow);
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
`;

export const CalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
`;

export const MonthTitle = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: var(--fg);
`;

export const NavBtns = styled.div`
  display: flex;
  gap: 4px;
`;

export const NavBtn = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 9px;
  border: 1px solid var(--border);
  background: #fff;
  color: var(--muted);
  cursor: pointer;
  display: grid;
  place-items: center;
  font-size: 13px;
  transition: background 0.15s, color 0.15s;

  &:hover { background: #f4f8f5; color: var(--fg); }
`;

export const Summary = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  background: #f4f8f5;
  border: 1px solid var(--border-soft);
  border-radius: 13px;
  padding: 13px 16px;
  margin-bottom: 16px;
`;

export const RateWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  padding-right: 16px;
  border-right: 1px solid var(--border);
`;

export const Rate = styled.div`
  font-size: 27px;
  font-weight: 800;
  color: var(--brand);
  letter-spacing: -0.02em;
  line-height: 1;
`;

export const RateLbl = styled.div`
  font-size: 11.5px;
  color: var(--muted);
  font-weight: 500;
  line-height: 1.3;
`;

export const Counts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  flex: 1;
`;

export const StatRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12.5px;
  color: var(--muted);
`;

export const StatDot = styled.span<{ $color: string }>`
  width: 9px;
  height: 9px;
  border-radius: 3px;
  background: ${p => p.$color};
  flex-shrink: 0;
`;

export const StatVal = styled.b`
  font-weight: 700;
  color: var(--fg);
  font-size: 13.5px;
  min-width: 14px;
`;

export const CalGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
`;

export const Weekday = styled.div`
  text-align: center;
  font-size: 11px;
  font-weight: 600;
  color: var(--muted-2);
  padding: 4px 0 8px;
`;

export const Day = styled.div<{
  $today?: boolean;
  $other?: boolean;
  $status?: 'present' | 'absent' | 'excused' | 'holiday' | 'weekend' | 'none';
}>`
  aspect-ratio: 1;
  border-radius: 9px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1px;
  font-size: 13px;
  font-weight: 500;
  position: relative;
  cursor: default;
  transition: transform 0.12s;

  ${p => p.$other && `color: var(--muted-2); font-weight: 400;`}

  ${p => p.$status === 'present' && `
    background: var(--brand-tint);
    color: var(--brand);
    font-weight: 600;
    cursor: pointer;
    &:hover { transform: scale(1.08); }
  `}
  ${p => p.$status === 'absent' && `
    background: #fee2e2;
    color: #dc2626;
    font-weight: 600;
  `}
  ${p => p.$status === 'excused' && `
    background: #ffedd5;
    color: #ea580c;
    font-weight: 600;
  `}
  ${p => p.$status === 'holiday' && `
    background: #dbeafe;
    color: #1d4ed8;
    font-weight: 600;
  `}
  ${p => p.$status === 'weekend' && `
    color: var(--muted-2);
  `}

  ${p => p.$today && `
    box-shadow: 0 0 0 2px var(--brand), 0 0 0 4px var(--brand-tint);
  `}
`;

export const DayNum = styled.span`
  line-height: 1;
`;

export const CheckinTime = styled.span`
  font-size: 8px;
  font-weight: 600;
  line-height: 1;
  opacity: 0.72;
  font-variant-numeric: tabular-nums;
`;

export const CheckoutTime = styled.span`
  font-size: 8px;
  font-weight: 600;
  line-height: 1;
  opacity: 0.72;
  font-variant-numeric: tabular-nums;
`;

export const Legend = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px 16px;
  margin-top: 16px;
  padding-top: 15px;
  border-top: 1px solid var(--border-soft);
`;

export const LegItem = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 12px;
  color: var(--muted);
  font-weight: 500;
`;

export const LegDot = styled.span<{ $color: string }>`
  width: 11px;
  height: 11px;
  border-radius: 4px;
  background: ${p => p.$color};
`;
