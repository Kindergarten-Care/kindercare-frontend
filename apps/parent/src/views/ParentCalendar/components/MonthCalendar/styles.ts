'use client';

import styled from 'styled-components';

export const Card = styled.div`
  background: #fff;
  border: 1px solid #E6EEE9;
  border-radius: 16px;
  box-shadow: 0 4px 18px -4px rgba(0, 90, 54, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.03);
  padding: 18px;
  overflow: hidden;
  min-width: 0;

  @media (max-width: 480px) {
    padding: 12px;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 5px;
`;

export const Weekday = styled.div<{ $weekend?: boolean }>`
  text-align: center;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .04em;
  text-transform: uppercase;
  color: ${p => p.$weekend ? '#C9793A' : '#9CA3AF'};
  padding: 4px 0 10px;
`;

export const DayCell = styled.button<{ $inMonth?: boolean; $weekend?: boolean; $selected?: boolean; $today?: boolean }>`
  font: inherit;
  text-align: left;
  min-height: 96px;
  min-width: 0;
  border-radius: 12px;
  padding: 7px 7px 6px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  cursor: pointer;
  transition: all .15s;
  border: 1px solid ${p => p.$selected ? '#005A36' : p.$today ? '#BBDAC8' : '#D9E2DC'};
  background: ${p => p.$selected ? '#E6F3ED' : p.$today ? '#F4F8F5' : p.$weekend ? '#FAFBFA' : '#fff'};
  opacity: ${p => p.$inMonth ? 1 : .45};

  &:hover { border-color: #9ACAAE; background: #F4F8F5; }

  @media (max-width: 640px) { min-height: 64px; padding: 5px; }
`;

export const DayNum = styled.span<{ $today?: boolean; $weekend?: boolean }>`
  font-size: 12.5px;
  font-weight: 700;
  line-height: 1;
  color: ${p => p.$today ? '#fff' : p.$weekend ? '#C9793A' : '#374151'};
  ${p => p.$today && `
    background: #005A36;
    border-radius: 8px;
    padding: 4px 7px;
    margin: -2px 0 0 -2px;
  `}
`;

export const EventPills = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  width: 100%;
  min-width: 0;
`;

export const EventPill = styled.span<{ $c: string; $tint: string }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 10.5px;
  font-weight: 600;
  line-height: 1.2;
  padding: 3px 6px;
  border-radius: 6px;
  background: ${p => p.$tint};
  color: ${p => p.$c};
  border-left: 2.5px solid ${p => p.$c};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;

  @media (max-width: 640px) { display: none; }
`;

export const EventPillLabel = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const MoreCount = styled.span`
  font-size: 10px;
  font-weight: 600;
  color: #6B7280;
  padding-left: 2px;

  @media (max-width: 640px) { display: none; }
`;

/* Compact colored dots shown on small screens instead of pills */
export const DotRow = styled.div`
  display: none;
  gap: 3px;

  @media (max-width: 640px) { display: flex; }
`;

export const Dot = styled.span<{ $c: string }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${p => p.$c};
`;
