'use client';

import { useState, useEffect, useMemo } from 'react';
import { useStudent } from '@/contexts/StudentContext';
import { eventService } from '@/services/Event/EventService';
import {
  CalendarEventModel,
  CalendarHolidayModel,
  CalendarCellData,
  EventCategory,
  getMonthGridDates,
  eventCoversDay,
  holidayCoversDay,
  eventDaySpan,
  daysFromToday,
  toCalendarEvent,
  toCalendarHoliday,
  toDateParam,
  sameDay,
  startOfDay,
} from '../utils';

const UPCOMING_WINDOW_DAYS = 60;
const UPCOMING_LIMIT = 5;

export interface UseParentCalendarReturn {
  activeStudent: ReturnType<typeof useStudent>['activeStudent'];
  loading: boolean;
  cells: CalendarCellData[];
  monthEvents: CalendarEventModel[];
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  selectedDayEvents: CalendarEventModel[];
  selectedDayHolidays: CalendarHolidayModel[];
  upcomingEvents: CalendarEventModel[];
  nextEvent: CalendarEventModel | null;
  upcomingHolidayCount: number;
  activeCategory: EventCategory | null;
  setActiveCategory: (category: EventCategory | null) => void;
}

export function useParentCalendar(viewYear: number, viewMonth: number): UseParentCalendarReturn {
  const { activeStudent, loading: studentLoading } = useStudent();
  const [selectedDate, setSelectedDate] = useState<Date>(() => startOfDay(new Date()));
  const [activeCategory, setActiveCategory] = useState<EventCategory | null>(null);
  const [monthEvents, setMonthEvents] = useState<CalendarEventModel[]>([]);
  const [monthHolidays, setMonthHolidays] = useState<CalendarHolidayModel[]>([]);
  const [upcomingWindow, setUpcomingWindow] = useState<CalendarEventModel[]>([]);
  const [loading, setLoading] = useState(false);

  // Events + holidays of the visible month grid (includes leading/trailing days
  // of adjacent months) — one range call per month view. The cancelled flag
  // keeps a slow response for a previous month from overwriting the current one.
  useEffect(() => {
    if (!activeStudent?.studentId) return;
    const gridDates = getMonthGridDates(viewYear, viewMonth);
    const from = gridDates[0].date;
    const to = gridDates[gridDates.length - 1].date;

    let cancelled = false;
    setLoading(true);
    eventService.getEventsInRange(activeStudent.studentId, toDateParam(from), toDateParam(to))
      .then(({ events, holidays }) => {
        if (cancelled) return;
        setMonthEvents(events.map(toCalendarEvent));
        setMonthHolidays(holidays.map(toCalendarHoliday));
      })
      .catch(err => {
        console.error('[ParentCalendar] Failed to load month events:', err);
        if (!cancelled) { setMonthEvents([]); setMonthHolidays([]); }
      })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [activeStudent?.studentId, viewYear, viewMonth]);

  // Events from today onward, feeding the hero banner and the upcoming list.
  useEffect(() => {
    if (!activeStudent?.studentId) return;
    const today = startOfDay(new Date());
    const to = new Date(today);
    to.setDate(to.getDate() + UPCOMING_WINDOW_DAYS);

    let cancelled = false;
    eventService.getEventsInRange(activeStudent.studentId, toDateParam(today), toDateParam(to))
      .then(({ events }) => { if (!cancelled) setUpcomingWindow(events.map(toCalendarEvent)); })
      .catch(err => {
        console.error('[ParentCalendar] Failed to load upcoming events:', err);
        if (!cancelled) setUpcomingWindow([]);
      });

    return () => { cancelled = true; };
  }, [activeStudent?.studentId]);

  const { upcomingEvents, nextEvent, upcomingHolidayCount } = useMemo(() => {
    // Strictly future events only — ongoing/today events already show in the
    // "Sự kiện trong ngày" card, not in the upcoming banner and list.
    const futureEvents = upcomingWindow.filter(e => daysFromToday(e.startDate) > 0);

    const holidayDays = futureEvents
      .filter(e => e.category === 'holiday')
      .reduce((sum, e) => sum + eventDaySpan(e), 0);

    return {
      upcomingEvents: futureEvents.slice(0, UPCOMING_LIMIT),
      nextEvent: futureEvents[0] ?? null,
      upcomingHolidayCount: holidayDays,
    };
  }, [upcomingWindow]);

  const filteredMonthEvents = useMemo(
    () => activeCategory ? monthEvents.filter(e => e.category === activeCategory) : monthEvents,
    [monthEvents, activeCategory],
  );

  const cells = useMemo<CalendarCellData[]>(() => {
    const today = new Date();
    return getMonthGridDates(viewYear, viewMonth).map(({ date, inMonth }) => ({
      date,
      inMonth,
      isToday: sameDay(date, today),
      isWeekend: date.getDay() === 0 || date.getDay() === 6,
      events: filteredMonthEvents.filter(e => eventCoversDay(e, date)),
      holidays: monthHolidays.filter(h => holidayCoversDay(h, date)),
    }));
  }, [viewYear, viewMonth, filteredMonthEvents, monthHolidays]);

  // Union of both fetches so selecting an upcoming event outside the viewed
  // month still shows its details while the month refetches.
  const selectedDayEvents = useMemo(() => {
    const byId = new Map<string, CalendarEventModel>();
    [...monthEvents, ...upcomingWindow].forEach(e => byId.set(e.eventId, e));
    return [...byId.values()]
      .filter(e => eventCoversDay(e, selectedDate) && (!activeCategory || e.category === activeCategory))
      .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
  }, [monthEvents, upcomingWindow, selectedDate, activeCategory]);

  const selectedDayHolidays = useMemo(
    () => monthHolidays.filter(h => holidayCoversDay(h, selectedDate)),
    [monthHolidays, selectedDate],
  );

  return {
    activeStudent,
    loading: studentLoading,
    cells,
    monthEvents: filteredMonthEvents,
    selectedDate,
    setSelectedDate,
    selectedDayEvents,
    selectedDayHolidays,
    upcomingEvents,
    nextEvent,
    upcomingHolidayCount,
    activeCategory,
    setActiveCategory,
  };
}
