'use client';

import React from 'react';
import * as S from './styles';
import { useMonthSelector } from './hooks/useMonthSelector';
import { useParentCalendar } from './hooks/useParentCalendar';
import { EVENT_CATEGORIES, CATEGORY_ORDER, startOfDay } from './utils';
import MonthCalendar from './components/MonthCalendar';
import EventSidePanel from './components/EventSidePanel';
import UpcomingHeroBanner from './components/UpcomingHeroBanner';
import { IconChevronLeft, IconChevronRight } from './icons';

export function ParentCalendar() {
  const { viewYear, viewMonth, monthLabel, goPrevMonth, goNextMonth, goCurrentMonth, goToMonth } = useMonthSelector();
  const {
    activeStudent,
    loading,
    cells,
    selectedDate,
    setSelectedDate,
    selectedDayEvents,
    upcomingEvents,
    nextEvent,
    upcomingHolidayCount,
    activeCategory,
    setActiveCategory,
  } = useParentCalendar(viewYear, viewMonth);

  // Selecting a day (from the grid or the upcoming list) also brings its
  // month into view when it lies outside the current one.
  const handleSelectDate = (date: Date): void => {
    setSelectedDate(date);
    if (date.getFullYear() !== viewYear || date.getMonth() !== viewMonth) {
      goToMonth(date.getFullYear(), date.getMonth());
    }
  };

  const handleGoCurrentMonth = (): void => {
    goCurrentMonth();
    setSelectedDate(startOfDay(new Date()));
  };

  if (loading || !activeStudent) {
    return (
      <S.PageWrap>
        <S.LoadingWrap>Đang tải lịch & sự kiện...</S.LoadingWrap>
      </S.PageWrap>
    );
  }

  return (
    <S.PageWrap>
      {nextEvent && (
        <UpcomingHeroBanner nextEvent={nextEvent} holidayCount={upcomingHolidayCount} />
      )}

      <S.Toolbar>
        <S.MonthNav>
          <S.MonthNavBtn onClick={goPrevMonth} aria-label="Tháng trước">
            <IconChevronLeft size={17} />
          </S.MonthNavBtn>
          <S.MonthNavBtn onClick={goNextMonth} aria-label="Tháng sau">
            <IconChevronRight size={17} />
          </S.MonthNavBtn>
        </S.MonthNav>
        <S.MonthTitle>{monthLabel}</S.MonthTitle>
        <S.TodayBtn onClick={handleGoCurrentMonth}>Về tháng hiện tại</S.TodayBtn>

        <S.FilterChips>
          {CATEGORY_ORDER.map(category => {
            const meta = EVENT_CATEGORIES[category];
            return (
              <S.FilterChip
                key={category}
                $c={meta.c}
                $tint={meta.tint}
                $active={activeCategory === category}
                onClick={() => setActiveCategory(activeCategory === category ? null : category)}
              >
                <S.ChipDot $c={meta.c} />
                {meta.label}
              </S.FilterChip>
            );
          })}
        </S.FilterChips>
      </S.Toolbar>

      <S.ContentGrid>
        <MonthCalendar
          cells={cells}
          selectedDate={selectedDate}
          onSelectDate={handleSelectDate}
        />
        <EventSidePanel
          selectedDate={selectedDate}
          selectedDayEvents={selectedDayEvents}
          upcomingEvents={upcomingEvents}
          onSelectDate={handleSelectDate}
        />
      </S.ContentGrid>
    </S.PageWrap>
  );
}
