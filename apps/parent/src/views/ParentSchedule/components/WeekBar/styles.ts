'use client';

import styled from 'styled-components';

export const WeekBar = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  background: #fff;
  border: 1px solid #E6EEE9;
  border-radius: 16px;
  box-shadow: 0 4px 18px -4px rgba(0, 90, 54, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.03);
  padding: 14px 18px;
  margin-bottom: 22px;
  flex-wrap: wrap;
`;

export const WeekNav = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const WeekNavBtn = styled.button`
  width: 38px;
  height: 38px;
  border-radius: 11px;
  border: 1px solid #E6EEE9;
  background: #fff;
  color: #6B7280;
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: all .15s;

  &:hover { border-color: #CFE0D5; color: #005A36; background: #F4F8F5; }
`;

export const WeekCurrent = styled.div`
  flex: 1 1 210px;
  min-width: 0;

  @media (max-width: 480px) {
    flex-basis: 100%;
  }
`;

export const WeekPickLabel = styled.div`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .05em;
  text-transform: uppercase;
  color: #9CA3AF;
`;

export const WeekRange = styled.div`
  font-family: var(--font-plus-jakarta, 'Plus Jakarta Sans'), sans-serif;
  font-size: 17px;
  font-weight: 800;
  letter-spacing: -.01em;
  margin-top: 2px;
  color: #1F2937;
`;

export const WeekTodayBtn = styled.button`
  font: inherit;
  font-size: 12.5px;
  font-weight: 600;
  padding: 9px 14px;
  border-radius: 11px;
  border: 1px solid #E6EEE9;
  background: #fff;
  color: #005A36;
  cursor: pointer;
  transition: all .15s;

  &:hover { background: #E6F3ED; }
`;

export const WeekDayTabs = styled.div`
  margin-left: auto;
  display: flex;
  gap: 7px;

  @media (max-width: 960px) { display: none; }
`;

export const WeekDayTab = styled.div<{ $today?: boolean }>`
  min-width: 54px;
  padding: 7px 8px;
  border-radius: 11px;
  border: 1px solid ${p => p.$today ? '#BBDAC8' : '#E6EEE9'};
  background: ${p => p.$today ? '#E6F3ED' : '#fff'};
  text-align: center;
`;

export const WeekDayTabDow = styled.div`
  font-size: 10.5px;
  font-weight: 700;
  color: #9CA3AF;
  text-transform: uppercase;
`;

export const WeekDayTabNum = styled.div<{ $today?: boolean }>`
  font-family: var(--font-plus-jakarta, 'Plus Jakarta Sans'), sans-serif;
  font-size: 15px;
  font-weight: 800;
  margin-top: 2px;
  color: ${p => p.$today ? '#005A36' : '#1F2937'};
`;