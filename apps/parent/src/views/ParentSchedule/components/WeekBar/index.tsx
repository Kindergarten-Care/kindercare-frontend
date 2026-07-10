'use client';

import React from 'react';
import { Dropdown } from '@kindercare/ui';
import {
  WeekBar,
  WeekNav,
  WeekNavBtn,
  WeekCurrent,
  WeekTodayBtn,
  WeekDayTabs,
  WeekDayTab,
  WeekDayTabDow,
  WeekDayTabNum,
} from './styles';
import { DOW_LABELS } from '../../utils';

interface WeekBarSectionProps {
  weeks: { label: string; value: string }[];
  currentWeekVal: string;
  days: { date: Date; isToday: boolean }[];
  onPrevWeek: () => void;
  onNextWeek: () => void;
  onCurrentWeek: () => void;
  onSelectWeek: (val: string) => void;
}

export const WeekBarSection: React.FC<WeekBarSectionProps> = ({
  weeks,
  currentWeekVal,
  days,
  onPrevWeek,
  onNextWeek,
  onCurrentWeek,
  onSelectWeek,
}) => (
  <WeekBar>
    <WeekNav>
      <WeekNavBtn onClick={onPrevWeek} aria-label="Tuần trước">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 6-6 6 6 6" /></svg>
      </WeekNavBtn>
      <WeekNavBtn onClick={onNextWeek} aria-label="Tuần sau">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 6 6 6-6 6" /></svg>
      </WeekNavBtn>
    </WeekNav>
    <WeekCurrent>
      <Dropdown
        value={currentWeekVal}
        onChange={onSelectWeek}
        options={weeks}
        placeholder="Chọn tuần"
      />
    </WeekCurrent>
    <WeekTodayBtn onClick={onCurrentWeek}>Về tuần hiện tại</WeekTodayBtn>
    <WeekDayTabs>
      {days.map((d, i) => (
        <WeekDayTab key={i} $today={d.isToday}>
          <WeekDayTabDow>{DOW_LABELS[i].replace('Thứ ', 'T')}</WeekDayTabDow>
          <WeekDayTabNum $today={d.isToday}>{d.date.getDate()}</WeekDayTabNum>
        </WeekDayTab>
      ))}
    </WeekDayTabs>
  </WeekBar>
);