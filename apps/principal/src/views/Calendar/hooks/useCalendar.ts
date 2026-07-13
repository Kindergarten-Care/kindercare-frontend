import { useState, useEffect, useCallback, useMemo } from 'react';
import { eventService } from '@/services/Principal/EventService';
import { EventDto, HolidayDto, PrincipalEventType } from '@/config/types/event';

function startOfMonth(date: Date): number {
  return Math.floor(new Date(date.getFullYear(), date.getMonth(), 1).getTime() / 1000);
}

function endOfMonth(date: Date): number {
  return Math.floor(new Date(date.getFullYear(), date.getMonth() + 1, 1).getTime() / 1000);
}

interface UseCalendarReturn {
  currentMonth: Date;
  events: EventDto[];
  holidays: HolidayDto[];
  loading: boolean;
  error: string | null;
  typeFilter: PrincipalEventType | 'all';
  monthEvents: EventDto[];
  goToPrevMonth: () => void;
  goToNextMonth: () => void;
  setTypeFilter: (type: PrincipalEventType | 'all') => void;
  refetch: () => Promise<void>;
}

export const useCalendar = (): UseCalendarReturn => {
  const [currentMonth, setCurrentMonth] = useState(() => new Date());
  const [events, setEvents] = useState<EventDto[]>([]);
  const [holidays, setHolidays] = useState<HolidayDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<PrincipalEventType | 'all'>('all');

  const fetchAll = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [eventsData, holidaysData] = await Promise.all([
        eventService.getEvents(),
        eventService.getHolidays(),
      ]);
      setEvents(eventsData);
      setHolidays(holidaysData);
    } catch (err: any) {
      setError(err.message || 'Lỗi khi tải dữ liệu lịch');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const monthEvents = useMemo(() => {
    const from = startOfMonth(currentMonth);
    const to = endOfMonth(currentMonth);
    return events
      .filter(e => e.startTime >= from && e.startTime < to)
      .filter(e => typeFilter === 'all' || e.eventType === typeFilter)
      .sort((a, b) => a.startTime - b.startTime);
  }, [events, currentMonth, typeFilter]);

  const goToPrevMonth = useCallback(() => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  }, []);

  const goToNextMonth = useCallback(() => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  }, []);

  return {
    currentMonth,
    events,
    holidays,
    loading,
    error,
    typeFilter,
    monthEvents,
    goToPrevMonth,
    goToNextMonth,
    setTypeFilter,
    refetch: fetchAll,
  };
};
