'use client';

import React, { useState } from 'react';
import * as S from './styles';
import { CalendarDay, AttendanceStats } from '@/config/types/dashboard';
import { IconChevronLeft, IconChevronRight } from '@/assets/icons/dashboard';

interface MiniCalendarWidgetProps {
  days: CalendarDay[];
  stats: AttendanceStats;
}

const WEEKDAYS = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
const MONTHS = ['Tháng 1','Tháng 2','Tháng 3','Tháng 4','Tháng 5','Tháng 6',
  'Tháng 7','Tháng 8','Tháng 9','Tháng 10','Tháng 11','Tháng 12'];

const MiniCalendarWidget: React.FC<MiniCalendarWidgetProps> = ({ days, stats }) => {
  const now = new Date();
  const [viewYear, setViewYear] = useState<number>(now.getFullYear());
  const [viewMonth, setViewMonth] = useState<number>(now.getMonth());

  const today = now.getDate();
  const isCurrentMonth = viewYear === now.getFullYear() && viewMonth === now.getMonth();

  const firstDow = new Date(viewYear, viewMonth, 1).getDay();
  const prefixBlanks = firstDow === 0 ? 6 : firstDow - 1;
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const dayMap = new Map<number, CalendarDay>(days.map(d => [d.day, d]));

  const prevMonth = (): void => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = (): void => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  return (
    <S.Card>
      <S.CalHeader>
        <S.MonthTitle>{MONTHS[viewMonth]}, {viewYear}</S.MonthTitle>
        <S.NavBtns>
          <S.NavBtn onClick={prevMonth}><IconChevronLeft size={15} /></S.NavBtn>
          <S.NavBtn onClick={nextMonth}><IconChevronRight size={15} /></S.NavBtn>
        </S.NavBtns>
      </S.CalHeader>

      {isCurrentMonth && (
        <S.Summary>
          <S.RateWrap>
            <S.Rate>{stats.percentage}<span style={{ fontSize: 15 }}>%</span></S.Rate>
            <S.RateLbl>Tỷ lệ<br />chuyên cần</S.RateLbl>
          </S.RateWrap>
          <S.Counts>
            <S.StatRow>
              <S.StatDot $color="var(--accent, #005A36)" />
              <S.StatVal>{stats.present}</S.StatVal> Có mặt
            </S.StatRow>
            <S.StatRow>
              <S.StatDot $color="#dc2626" />
              <S.StatVal>{stats.absent}</S.StatVal> Nghỉ không phép
            </S.StatRow>
            <S.StatRow>
              <S.StatDot $color="#2563eb" />
              <S.StatVal>{stats.excused}</S.StatVal> Nghỉ lễ
            </S.StatRow>
          </S.Counts>
        </S.Summary>
      )}

      <S.CalGrid>
        {WEEKDAYS.map(d => <S.Weekday key={d}>{d}</S.Weekday>)}

        {Array.from({ length: prefixBlanks }).map((_, i) => (
          <S.Day key={`blank-${i}`} $other />
        ))}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const d = i + 1;
          const info = isCurrentMonth ? dayMap.get(d) : undefined;
          const status = info?.status ?? 'none';
          const isToday = isCurrentMonth && d === today;

          return (
            <S.Day
              key={d}
              $status={status as 'present' | 'absent' | 'holiday' | 'weekend' | 'none'}
              $today={isToday}
              title={info?.checkinTime ? `Check-in ${info.checkinTime}` : undefined}
            >
              <S.DayNum>{d}</S.DayNum>
              {info?.checkinTime && (
                <S.CheckinTime>{info.checkinTime}</S.CheckinTime>
              )}
            </S.Day>
          );
        })}
      </S.CalGrid>

      <S.Legend>
        <S.LegItem><S.LegDot $color="var(--accent-light, #e6f3ed)" style={{ border: '1px solid #9acaae' }} />Có mặt</S.LegItem>
        <S.LegItem><S.LegDot $color="#fee2e2" style={{ border: '1px solid #fca5a5' }} />Nghỉ</S.LegItem>
        <S.LegItem><S.LegDot $color="#dbeafe" style={{ border: '1px solid #93c5fd' }} />Nghỉ lễ</S.LegItem>
      </S.Legend>
    </S.Card>
  );
};

export default MiniCalendarWidget;
