'use client';

import styled from 'styled-components';

export const Section = styled.div`
  margin-bottom: 26px;
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
  font-size: 18px;
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

export const WeekCols = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 14px;

  @media (max-width: 1180px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 620px) { grid-template-columns: 1fr; }
`;

export const DayCol = styled.div<{ $today?: boolean }>`
  background: #fff;
  border: 1px solid ${p => p.$today ? '#BBDAC8' : '#E6EEE9'};
  border-radius: 15px;
  box-shadow: 0 4px 18px -4px rgba(0, 90, 54, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.03);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: box-shadow .15s, border-color .15s;

  &:hover { box-shadow: 0 18px 48px -12px rgba(0, 90, 54, 0.16), 0 6px 16px -6px rgba(0, 0, 0, 0.06); border-color: #DCE7DF; }
`;

export const DayColHead = styled.div<{ $today?: boolean }>`
  padding: 12px 15px;
  border-bottom: 1px solid #EEF4F0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${p => p.$today ? '#E6F3ED' : '#FBFDFC'};
`;

export const DayColDow = styled.div<{ $today?: boolean }>`
  font-family: var(--font-plus-jakarta, 'Plus Jakarta Sans'), sans-serif;
  font-size: 14px;
  font-weight: 800;
  letter-spacing: -.01em;
  color: ${p => p.$today ? '#005A36' : '#1F2937'};
`;

export const DayColDate = styled.div`
  font-family: var(--font-jetbrains-mono, 'JetBrains Mono'), monospace;
  font-size: 11px;
  color: #9CA3AF;
`;

export const DayColTodayTag = styled.span`
  font-size: 9.5px;
  font-weight: 700;
  color: #005A36;
  background: #fff;
  border: 1px solid #BBDAC8;
  padding: 2px 7px;
  border-radius: 6px;
`;

export const Meal = styled.div<{ $c: string; $tint: string }>`
  padding: 12px 15px;
  --c: ${p => p.$c};
  --c-tint: ${p => p.$tint};

  & + & { border-top: 1px solid #EEF4F0; }
`;

export const MealLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .03em;
  text-transform: uppercase;
  color: var(--c);
  margin-bottom: 8px;
`;

export const MealLabelIcon = styled.span`
  width: 22px;
  height: 22px;
  border-radius: 7px;
  background: var(--c-tint);
  color: var(--c);
  display: grid;
  place-items: center;
  flex-shrink: 0;
`;

export const Dish = styled.div<{ $c: string }>`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 13px;
  color: #374151;
  line-height: 1.45;
  padding: 3px 0;

  &::before {
    content: '';
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: ${p => p.$c};
    margin-top: 7px;
    flex-shrink: 0;
  }
`;

export const MealEmpty = styled.div`
  padding: 12px 15px;
  font-size: 12.5px;
  color: #9CA3AF;
`;