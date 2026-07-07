'use client';

import React from 'react';
import * as S from './styles';
import { useParentSchedule } from './hooks/useParentSchedule';
import { useWeekSelector } from './hooks/useWeekSelector';
import { getScheduleConfigFromDate, getWeeksInMonth } from './utils';
import { WeekBarSection } from './components/WeekBar';
import { ThemeBarSection } from './components/ThemeBar';
import { RoutineTimetableSection } from './components/RoutineTimetable';
import { WeeklyMenuSection } from './components/WeeklyMenuSection';

export function ParentSchedule() {
  const {
    anchorDate,
    goPrevWeek,
    goNextWeek,
    goCurrentWeek,
    setAnchorDate,
    weekLabel,
  } = useWeekSelector();
  const { activeStudent, loading, days, weeklyTimetable, gridItems, weekStart } =
    useParentSchedule(anchorDate);

  const scheduleConfig = React.useMemo(
    () => getScheduleConfigFromDate(anchorDate),
    [anchorDate]
  );
  const weeks = React.useMemo(
    () => getWeeksInMonth(scheduleConfig.year, scheduleConfig.month),
    [scheduleConfig]
  );
  const currentWeekVal = React.useMemo(
    () => String(Math.floor(weekStart.getTime() / 1000)),
    [weekStart]
  );

  if (loading || !activeStudent) {
    return (
      <S.PageWrap>
        <div style={{ padding: 40, color: '#6B7280' }}>Đang tải lịch học & thực đơn...</div>
      </S.PageWrap>
    );
  }

  // Only fall back to mock content when the ENTIRE week has no real data —
  // never mix real and mock data day-by-day, to avoid misleading parents.
  const weekHasRealMenu = days.some(d => (d.menu?.details.length ?? 0) > 0);
  const activeMenu = days.find(d => d.menu)?.menu;
  const menuName = activeMenu?.menuName;

  const monthTheme = weeklyTimetable?.monthTheme || 'Chưa cập nhật';
  const weekTheme = weeklyTimetable?.weekTheme || 'Chưa cập nhật';
  const hasRealTimetable = gridItems.length > 0;

  return (
    <S.PageWrap>
      <WeekBarSection
        weeks={weeks}
        currentWeekVal={currentWeekVal}
        days={days}
        onPrevWeek={goPrevWeek}
        onNextWeek={goNextWeek}
        onCurrentWeek={goCurrentWeek}
        onSelectWeek={(val) => setAnchorDate(new Date(Number(val) * 1000))}
      />

      <ThemeBarSection
        monthLabel={String(scheduleConfig.month)}
        monthTheme={monthTheme}
        weekTheme={weekTheme}
      />

      <RoutineTimetableSection
        gridItems={gridItems}
        days={days}
        hasRealTimetable={hasRealTimetable}
        studentFullName={activeStudent.fullName ?? 'Học sinh'}
        weekLabel={weekLabel}
      />

      <WeeklyMenuSection
        days={days}
        weekHasRealMenu={weekHasRealMenu}
        menuName={menuName}
      />
    </S.PageWrap>
  );
}